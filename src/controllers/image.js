import Clarafai from "clarifai";

const app = new Clarifai.App({
  apiKey: "72e02b44ed5943c4b2bc5e1cf6a80c4c",
});

export const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.COLOR_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json("Could not work with api");
    });
};

export const handleImageSuccess = (req, res, db) => {
  const user = req.body;
  db.returning("*")
    .select("entries")
    .from("users")
    .where("id", "=", user.id)
    .increment("entries", 1)
    .then((user) => {
      res.json(user[0]);
    })
    .catch((err) => {
      console.log("/detectSuccess error: ", err);
    });
};
