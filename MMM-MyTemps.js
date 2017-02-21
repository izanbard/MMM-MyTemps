/* global Module */

Module.register("MMM-MyTemps", {
    defaults: {
        host: "192.168.1.41",
        path: "/temp2mcf.php?format=json",
        reloadInterval: 60 * 1000 //1 min
    },

    getStyles: function () {
        return [
            this.file("css/MMM-MyTemps.css"),
            "font-awesome.css"
        ]
    },

    loaded: false,
    temps: {},

    notificationReceived: function (notification) {
        if (notification === 'DOM_OBJECTS_CREATED') {
            this.reloadData(this.config.host, this.config.path);
            var self = this;
            setInterval(function(){
                self.reloadData(self.config.host, self.config.path);
            }, this.config.reloadInterval)
        }
    },

    getDom: function () {
        var wrapper = document.createElement("div");
            wrapper.classList.add("small");

        if (!this.loaded) {
            wrapper.innerHTML = "<span class='small fa fa-refresh fa-spin fa-fw'></span>";
            return wrapper;
        }

        var caption = document.createElement("div");
        caption.classList.add("title");
        caption.innerHTML = '<span class="fahrenheit">Garden: ' + this.temps.celsius + "°C / " + this.temps.fahrenheit + "°F</span>";
        wrapper.appendChild(caption);

        var caption2 = document.createElement("div");
        caption2.classList.add("title");
        caption2.innerHTML = '<span class="celsius">Garage: ' + this.temps.celsius2 + "°C / " + this.temps.fahrenheit2 + "°F</span>";
        wrapper.appendChild(caption2);

        var caption3 = document.createElement("div");
        caption3.classList.add("title");
        caption3.innerHTML = "Garage Door is " + this.temps.doorState;
        wrapper.appendChild(caption3);

        return wrapper;
    },

    reloadData: function (host, path) {
        this.sendSocketNotification("GET_TEMPS", {host: host, path: path});
    },

    socketNotificationReceived: function (notification, payload) {
        if (notification === "NEW_TEMPS") {
            this.loaded = true;
            this.temps.celsius = payload.temp_c;
            this.temps.fahrenheit = payload.temp_f;
            this.temps.celsius2 = payload.temp_c2;
            this.temps.fahrenheit2 = payload.temp_f2;
            this.updateDom();
        }
    }
});