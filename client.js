const axios = require("axios");
fs = require('fs'); //native node.js module to read and write files
var username = require('./username.json').username;
var token;
var questionSlugs = [];
var questionParameters = [];
var answers = [];

function writeExercises(parsedData)
{
    questionSlugs = Object.keys(parsedData);
    var output = "";
    Object.entries(parsedData).forEach(([key, value]) => {
        output += '<h2>'+key+'</h2>\n<ul>\n';
        Object.entries(value).forEach(([key, subvalue]) => {
            output += '<li>'+key+': '+JSON.stringify(subvalue)+'</li>\n';
            if (key == 'entrada') {
                questionParameters = questionParameters.concat(JSON.parse(JSON.stringify(subvalue)));
            }
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
    await axios
        .get("https://tecweb-js.insper-comp.com.br/exercicio", {headers: {"Authorization": "Bearer "+token, "Content-Type": "application/json"}})
        .then((response) => writeExercises(JSON.parse(JSON.stringify(response.data))));
}

async function submitAnswers(answers) {
    for (i = 0; i < questionSlugs.length; i++)
    {
        console.log('Submitting answer for '+questionSlugs[i]);
        await axios
            .post("https://tecweb-js.insper-comp.com.br/exercicio/"+questionSlugs[i], {"resposta": answers[i]}, {headers: {"Authorization": "Bearer "+token, "Content-Type": "application/json"}})
            .then((response) => console.log(response.data));
    }
}

function soma(input) {
    return parseInt(input.a) + parseInt(input.b);
}

function tamanhostring(input) {
    return input.string.length;
}

function nomedousuario(input) {
    return input.email.split('@')[0];
}

async function solve() {
    answers = [soma(questionParameters[0]), 
    tamanhostring(questionParameters[1]), 
    nomedousuario(questionParameters[2])];
}

async function main() {
    await getExercises();
    await solve();
    await submitAnswers(answers);
}
main();