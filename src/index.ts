import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieparser from "cookie-parser";
import bodyParser from "body-parser";

dotenv.config();

const PORT = process.env.PORT || 3000;
const server: Express = express();
const multer = require("multer");
const upload = multer();

const corsOptions = {
  origin: true,
  credentials: true,
};

server.use(cookieparser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(cors(corsOptions));
server.use(express.static("public"));
// for parsing multipart/form-data
server.use(upload.any());
require("./routes")(server);

server.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

server.on("close", (res) => console.log("server error", res));
