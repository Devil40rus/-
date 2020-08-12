var express = require('express'),
    _       = require('lodash'),
    config  = require('./config'),
    jwt     = require('jsonwebtoken');

var app = module.exports = express.Router();

var users = [{
  id: 1,
  username: 'gonto',
  password: 'gonto'
}];

function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), config.secret, { expiresInMinutes: 60*5 });
}

function getUserScheme(req) {
  
  var username;
  var type;
  var userSearch = {};

  if(req.body.username) {
    username = req.body.username;
    type = 'username';
    userSearch = { username: username };
  }

  return {
    username: username,
    type: type,
    userSearch: userSearch
  }
}

app.post('/users', function(req, res) {

  var userScheme = getUserScheme(req);  

  if (!userScheme.username || !req.body.password) {
    return res.status(400).send("Вы должны отправить почту и пароль");
  }

  if (_.find(users, userScheme.userSearch)) {
   return res.status(400).send("Пользователь с такой почтой уже существует");
  }

  var profile = _.pick(req.body, userScheme.type, 'password', 'extra');
  profile.id = _.max(users, 'id').id + 1;

  users.push(profile);

  res.status(201).send({
    id_token: createToken(profile)
  });
});

app.post('/sessions/create', function(req, res) {

  var userScheme = getUserScheme(req);

  if (!userScheme.username || !req.body.password) {
    return res.status(400).send("Вы должны отправить почту и пароль");
  }

  var user = _.find(users, userScheme.userSearch);
  
  if (!user) {
    return res.status(401).send({message:"Почта или пароль не совпадают", user: user});
  }

  if (user.password !== req.body.password) {
    return res.status(401).send("Почта или пароль не совпадают");
  }

  res.status(201).send({
    id_token: createToken(user)
  });
});