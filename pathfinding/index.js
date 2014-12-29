var R = require('ramda'),
    pathfinding = require('pathfinding'),
    display = require('./displayGrid'),
    markPath = require('./markPath'),
    
    map = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]
    ],
    grid,
    finder,
    path;

grid = new pathfinding.Grid(map[0].length, map.length, map);
finder = new pathfinding.AStarFinder();
    
path = finder.findPath(1, 0, 1, 2, grid);

console.log('path:', path);
console.log(R.pipe(
    markPath(path),
    display.toString
)(map));