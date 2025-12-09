import app from "./app.js";
import { config } from "./config.js";

export const startServer = () => {
  const PORT = config.PORT;
  app.listen(PORT, () => console.log(`[CORE] Server running on port ${PORT}`));
};
