import { isDigit, isAlNum, isAlpha } from "../../utility/helper";
import { TOKEN_TYPE, Token } from "../model/token";
import { RESERVE_KEYWORD } from '../../utility/reserve-keyword';
export class Lexer {
  constructor(str) {
    this.str = str;
    this.pos = 0;
    this.currentChar = this.str.charAt(this.pos);
  }

  peek() {
    const peekPos = this.pos + 1;
    if (peekPos < this.str.length - 1) {
      return this.str.charAt(peekPos);
    } else {
      return null;
    }
  }

  advance() {
    if (this.pos < this.str.length - 1) {
      this.pos++;
      this.currentChar = this.str.charAt(this.pos);
    } else {
      this.pos++;
      this.currentChar = null;
    }
  }

  id() {
    let result = '';

    while (this.currentChar !== null && isAlNum(this.currentChar)) {
      result += this.currentChar;
      this.advance();
    }

    return RESERVE_KEYWORD.get(result) || new Token(TOKEN_TYPE.ID, result);
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
    return num;
  }

  getNextToken() {
    while (this.currentChar !== null) {

      if (this.currentChar === " ") {
        this.skipWhiteSpace();
        continue;
      }

      if(isAlpha(this.currentChar)) {
        return this.id()
      }

      if(this.currentChar === ':' && this.peek() === '=') {
        this.advance();
        this.advance();
        return new Token(TOKEN_TYPE.ASSIGN, ':=');
      }
      
      if (this.currentChar === "." && isDigit(this.peek())) {
        const value = this.scanNumber();
        return new Token(TOKEN_TYPE.INTEGER, value);
      }

      if (this.currentChar === ";") {
        this.advance();
        return new Token(TOKEN_TYPE.SEMI, ";");
      }

      if (this.currentChar === ".") {
        this.advance();
        return new Token(TOKEN_TYPE.DOT, ".");
      }

      if (isDigit(this.currentChar)) {
        const value = this.scanNumber();
        return new Token(TOKEN_TYPE.INTEGER, value);
      }
      if (this.currentChar === "+") {
        this.advance();
        return new Token(TOKEN_TYPE.PLUS, "+");
      }
      if (this.currentChar === "-") {
        this.advance();
        return new Token(TOKEN_TYPE.MINUS, "-");
      }
      if (this.currentChar === "*") {
        this.advance();
        return new Token(TOKEN_TYPE.MUL, "*");
      }
      if (this.currentChar === "/") {
        this.advance();
        return new Token(TOKEN_TYPE.DIV, "/");
      }
      if (this.currentChar === "(") {
        this.advance();
        return new Token(TOKEN_TYPE.LPREN, "(");
      }
      if (this.currentChar === ")") {
        this.advance();
        return new Token(TOKEN_TYPE.RPREN, ")");
      }

      throw new Error("Error while parsinga at position: " + this.pos);
    }

    return new Token(TOKEN_TYPE.EOF, null);
  }
}
