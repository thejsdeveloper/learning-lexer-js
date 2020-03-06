function isDigit(value) {
    return !isNaN(parseFloat(value)) && isFinite(parseFloat(value));
}

module.exports = {
    isDigit
}
