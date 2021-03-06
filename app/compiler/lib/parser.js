import { TOKEN_TYPE } from '../model/token';

import { BinaryOp, UnaryOp, Num } from '../model/ast'

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
            this.currentToken = this.lexer.getNextToken()
        } else {
            throw Error("Error while parsing");
        }
    }
    /**
    *   factor : PLUS factor
    *   | MINUS factor
    *   | INTEGER
    *   | LPAREN expr RPAREN
    */
    factor() {

        const token = this.currentToken;

        if (token.type === TOKEN_TYPE.PLUS) {
            this.eat(TOKEN_TYPE.PLUS);
            const node = new UnaryOp(token, this.factor())
            return node;
        } else if (token.type === TOKEN_TYPE.MINUS) {
            this.eat(TOKEN_TYPE.MINUS);
            const node = new UnaryOp(token, this.factor())
            return node;
        } else if (token.type === TOKEN_TYPE.INTEGER) {
            this.eat(TOKEN_TYPE.INTEGER);
            const node = new Num(token);
            return node
        } else if (token.type === TOKEN_TYPE.LPREN) {
            this.eat(TOKEN_TYPE.LPREN);
            const node = this.expr();
            this.eat(TOKEN_TYPE.RPREN);
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

    parse() {
       return this.expr();
    }
}