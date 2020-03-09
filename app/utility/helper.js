function isDigit(value) {
    return !isNaN(parseFloat(value)) && isFinite(parseFloat(value));
}

function isAlNum(ch) {
    return isAlpha(ch) ||
        ch >= '0' && ch <= '9'
}

function isAlpha(ch) {
    return ch >= 'A' && ch <= 'Z' || ch >= 'a' && ch <= 'z'
}


module.exports = {
    isDigit,
    isAlpha,
    isAlNum
}
