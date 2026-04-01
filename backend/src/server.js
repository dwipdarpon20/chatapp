import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import messagesRoutes from './routes/messages.routes.js';
import connectDb from './db/connectDb.js';
import cors from 'cors';
import {app , server} from './libs/socket.js';

dotenv.config();



const PORT = process.env.PORT || 3000;
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "https://chatapp-mq8y.onrender.com",
    credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/messages', messagesRoutes);



  server.listen(PORT, () => {
  connectDb();
});
