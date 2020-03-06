import { isDigit } from "../../utility/helper";
import { TOKEN_TYPE, Token } from "../model/token";
export class Lexer {
  constructor(str) {
    this.str = str;
    this.pos = 0;
    this.currentChar = this.str.charAt(this.pos);
  }

  advance() {
    this.pos++;
    if (this.pos < this.str.length - 1) {
      this.currentChar = this.str.charAt(this.pos);
    } else {
      this.currentChar = null;
    }
  }

  skipWhiteSpace() {
    while (this.currentChar === " ") {
      this.advance();
    }
  }

  scanNumber() {
    const start = this.pos;

    while (isDigit(this.currentChar)) {
      this.advance();
    }
    if (this.currentChar === ".") {
      this.advance();
      this.scanNumber();
    }

    const num = this.str.substring(start, this.pos);

    debugger;
    return num;
  }

  getNextToken() {
    while (this.currentChar !== null) {
      switch (this.currentChar) {
        case " ":
          this.skipWhiteSpace();
          continue;

        case ".":
          if (isDigit(this.str.charAt(this.pos + 1))) {
            const value = this.scanNumber();
            return new Token(TOKEN_TYPE.INTEGER, value);
          }

        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          const value = this.scanNumber();
          return new Token(TOKEN_TYPE.INTEGER, value);
        case "+":
          this.advance();
          return new Token(TOKEN_TYPE.PLUS, "+");
        case "-":
          this.advance();
          return new Token(TOKEN_TYPE.MINUS, "-");
        case "*":
          this.advance();
          return new Token(TOKEN_TYPE.MUL, "*");
        case "/":
          this.advance();
          return new Token(TOKEN_TYPE.DIV, "/");
        case "(":
          this.advance();
          return new Token(TOKEN_TYPE.LPREN, "(");
        case ")":
          this.advance();
          return new Token(TOKEN_TYPE.RPREN, ")");
        default:
          throw new Error("Error while parsinga at position: " + this.pos);
      }
    }
    return new Token(TOKEN_TYPE.EOF, null);
  }
}
