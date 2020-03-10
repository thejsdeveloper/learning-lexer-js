
export class BinaryOp {
    constructor(left, token, right) {
        this.left = left;
        this.op = token;
        this.right = right;
    }
}

export class UnaryOp {
    constructor(token, expr) {
        this.op = token;
        this.expr = expr;
    }
}

export class Num {
    constructor(token) {
        this.op = token;
        this.value = parseFloat(this.op.value);
    }
}

export class Compound {
  constructor() {
    this.children = [];
  }
}

export class Assign {
  constructor(left, token, right) {
    this.left = left;
    this.op = token;
    this.right = right;
  }
}

export class Var {
  constructor(token) {
    this.token = token;
    this.value = token.value;
  }
}

export class NoOp {
  constructor() {
  }
}

