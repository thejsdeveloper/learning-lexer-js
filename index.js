// Import stylesheets
// import './style.css';
import { Lexer } from './app/compiler/lib/lexer';
import { Parser } from './app/compiler/lib/parser';
import { Interpreter } from './app/compiler/lib/interpreter';
// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;

let str = '14 + 2';

const lex7 = new Lexer(str);

const parser = new Parser(lex7);

const interpreter = new Interpreter(parser);
const result = interpreter.interpret();

console.log(`Result of expression : ${result} `)

appDiv.append(`${str} => ${result}`)