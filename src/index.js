import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt-nodejs";
import knex from "knex";
import * as image from "./controllers/image";
import * as signin from "./controllers/signin";
import * as register from "./controllers/register";
const app = express();

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "",
    database: "smartbrain",
  },
});

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  db.select("*")
    .from("users")
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.log(err);
      res.send("something went wrong");
    });
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post("/image", (req, res) => {
  image.handleApiCall(req, res);
});

app.put("/imageSuccess", (req, res) => {
  image.handleImageSuccess(req, res, db);
});

app.get("/profile/:userId", (req, res) => {
  database.users.forEach((user) => {
    if (user.id === req.params.userId) {
      return res.json(user);
    }
  });
  // res.json('no user')
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
