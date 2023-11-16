export const generateImageName = () => {
  const timestamp = new Date()
    .toISOString()
    .replace(/:/g, '-')
    .replace(/\.\d{3}Z$/, ''); // Format the timestamp
  const uniqueIdentifier = Math.random().toString(36).substring(2, 15); // Generate a random string
  return `${timestamp}_${uniqueIdentifier}.jpg`;
};
