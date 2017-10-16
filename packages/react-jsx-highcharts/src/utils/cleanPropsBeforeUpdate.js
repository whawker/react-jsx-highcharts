import removeProvidedProps from './removeProvidedProps';

export default function cleanPropsBeforeUpdate (wrappedUpdate) {
  return (config, ...args) => {
    const cleanedConfig = removeProvidedProps(config);
    return wrappedUpdate(cleanedConfig, ...args);
  }
}
