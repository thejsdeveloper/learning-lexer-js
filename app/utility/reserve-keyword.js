import { Token } from '../compiler/model/token';


const RESERVE_KEYWORD = new Map([
    ['BEGIN', new Token('BEGIN', 'BEGIN')],
    ['END', new Token('END', 'END')]
]);


module.exports = {
    RESERVE_KEYWORD
}

