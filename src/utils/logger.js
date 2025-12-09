export const logger = {
  info: (message) => {
    if (process.env.NODE_ENV !== "test") {
      console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
    }
  },
  error: (message) => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
  },
};
