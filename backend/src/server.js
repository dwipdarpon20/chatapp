import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import connectDb from './db/connectDb.js';

dotenv.config();

const app = express();
app.use(express.json());
const __dirname = path.resolve();

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
  connectDb();
});