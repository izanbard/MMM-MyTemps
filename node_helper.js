var NodeHelper = require("node_helper");
var http = require("http");

module.exports = NodeHelper.create({
    socketNotificationReceived: function (notification, payload) {
        if (notification === "GET_TEMPS") {
            var host = payload.host;
            var path = payload.path;
            var self = this;

            http.get({
                host: host,
                path: path
            }, function (responce) {
                var body = '';
                responce.on('data', function (data) {
                    body += data;
                });
                responce.on('end', function () {
                    self.sendTemps(JSON.parse(body))
                });
            });
        }
    },

    sendTemps: function (temps) {
        this.sendSocketNotification("NEW_TEMPS", temps)
    }
});
