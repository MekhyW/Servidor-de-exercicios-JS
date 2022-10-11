const axios = require("axios");
fs = require('fs'); //native node.js module to read and write files
var username = require('./username.json').username;
var token;

function writeExercises(parsedData)
{
    var output = "";
    Object.entries(parsedData).forEach(([key, value]) => {
        output += '<h2>'+key+'</h2>\n<ul>\n';
        Object.entries(value).forEach(([key, subvalue]) => {
            output += '<li>'+key+': '+JSON.stringify(subvalue)+'</li>\n';
        });
        output += '</ul>\n';
    });
    fs.writeFile('exercises.html', output, function(err) {
        if(err) {
            return console.log(err);
        }
        else {
            console.log('Exercises saved to exercises.html');
        }
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
    //console.log(token);
    axios
        .get("https://tecweb-js.insper-comp.com.br/exercicio", {headers: {"Authorization": "Bearer "+token, "Content-Type": "application/json"}})
        .then((response) => writeExercises(JSON.parse(JSON.stringify(response.data))));
}

getExercises();
