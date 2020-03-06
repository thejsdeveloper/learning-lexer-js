
export class BinaryOp {
    constructor(left, token, right) {
        this.left = left;
        this.op = token;
        this.right = right;
    }
}

export class UnaryOp {
    constructor(token, expr) {
        tthis.op = token;
        this.expr = expr;
    }
}

export class Num {
    constructor(token) {
        this.token = this.op = token;
        this.value = parseFloat(this.token.value);
    }
}

