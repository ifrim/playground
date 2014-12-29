var R = require('ramda'),
    pathfinding = require('pathfinding'),
    display = require('./displayGrid'),
    
    array2d = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]
    ],
    grid,
    finder,
    path,
    markPathTile,
    markPath;

grid = new pathfinding.Grid(array2d[0].length, array2d.length, array2d);
finder = new pathfinding.AStarFinder();
    
path = finder.findPath(1, 0, 1, 2, grid);

// :: [number, number] -> grid -> void
markPathTile = R.curry(function(tile, grid) {
    grid[tile[1]][tile[0]] = 2; // side effect
});

// :: grid -> grid
markPath = R.pipe(
    R.prependTo([]),
    R.tap(R.ap(R.map(markPathTile, path))),
    R.head
);

/*
    tap(fn, val) => { fn(val); return val; }
    
    R.cloneDeep(array2d) 
    |-> markPath(clonedGrid) 
        =>
        R.pipe(
            R.prependTo([]),
            R.tap(R.ap(R.map(markPathTile, path))),
            R.head 
        )
        =>
        R.prependTo([], clonedGrid)
        |-> R.tap(R.ap(R.map(markPathTile, path))), [clonedGrid])
            => R.ap(R.map(markPathTile, path), [clonedGrid])
                    => R.ap(R.map(markPathTile, [tile1, tile2, ...]), [clonedGrid])
                    => R.ap([markPathTile(tile1), markPathTile(tile2), ...], [clonedGrid])
                    => [markPathTile(tile1, clonedGrid), markPathTile(tile2, clonedGrid), ...]
                return [clonedGrid]
        |-> R.head([clonedGrid])
    |-> display.toString(clonedGrid)
        
*/

console.log('path:', path);
console.log(R.pipe(
    R.cloneDeep,
    markPath,
    display.toString
)(array2d));