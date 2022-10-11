const axios = require("axios");
var username = require('./username.json').username;
var token;

async function getToken() 
{
    promise = new Promise((resolve, reject) => {
        axios
            .post("https://tecweb-js.insper-comp.com.br/token", {username: username}, {headers: {"Content-Type": "application/json"}})
            .then((response) => resolve(response.data.accessToken));
    });
    token = await promise;
}

function maiorprefixocomum(input) {
    let prefix = "";
    let occurrences = 0;
    let lenghtlongest = input.strings.reduce(function (a, b) {return a.length > b.length ? a : b;}).length;
    for (let i = 0; i < lenghtlongest; i++) {
        firstchars = input.strings.map(function (a) {return a.slice(0, i);});
        let counts = {};
        for (const num of firstchars) {
            counts[num] = counts[num] ? counts[num] + 1 : 1;
        }
        let keymaxoccurrences = Object.keys(counts).reduce(function(a, b){ return counts[a] > counts[b] ? a : b });
        if (counts[keymaxoccurrences] > occurrences) {
            prefix = keymaxoccurrences;
            occurrences = counts[keymaxoccurrences];
        }
    }
    if (prefix.length == 0) {
        return " (string vazia).";
    }
    return prefix;
}

async function test() {
    //await getToken();
    await console.log(maiorprefixocomum({"strings":["qtifstqdjernjue","qtifstqdxubwycml","sfxssrkuhlfdrndsl","sfxssrkgrvccvdpvxdf","uuatesqtracxvtdwj","uuatesldydwnds","qnffhewfc","qnffhpihyfkqiuq","mwaxbbpsdpho","mwaxvqjkjw","lhdhfsgo","lhdymkrwjxe","dfjoyhsoltotdq","dfgyoqlvssy","qjnxhujdmokotpvaro","qjdndovhlhfjegcn","gqxffquhgvcoytnsev","gqcqsdclp","ucprhpih"]}));
}
test();