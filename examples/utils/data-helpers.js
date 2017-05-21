export const createDataPoint = (time = Date.now(), magnitude = 1000, offset = 0) => {
  return [
    time + offset * magnitude,
    Math.round((Math.random() * 100) * 2) / 2
  ];
};

export const createRandomData = (time, magnitude) => {
  const data = [];

  for (let i = -99; i <= 0; i++) {
    data.push(createDataPoint(time, magnitude, i));
  }
  return data;
};

export const addDataPoint = (data, toAdd) => {
  if (!toAdd) toAdd = createDataPoint();
  const newData = data.slice(0); // Clone
  newData.push(toAdd);
  return newData;
};
