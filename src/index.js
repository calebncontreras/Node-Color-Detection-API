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
  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      console.log(isValid);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => res.status(400).json("unable to get user"));
      } else {
        res.status(404).json("invalid credentials");
      }
    })
    .catch((err) => res.status(404).json("invalid credentials"));
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  const hash = bcrypt.hashSync(password);
  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date(),
          })
          .then((user) => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => {
    console.log(err);
    res.status(400).send("unable to register");
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

app.get("/profile/:userId", (req, res) => {
  database.users.forEach((user) => {
    if (user.id === req.params.userId) {
      return res.json(user);
    }
  });
  // res.json('no user')
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
