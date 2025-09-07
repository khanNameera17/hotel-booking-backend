require("dotenv").config(); // make sure this is at the very top!
const app = require("./src/app");
const logger = require("./src/middleware/winston.logger");
const mongoose = require("mongoose");

// connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => logger.info("✅ MongoDB connected successfully"))
  .catch((err) => logger.error("❌ Error connecting to MongoDB: ", err.message));

// start server
app.listen(process.env.APP_PORT, () => {
  logger.info(`App server running on: ${process.env.APP_BASE_URL}`);
});
