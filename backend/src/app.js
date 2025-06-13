import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
const app = express();

// Enable CORS with specific origin and credentials
app.use(cors({
    origin:process.env.CORS_ORIGIN || '*',
    credentials:true
}))

// Parse incoming JSON with size limit
app.use(
  express.json({
    limit: "20kb",
  })
);

// Parse cookies
app.use(cookieParser());

// routes import
import dataRoute from "./routes/data.route.js";

//routes declarations
app.use("/api",dataRoute );

export {app} ;