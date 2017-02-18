
var config = {
    modules: {
        module: "MMM-MyTemps",
        header: "Is it cold?",
        position: "top_left",
        config: {
            host: "YOUR HOST GOES HERE", //eg "192.168.1.2" or "www.mydomain.com"
            path: "PATH GOES HERE", //eg "/sensors/temp2mcf.php?format=json"
            reloadInterval: 60 * 1000 // 1 min - time between reloads of data
        }
    }
};
