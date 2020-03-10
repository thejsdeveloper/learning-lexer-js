// Import stylesheets
// import './style.css';
import { Lexer } from "./app/compiler/lib/lexer";
import { Parser } from "./app/compiler/lib/parser";
import { Interpreter } from "./app/compiler/lib/interpreter";

const fs = require('fs');

// Write Javascript code!
const appDiv = document.getElementById("app");
appDiv.innerHTML = `<h1>JS Starter</h1>`;

// let str = '14 + 2 * (4 - - 6) / 2';

// const lex7 = new Lexer(str);

// const parser = new Parser(lex7);

// const interpreter = new Interpreter(parser);
// const result = interpreter.interpret();

// console.log(`Result of expression : ${result} `)

// appDiv.append(`${str} => ${result}`)

// const pro = ``

// const lexer = new Lexer("BEGIN a := 2; END.");
// console.log(lexer.getNextToken());
// console.log(lexer.getNextToken());
// console.log(lexer.getNextToken());
// console.log(lexer.getNextToken());
// console.log(lexer.getNextToken());
console.log(fs)

const text = fs.readFileSync('program.text');



const pro = `BEGIN BEGIN num := 2; a := num; b := 10 * a + 10 * num / 4; c := a - - b END;  x := 11; END.`

const lexer = new Lexer(pro);
const parser = new Parser(lexer);
console.log(parser.parse())