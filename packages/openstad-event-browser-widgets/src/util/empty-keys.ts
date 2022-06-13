export function removeEmptyKeys(payload: any) {
  // Remove empty keys from payload
  Object.keys(payload).forEach((key) => {
    if (payload[key] === null || !payload[key].length) {
      delete payload[key];
    }
  });
}
