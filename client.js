const axios = require("axios");
axios
    //.get("https://catfact.ninja/fact")
    //.then((response) => console.log(response.data.fact));
    .post("https://tecweb-js.insper-comp.com.br/token", {username: "USERNAME HERE"}, {headers: {"Content-Type": "application/json"}})
    .then((response) => console.log(response.data.accessToken));
