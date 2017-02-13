/* global Module */

Module.register("MMM-MyTemps", {
    defaults: {
        host: "192.168.1.41",
        path: "/temp2cf.php?format=json",
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

        if (!this.loaded) {
            wrapper.innerHTML = "<span class='small fa fa-refresh fa-spin fa-fw'></span>";
            wrapper.className = "small dimmed";
            return wrapper;
        }

        var caption = document.createElement("div");
        caption.classList.add("title");
        caption.innerHTML = "The current outside temperature is";
        wrapper.appendChild(caption);

        var celsius = document.createElement("div");
        celsius.classList.add("temp","celsius");
        celsius.innerHTML = this.temps.celsius + " C";
        wrapper.appendChild(celsius);

        var fahrenheit = document.createElement("div");
        fahrenheit.classList.add("temp","fahrenheit");
        fahrenheit.innerHTML = this.temps.fahrenheit + " F";
        wrapper.appendChild(fahrenheit);

        var caption2 = document.createElement("div");
        caption2.classList.add("title");
        caption2.innerHTML = "The current indoor temperature is";
        wrapper.appendChild(caption2);

        var celsius2 = document.createElement("div");
        celsius2.classList.add("temp", "celsius");
        celsius2.innerHTML = this.temps.celsius2 + " C";
        wrapper.appendChild(celsius2);

        var fahrenheit2 = document.createElement("div");
        fahrenheit2.classList.add("temp", "fahrenheit");
        fahrenheit2.innerHTML = this.temps.fahrenheit2 + " F";
        wrapper.appendChild(fahrenheit2);

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