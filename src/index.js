import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt-nodejs";
import knex from "knex";

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

app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  db.select("*")
    .from("users")
    .where("email", "=", email)
    .then((user) => {
      res.json(user[0]);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send("unable to get user");
    });
});

app.post("/findface", (req, res) => {
  database.users.forEach((user) => {
    if (user.email === req.body.email) {
      user.entries++;
      res.json(user);
    }
  });
  res.json("nope");
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  db("users")
    .returning("*")
    .insert({
      email: email,
      name: name,
      joined: new Date(),
    })
    .then((user) => {
      res.send(user[0]);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("unable to register");
    });
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
