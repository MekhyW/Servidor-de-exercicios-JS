# JS Exercise Server
This is the JavaScript exercises server developed for the Web Technologies course.

There is no page to view or submit the exercises. In fact, you're looking at the only page of the exercise server (or nearly so, but I'll let you find out for yourself).

Here we consider a page as "a document that can be displayed in a web browser".

In addition to pages, there are several other data being transmitted over the web. One of the goals of this server, in addition to training JavaScript, is to make that clear. Therefore, the entire process will be carried out without the need for a page to view the information. Of course you can develop a page for this purpose, which can make your life a lot easier, but that's not necessary.

Use this page as a guide to perform the exercises.

## 1. Configuring the client
Now, follow the steps below to start running the JavaScript code:

Create a folder to store your answers (it's a good time to put everything in git in a private repository);
"Install NodeJS" to be able to run JavaScript code from the terminal
Install axios to make JavaScript requests:
```
$ npm install axios
```
Inside that folder, create a file called client.js (actually it can have any name);
In that file, add the following content:
```
const axios = require("axios");
axes
  .get("https://catfact.ninja/fact")
  .then((response) => console.log(response.data.fact));
```
To run this file, use the command:
```
$ node client.js
```
If the code is already in git, don't forget to put a .gitignore for NodeJS projects;
Okay, you're all set to start the exercises!
If you prefer, you can create an HTML page and load the JavaScript in a script tag. An advantage of this approach is that you can use the page to view useful information, such as the result of submissions. Feel free to implement as you like.

## 2. Getting an access token
To send your solutions to the server you need an access token. This token allows the server to identify you as the author of the requests.

The token is valid for 1 minute. Submissions made with the same token after this time will be ignored. To try again just get a new access token and resubmit your submissions. The server will only consider submissions made with the last token used.

The solution of each exercise will be done by a separate submission within this 1 minute period. Therefore, it will be necessary to store the received token in a variable. You can even rush to do all the submissions manually, but as a good programmer I know you will do everything programmatically ;-)

To obtain the access token, follow the steps below:

In your client.js file, make a POST request to https://tecweb-js.insper-comp.com.br/token (this post on how to use axios might be useful) sending the following content in JSON format: { username: "USERNAME"} (use your Insper username);
The request must define the Content-Type and Accept headers as "application/json" (see how to send a custom header here);
If everything is ok, the response will be a JSON object containing a string in the accessToken key. This string is your access token. Now you're all set to get the exercise list (which is already the first exercise :-)
## 3. Listing the exercises
Exercises can be obtained by making a GET request to https://tecweb-js.insper-comp.com.br/exercicio. Don't forget to set the Content-Type and Accept to "application/json" and the Authorization to the string "Bearer TOKEN", replacing TOKEN with the accessToken received in the previous step, in all your requests to the server from this point on .

The list of exercises is represented by an object (can be used like Python's dictionary) in which the braces are the slug of the exercise and the value is an object (dictionary) with the braces:

title: string with the question title;
description: string with the question description;
input: object with the input values of the problem - this object is created with random values for each new token;
score: question score.
Example:
```
{
  multiplication: {
    title: 'Multiplication of values',
    description: 'What is the result of m * n?',
    input: { m: 142, n: 745 },
    score: 0.5
  },
  double: {
    title: 'Double the number',
    description: 'What is twice a?',
    input: { to: 14 },
    score: 0.5
  },
}
```
## 4. Solving the exercises
Now that you have the list of exercises, you can solve them however you like. Some of them are like puzzles. You will need to make additional requests to find out the final result.

Input values always change (with each new token generated). For that reason, your code should work for random inputs, not just the one you rec
