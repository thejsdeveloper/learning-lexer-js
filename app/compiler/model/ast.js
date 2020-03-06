
class BinaryOp {
    constructor(left, token, right) {
        this.left = left;
        this.token = this.op = token;
        this.right = right;
    }
}

class UnaryOp {
    constructor(token, expr) {
        this.token = this.op = token;
        this.expr = expr;
    }
}

class Num {
    constructor(token) {
        this.token = this.op = token;
        this.value = parseFloat(this.token.value);
    }
}

