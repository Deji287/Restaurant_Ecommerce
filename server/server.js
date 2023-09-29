import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";

import connect from "./config/database.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8081;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());

// middleware
app.use(notFound);
app.use(errorHandler);

connect()
  .then(() => {
    try {
      app.listen(PORT, () =>
        console.log(`Listening on http://localhost:${PORT}`.yellow.bold)
      );
    } catch (error) {
      console.log("Cannot connect to the database".red.bold);
    }
  })
  .catch((err) => console.log("Invalid Connection".red));
