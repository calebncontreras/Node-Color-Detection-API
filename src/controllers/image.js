import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "72e02b44ed5943c4b2bc5e1cf6a80c4c",
});

export const handleApiCall = (req, res, db) => {
  const { imageURL } = req.body.input;
  app.models
    .predict(clarifai.COLOR_MODEL, imageURL)
    .then((data) => {
      db("images").insert({
        imageurl: imageURL,
        colors: data,
      });
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

export const saveImageData = (req, res, db) => {
  const user = req.body;
  db("users").insert();
};
