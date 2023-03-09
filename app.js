const express = require('express');
const app = express();
const router = require('./router/router');

const port = process.env.PORT || 8080;

app.use(router);
app.listen(port, function(req, res) {
    console.info("Aplicação rodando em http://localhost:8080")
})

module.exports = app