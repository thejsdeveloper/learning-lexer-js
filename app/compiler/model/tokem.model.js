TOKEN_TYPE = {
    INTEGER: "INTEGER",
    PLUS: "PLUS",
    MINUS: "MINUS",
    MUL: "MUL",
    DIV: "DIV",
    EOF: "EOF",
    LPREN: "LPREN",
    RPREN: "RPREN"
};

class Token {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
}

module.exports = {
    Token,
    TOKEN_TYPE
};
