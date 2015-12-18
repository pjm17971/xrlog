/*eslint-disable */

var express = require("express");
var router = express.Router();
var redis = require("redis");
var client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});

router.get("/tiles", function (req, res) {
    console.log(req.query.tile);
    client.get(req.query.tile, function (err, v) {
        res.json(JSON.parse(v));
    });
});

router.get("/sources", function (req, res) {
    client.smembers("sources", function (err, v) {
        res.json(v);
    });
});

module.exports = router;
