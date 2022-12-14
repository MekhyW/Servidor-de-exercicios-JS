const axios = require("axios");
var username = require('./username.json').username;
var token;
var questionParameters = [];

function writeExercises(parsedData)
{
    Object.entries(parsedData).forEach(([key, value]) => {
        Object.entries(value).forEach(([key, subvalue]) => {
            if (key == 'entrada') {
                questionParameters = questionParameters.concat(JSON.parse(JSON.stringify(subvalue)));
            }
        });
    });
}

async function getToken() 
{
    promise = new Promise((resolve, reject) => {
        axios
            .post("https://tecweb-js.insper-comp.com.br/token", {username: username}, {headers: {"Content-Type": "application/json"}})
            .then((response) => resolve(response.data.accessToken));
    });
    token = await promise;
}

async function getExercises() 
{
    await getToken();
    await axios
        .get("https://tecweb-js.insper-comp.com.br/exercicio", {headers: {"Authorization": "Bearer "+token, "Content-Type": "application/json"}})
        .then((response) => writeExercises(JSON.parse(JSON.stringify(response.data))));
}

async function cacaaotesouro(input) {
    let endpoint = input.inicio;
    while (isNaN(endpoint)) {
        await axios
            .get(endpoint, {headers: {"Authorization": "Bearer "+token, "Content-Type": "application/json"}})
            .then((response) => endpoint = response.data);
    }
    console.log(endpoint);
    return endpoint;
}

async function test() {
    await getExercises();
    await console.log(await cacaaotesouro(questionParameters[15]));
}
test();