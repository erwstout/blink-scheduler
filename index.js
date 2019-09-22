require("dotenv").config();
var Blink = require("node-blink-security");
var find = require("lodash/find");
exports.blinkToggle = function (req, res) {
    var blinkUser = process.env.BLINK_USERNAME;
    var blinkPassword = process.env.BLINK_PASSWORD;
    var blink = new Blink(blinkUser, blinkPassword);
    blink
        .setupSystem()
        .then(function () {
        var main = find(blink.cameras, function (camera) { return camera._name === "Main"; });
        var motionState = main._enabled;
        main.setMotionDetect(!motionState);
        return res.status(200).send(motionState);
    })["catch"](function (err) {
        console.error(err);
        return res.sendStatus(500);
    });
};
