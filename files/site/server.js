/*
 * Development Server
 */

const express = require("express"),
    compression = require("compression"),
    request = require("request");

var app = express();

app.use(compression());

app.use("/json", express.static("./"));

app.use("/", express.static("./src"));

app.get('/*', function (req, res) {
    res.sendFile('index.html', {root: "./src"});
});

app.listen(7000);

/*
 * vim: ts=4 et nowrap autoindent
 */
