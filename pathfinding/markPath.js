var R = require('ramda'),
    markPathTile;

// :: [number, number] -> grid -> void
markPathTile = R.curry(function(tile, grid) {
    grid[tile[1]][tile[0]] = 2; // side effect
});

// :: [[number, number]] -> grid -> grid
module.exports = R.curry(function(path, grid) {
    return R.pipe(
        R.cloneDeep,
        R.prependTo([]),
        R.tap(R.ap(R.map(markPathTile, path))),
        R.head
    )(grid);
});