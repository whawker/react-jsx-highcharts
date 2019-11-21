const createProvidedColorAxis = colorAxis => {
  if (!colorAxis) return null;

  return {
    object: colorAxis,
    id: colorAxis.userOptions && colorAxis.userOptions.id
  };
};

export default createProvidedColorAxis;
