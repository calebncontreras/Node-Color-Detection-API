"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleRegister = void 0;

var handleRegister = function handleRegister(req, res, db, bcrypt) {
  var _req$body = req.body,
      email = _req$body.email,
      name = _req$body.name,
      password = _req$body.password;
  var hash = bcrypt.hashSync(password);
  db.transaction(function (trx) {
    trx.insert({
      hash: hash,
      email: email
    }).into("login").returning("email").then(function (loginEmail) {
      return trx("users").returning("*").insert({
        email: loginEmail[0],
        name: name,
        joined: new Date()
      }).then(function (user) {
        res.json(user[0]);
      });
    }).then(trx.commit)["catch"](trx.rollback);
  })["catch"](function (err) {
    console.log(err);
    res.status(400).send("unable to register");
  });
};

exports.handleRegister = handleRegister;
//# sourceMappingURL=register.js.map