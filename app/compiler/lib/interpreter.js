import { NodeVisitor } from "./node-visitor";
import { TOKEN_TYPE } from '../model/token'
export class Interpreter extends NodeVisitor {
    
    constructor(parser) {
        super();
        this.parser = parser;
    }

    visit_BinaryOp(node) {
        if(node.op.type === TOKEN_TYPE.PLUS) {
            return this.visit(node.left) + this.visit(node.right);
        } else if(node.op.type === TOKEN_TYPE.MINUS) {
            return this.visit(node.left) - this.visit(node.right);
        } else if(node.op.type === TOKEN_TYPE.MUL) {
            return this.visit(node.left) * this.visit(node.right);
        } else if(node.op.type === TOKEN_TYPE.DIV) {
            return this.visit(node.left) * this.visit(node.right);
        }
    }

    visit_Num(node) {
        return node.value;
    }

    visit_UnaryOp(node) {
        const op = node.op;
        if(op.type === TOKEN_TYPE.PLUS) {
            return +this.visit(node.expr);
        } else if(op.type === TOKEN_TYPE.MINUS) {
            return  -this.visit(node.expr);
        }
    }
}