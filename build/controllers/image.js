"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveImageData = exports.handleImageSuccess = exports.handleApiCall = void 0;

var _clarifai = _interopRequireDefault(require("clarifai"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = new Clarifai.App({
  apiKey: '72e02b44ed5943c4b2bc5e1cf6a80c4c'
});

var handleApiCall = function handleApiCall(req, res, db) {
  // console.log(req.body);
  var _req$body = req.body,
      image = _req$body.image,
      userId = _req$body.id;
  console.log(image);
  app.models.predict(_clarifai["default"].COLOR_MODEL, image) // .then((res) => res.json())
  .then(function (data) {
    // console.log(data);
    res.json(data);
  })["catch"](function (error) {
    consoSle.log(error);
    res.status(400).json('Could not work with api');
  });
};

exports.handleApiCall = handleApiCall;

var handleImageSuccess = function handleImageSuccess(req, res, db) {
  var user = req.body;
  console.log(user);
  db.returning('*').select('entries').from('users').where('id', '=', user.id).increment('entries', 1).then(function (user) {
    res.json(user[0]);
  })["catch"](function (err) {
    console.log('/handleImageSuccess error: ', err);
  });
};

exports.handleImageSuccess = handleImageSuccess;

var saveImageData = function saveImageData(req, res, db) {
  var user = req.body;
  db('users').insert();
};

exports.saveImageData = saveImageData;
//# sourceMappingURL=image.js.map