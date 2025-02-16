// Importing Env Variables
require("dotenv").config();

// Libraries
import express from "express";
import cors from "cors";
import helmet from "helmet";

// microservice routes
import Auth from "./API/Auth";


// Database connection
import ConnectDB from "./database/connection";

//console.log(process.env);

const zomato = express();

// application middlewares
zomato.use(express.json());
zomato.use(express.urlencoded({ extended: false }));
zomato.use(helmet());
zomato.use(cors());

// Application Routes
zomato.use("/auth", Auth);

zomato.get("/", (req, res) => res.json({ message: "Setup success" }));

const port = process.env.PORT || 4000;

zomato.listen(port, () =>
  ConnectDB()
    .then(() => console.log("Server is running 🚀"))
    .catch(() =>
      console.log("Server is running, but database connection failed... ")
    )
);