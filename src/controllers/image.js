import clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: process.env.CLARAFAI_API_KEY,
});

export const handleApiCall = (req, res, db) => {
  // console.log(req.body);
  const { image, id: userId } = req.body;
  console.log(image);
  app.models
    .predict(clarifai.COLOR_MODEL, image)
    // .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      res.json(data);
    })
    .catch((error) => {
      consoSle.log(error);
      res.status(400).json('Could not work with api');
    });
};

export const handleImageSuccess = (req, res, db) => {
  const user = req.body;

  console.log(user);
  db.returning('*')
    .select('entries')
    .from('users')
    .where('id', '=', user.id)
    .increment('entries', 1)
    .then((user) => {
      res.json(user[0]);
    })
    .catch((err) => {
      console.log('/handleImageSuccess error: ', err);
    });
};

export const saveImageData = (req, res, db) => {
  const user = req.body;
  db('users').insert();
};
