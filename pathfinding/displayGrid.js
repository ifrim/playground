//var a = [[1, 2, 2], [2, 1, 2], [2, 2, 2], [0, 0, 1]];

var R = require('ramda'),
    
    // :: number|string -> string
    replaceInCell = R.pipe(
        R.invokerN(0, 'toString'),
        R.replace('0', '.'), 
        R.replace('1', '#'), 
        R.replace('2', '*')
    ),
    
    // :: [number|string] -> [string]
    replaceInRow = R.map(replaceInCell),
    
    // :: [[number|string]] -> [string]
    replaceInGrid = R.map(R.pipe(replaceInRow, R.join(' '))),
    
    // :: [[number|string]] -> string
    toString = R.pipe(replaceInGrid, R.join('\n'));

module.exports = {
    toString: toString
};
