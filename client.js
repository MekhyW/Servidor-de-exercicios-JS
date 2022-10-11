const axios = require("axios");
axios
  .get("https://catfact.ninja/fact")
  .then((response) => console.log(response.data.fact));