"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _bcryptNodejs = _interopRequireDefault(require("bcrypt-nodejs"));

var _knex = _interopRequireDefault(require("knex"));

var image = _interopRequireWildcard(require("./controllers/image"));

var signin = _interopRequireWildcard(require("./controllers/signin"));

var register = _interopRequireWildcard(require("./controllers/register"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var db = (0, _knex["default"])({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "password",
    database: "smartbrains"
  }
});
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());
app.get("/", function (req, res) {
  db.select("*").from("users").then(function (users) {
    res.send(users);
  })["catch"](function (err) {
    console.log(err);
    res.send("something went wrong");
  });
});
app.post("/register", function (req, res) {
  register.handleRegister(req, res, db, _bcryptNodejs["default"]);
});
app.post("/signin", function (req, res) {
  signin.handleSignin(req, res, db, _bcryptNodejs["default"]);
});
app.post("/image", function (req, res) {
  image.handleApiCall(req, res, db);
});
app.put("/imageSuccess", function (req, res) {
  image.handleImageSuccess(req, res, db);
});
app.get("/profile/:userId", function (req, res) {
  database.users.forEach(function (user) {
    if (user.id === req.params.userId) {
      return res.json(user);
    }
  }); // res.json('no user')
});
app.listen(process.env.PORT || 3000, function () {
  return console.log("node-color-detect app running on port 3000!");
});
//# sourceMappingURL=api.js.map