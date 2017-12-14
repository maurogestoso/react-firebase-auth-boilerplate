// HOF to be passed to setState with the key/value pairs to be updated
export const byPropKey = (key, value) => () => ({ [key]: value });
