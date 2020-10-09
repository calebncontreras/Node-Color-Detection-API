"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleSignin = void 0;

var handleSignin = function handleSignin(req, res, db, bcrypt) {
  var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password;
  db.select("email", "hash").from("login").where("email", "=", email).then(function (data) {
    var isValid = bcrypt.compareSync(password, data[0].hash);
    console.log(isValid);

    if (isValid) {
      return db.select("*").from("users").where("email", "=", email).then(function (user) {
        res.json(user[0]);
      })["catch"](function (err) {
        return res.status(400).json("unable to get user");
      });
    } else {
      res.status(404).json("invalid credentials");
    }
  })["catch"](function (err) {
    return res.status(404).json("invalid credentials");
  });
};

exports.handleSignin = handleSignin;
//# sourceMappingURL=signin.js.map