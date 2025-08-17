import "dotenv/config";
import { app } from "./app.js";
const PORT = process.env.PORT || 3000;
import { connectDB } from "./config/db.js";

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error.message);
    process.exit(1);
  }
};

startServer();
