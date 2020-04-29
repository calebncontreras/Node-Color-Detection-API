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

const database = {
  users: [
    {
      id: "123",
      name: "john",
      email: "john@gmail.com",
      entries: 0,
      joined: new Date(),
      secrets: {
        users_id: "123",
        hash: "wghhh",
      },
    },
  ],
};

app.get("/", (req, res) => {
  db.select("*")
    .from("users")
    .then((users) => {
      res.send(users);
    });
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (email === database.users[0].email && password === database.secrets.hash) {
    res.send("signed in");
  } else {
    res.json("access denied");
  }
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
  database.users.push({
    id: "124",
    name: req.body.name,
    email: req.body.email,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
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
