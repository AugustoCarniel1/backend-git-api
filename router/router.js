const express = require('express');

const app = express.Router();
const controller = require('../controller/controller');

app.get('/api/users', controller.listUsers);
app.get('/api/users/:username/details', controller.searchGitProfile);
app.get('/api/users/:username/repos', controller.searchGitRepos)


module.exports = app