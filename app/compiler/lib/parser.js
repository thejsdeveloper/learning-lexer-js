import { TOKEN_TYPE } from "../model/token";

import {
  BinaryOp,
  UnaryOp,
  Num,
  Compound,
  Assign,
  Var,
  NoOp
} from "../model/ast";

export class Parser {
  /**
   *
   *
   */
  constructor(lexer) {
    this.lexer = lexer;
    this.currentToken = this.lexer.getNextToken();
  }

  eat(tokenType) {
    if (this.currentToken.type === tokenType) {
      this.currentToken = this.lexer.getNextToken();
    } else {
      throw Error("Error while parsing");
    }
  }
  /**
   *   factor : PLUS factor
   *   | MINUS factor
   *   | INTEGER
   *   | LPAREN expr RPAREN
   *   | variable
   */
  factor() {
    const token = this.currentToken;

    if (token.type === TOKEN_TYPE.PLUS) {
      this.eat(TOKEN_TYPE.PLUS);
      const node = new UnaryOp(token, this.factor());
      return node;
    } else if (token.type === TOKEN_TYPE.MINUS) {
      this.eat(TOKEN_TYPE.MINUS);
      const node = new UnaryOp(token, this.factor());
      return node;
    } else if (token.type === TOKEN_TYPE.INTEGER) {
      this.eat(TOKEN_TYPE.INTEGER);
      const node = new Num(token);
      return node;
    } else if (token.type === TOKEN_TYPE.LPREN) {
      this.eat(TOKEN_TYPE.LPREN);
      const node = this.expr();
      this.eat(TOKEN_TYPE.RPREN);
      return node;
    } else {
      const node = this.variable();
      return node;
    }
  }
  /**
   * term: factor ((MUL | DIV) factor)*
   */
  term() {
    let node = this.factor();

    while (
      this.currentToken.type === TOKEN_TYPE.MUL ||
      this.currentToken.type === TOKEN_TYPE.DIV
    ) {
      const token = this.currentToken;
      if (token.type === TOKEN_TYPE.MUL) {
        this.eat(TOKEN_TYPE.MUL);
      }

      if (token.type === TOKEN_TYPE.DIV) {
        const token = this.currentToken;
        this.eat(TOKEN_TYPE.DIV);
      }
      node = new BinaryOp(node, token, this.factor());
    }

    return node;
  }
  /**
   * expr: term ((PLUS | MINUS) term)*
   */
  expr() {
    let node = this.term();
    while (
      this.currentToken.type === TOKEN_TYPE.PLUS ||
      this.currentToken.type === TOKEN_TYPE.MINUS
    ) {
      const token = this.currentToken;
      if (token.type === TOKEN_TYPE.PLUS) {
        this.eat(TOKEN_TYPE.PLUS);
      }
      if (token.type === TOKEN_TYPE.MINUS) {
        this.eat(TOKEN_TYPE.MINUS);
      }
      node = new BinaryOp(node, token, this.term());
    }
    return node;
  }

  variable() {
    const node = new Var(this.currentToken);
    this.eat(TOKEN_TYPE.ID);
    return node;
  }

  assignStatement() {
    const left = this.variable();
    const token = this.currentToken;
    this.eat(TOKEN_TYPE.ASSIGN);
    const right = this.expr();

    return new Assign(left, token, right);
  }

  statement() {
    if (this.currentToken.type === TOKEN_TYPE.ID) {
      return this.assignStatement();
    }

    if (this.currentToken.type === TOKEN_TYPE.BEGIN) {
      return this.compoundStatement();
    }

    const node = new NoOp();
    return node;
  }

  statementList() {
    const node = this.statement();

    const result = [node];

    while (this.currentToken.type === TOKEN_TYPE.SEMI) {
      this.eat(TOKEN_TYPE.SEMI);
      result.push(this.statement());
    }

    if (this.currentToken.type === TOKEN_TYPE.ID) {
      throw new Error("Error while parsing");
    }

    return result;
  }

  compoundStatement() {
    this.eat(TOKEN_TYPE.BEGIN);
    const nodes = this.statementList();
    this.eat(TOKEN_TYPE.END);

    const root = new Compound();
    root.children = nodes;
    return root;
  }

  program() {
    const node = this.compoundStatement();
    this.eat(TOKEN_TYPE.DOT);
    return node;
  }

  parse() {
    const node = this.program();

    if(this.currentToken.type !== TOKEN_TYPE.EOF) {
      throw new Error('No EOF token found');
    }

    return node;
  }
}
