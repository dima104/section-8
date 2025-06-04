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

const uri = `mongodb://${MONGODB_USERNAME}:${encodeURIComponent(MONGODB_PASSWORD)}@${MONGODB_CLUSTER_ADDRESS}/?authSource=admin`;