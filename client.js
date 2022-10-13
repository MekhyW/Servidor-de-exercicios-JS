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

function jacawars(input) {
    let d = 100;
    let radians = input.theta * Math.PI / 180;
    let traveled = (Math.pow(input.v, 2))*Math.sin(2*radians)/9.8;
    let error = traveled - d;
    if (error > 2) {
        return 1;
    } else if (error < -2) {
        return -1;
    } else {
        return 0;
    }
}

function anobissexto(input) {
    return (input.ano % 4 == 0 && input.ano % 100 != 0) || input.ano % 400 == 0;
}

function volumedapizza(input) {
    let volume = Math.PI*Math.pow(input.z, 2)*input.a;
    return Math.round(volume);
}

function mru(input) {
    return input.s0 + input.v*input.t;
}

function invertestring(input) {
    return input.string.split('').reverse().join('');
}

function somavalores(input) {
    let soma = 0;
    Object.entries(input.objeto).forEach(([key, value]) => {
        soma += parseInt(value);
    });
    return soma;
}

function nesimoprimo(input) {
    let count = 1;
    const isPrime = num => {
        for(let i = 2, s = Math.sqrt(num); i <= s; i++)
            if(num % i === 0) return false; 
        return num > 1;
    }
    for (i=2; count<input.n+1; i++) {
        if (isPrime(i)) {
            count++;
        }
    }
    return i-1;
 }

function maiorprefixocomum(input) {
    return 0;
}

function somasegundomaioremenornumeros(input) {
    sorted = input.numeros.sort(function(a, b){return a - b});
    return sorted[1] + sorted[sorted.length-2];
}

function contapalindromos(input) {
    palindromes = 0;
    for (i=0; i<input.palavras.length; i++) {
        if (input.palavras[i] == input.palavras[i].split('').reverse().join('')) {
            palindromes++;
        }
    }
    return palindromes;
}

function somadestringsdeints(input) {
    numbers = input.strings.map(x => parseInt(x));
    return numbers.reduce((a, b) => a + b);
}

async function somacomrequisicoes(input) {
    let endpoints = input.endpoints;
    let soma = 0;
    for (i=0; i<endpoints.length; i++) {
        await axios
            .get(endpoints[i], {headers: {"Authorization": "Bearer "+token, "Content-Type": "application/json"}})
            .then((response) => soma += response.data);
    }
    return soma;
}

async function cacaaotesouro(input) {
    let endpoint = input.inicio;
    while (isNaN(endpoint)) {
        await axios
            .get(endpoint, {headers: {"Authorization": "Bearer "+token, "Content-Type": "application/json"}})
            .then((response) => endpoint = response.data);
    }
    return endpoint;
}

async function solve() {
    answers = [soma(questionParameters[0]), 
    tamanhostring(questionParameters[1]), 
    nomedousuario(questionParameters[2]),
    jacawars(questionParameters[3]),
    anobissexto(questionParameters[4]),
    volumedapizza(questionParameters[5]),
    mru(questionParameters[6]),
    invertestring(questionParameters[7]),
    somavalores(questionParameters[8]),
    nesimoprimo(questionParameters[9]),
    maiorprefixocomum(questionParameters[10]),
    somasegundomaioremenornumeros(questionParameters[11]),
    contapalindromos(questionParameters[12]),
    somadestringsdeints(questionParameters[13]),
    await somacomrequisicoes(questionParameters[14]),
    await cacaaotesouro(questionParameters[15])];
}

async function main() {
    await getExercises();
    await solve();
    await submitAnswers(answers);
}
main();