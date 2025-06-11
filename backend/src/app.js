import express from 'express';
import cors from 'cors';

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

export {app} ;