import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import eventRoutes from './routes/events.js';

const app = express();

app.use(bodyParser.json());
app.use(eventRoutes);

const {
  MONGODB_CONNECTION_PROTOCOL,
  MONGODB_CLUSTER_ADDRESS,
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MONGODB_DB_NAME,
  PORT
} = process.env;

// Защита от спецсимволов в пароле
const safePassword = encodeURIComponent(MONGODB_PASSWORD);

const mongoUri = `${MONGODB_CONNECTION_PROTOCOL}://${MONGODB_USERNAME}:${safePassword}@${MONGODB_CLUSTER_ADDRESS}/${MONGODB_DB_NAME}?retryWrites=true&w=majority`;

console.log("Connecting to MongoDB:", mongoUri.replace(/:[^@]+@/, ':*****@'));

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
  });