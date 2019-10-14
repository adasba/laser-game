function getNeighbors(arr, width) {
    var height = arr.length / width;
    var celldata = []
    for (var i = 0; height > i; i++) {
        for (var j = 0; width > j; j++) {
            celldata.push({ neighbors: [] });
            for (var k = -1; 2 > k; k++) {
                for (var l = -1; 2 > l; l++) {
                    if (between(j + l, 0, width - 1) && between(i + k, 0, height - 1)) {
                        celldata[i * width + j].neighbors.push(arr[i * width + j + k * width + l])
                    } else {
                        celldata[i * width + j].neighbors.push(0)
                    }
                }
            }
        }
    }
    return celldata;
}

function getNeighborsWithColor(arr, width) {
    var height = arr.length / width / 4;
    var celldata = []
    for (var i = 0; height > i; i++) {
        for (var j = 0; width > j; j++) {
            celldata.push({ neighbors: [] });
            for (var k = -1; 2 > k; k++) {
                for (var l = -1; 2 > l; l++) {
                    var index = (i * width + j)
                    var nindex = ((i + k) * width + j + l);
                    if (between(j + l, 0, width - 1) && between(i + k, 0, height - 1)) {
                        celldata[index].neighbors.push(arr[index * 4] == arr[nindex * 4] && arr[index * 4 + 1] == arr[nindex * 4 + 1] && arr[index * 4 + 2] == arr[nindex * 4 + 2])
                    } else {
                        celldata[index].neighbors.push(0)
                    }
                }
            }
        }
    }
    return celldata;
}

// function findColor(arr, r, g, b, width) {
//     var height = arr.length / width;
//     var celldata = []
//     for (var i = 0; height > i; i++) {
//         for (var j = 0; width > j; j++) {
//             if (arr[(i + width * j) * 4] == r && arr[(i + width * j) * 4 + 1] == g && arr[(i + width * j) * 4 + 2] == b) {
//                 celldata.push(true)
//             } else {
//                 celldata.push(false);
//             }
//         }
//     }
//     return celldata;
// }

// function separateAllColors(arr, width) {
//     var height = arr.length / width;
//     var returnArrs = {};
//     var colors = [];
//     for (var i = 0; height > i; i++) {
//         for (var j = 0; width > j; j++) {
//             var colOfThisPixel = arr[(i + width * j) * 4] + arr[(i + width * j) * 4 + 1] * 256 + arr[(i + width * j) * 4 + 2] * 65536;
//             if (colors.indexOf(colOfThisPixel) == -1) {
//                 colors[colOfThisPixel] = new Array(width * height);
//                 returnArrs[colOfThisPixel] = true;
//             } else {
//                 returnArrs[colOfThisPixel] = true;
//             }
//         }
//     }
//     return returnArrs;
// }

// function multicoloredNeighborSet

// function rotateNC(nConfig) {
//     var transform = [
//         2, 5, 9,
//         1, 4, 8,
//         0, 3, 7
//     ];
//     var newNConfig = [];
//     for (var i = 0; nConfig.length > i; i++) {
//         newNConfig[trannsform[i]] = nConfig[i];
//     }
//     return newNConfig;
// }

// function rotateNC180(a) {
//     return rotateNeighborConfig(rotateNeighborConfig(a));
// }

// function intersectNC(config1, config2) {
//     var config3 = [];
//     for (var i = 0; 9 > i; i++) {
//         config3.push((config1 && config2) ? 1 : 0);
//     }
// }

// tileConfigs = {
//     empty: [
//         0, 0, 0,
//         0, 0, 0,
//         0, 0, 0
//     ],
//     full: [
//         1, 1, 1,
//         1, 1, 1,
//         1, 1, 1
//     ],
//     edge: [
//         1, 1, 0,
//         1, 1, 0,
//         1, 1, 0
//     ],
//     cornerOut: [
//         0, 0, 0,
//         1, 1, 0,
//         1, 1, 0
//     ],
//     cornerIn: [
//         1, 1, 0,
//         1, 1, 1,
//         1, 1, 1
//     ],
//     u: [
//         0, 0, 0,
//         0, 1, 0,
//         0, 1, 0
//     ],
//     single: [
//         0, 0, 0,
//         0, 1, 0,
//         0, 0, 0
//     ],
//     singleEdge: [
//         0, 1, 0,
//         0, 1, 0,
//         0, 1, 0
//     ],
//     singleCorner: [
//         0, 1, 0,
//         0, 1, 
//     ]
// };





function rotateNC(nConfig) {
    var transform = [
        2, 5, 8,
        1, 4, 7,
        0, 3, 6
    ];
    var newNConfig = [];
    for (var i = 0; nConfig.length > i; i++) {
        newNConfig[i] = transform[nConfig[i]]
    }
    return newNConfig;
}





// function testNCMatch(nc, tc2) {
//     var tc = tc2.concat();
//     var whatToReturn = { state: true, dirs: [] };
//     for (var i = 0; 4 > i; i++) {
//         whatToReturn.state = true;
//         tc.forEach(function (e) {
//             if (nc[e] != 0) {
//                 whatToReturn.state = false;
//             }
//         });
//         if (whatToReturn.state) {
//             tc.forEach(function (e) {
//                 nc[e] = 1;
//             })
//         }
//         if (whatToReturn.state) {
//             whatToReturn.dirs.push(i);
//         }
//         if (whatToReturn.dirs.length != 0) {
//             whatToReturn.state = true;
//         }
//         tc = rotateNC(tc);
//     }
//     return whatToReturn;
// }

// var tileConfigs = {
//     cornerIn: [2],
//     edge: [2, 5, 8],
//     cornerOut: [0, 1, 2, 5, 8],
//     u: [6, 3, 0, 1, 2, 5, 8],
//     x: [7, 6, 3, 0, 1, 2, 5, 8]
// }

// function getTileConfigs(arr, width) {
//     var tileConfigList = [];
//     arr.forEach(function (e, i) {
//         tileConfigList.push([]);
//         tileConfigList[i].push(testNCMatch(e.neighbors, tileConfigs.x));
//         tileConfigList[i].push(testNCMatch(e.neighbors, tileConfigs.u));
//         tileConfigList[i].push(testNCMatch(e.neighbors, tileConfigs.cornerOut));
//         tileConfigList[i].push(testNCMatch(e.neighbors, tileConfigs.edge));
//         tileConfigList[i].push(testNCMatch(e.neighbors, tileConfigs.cornerIn));
//     });
//     return tileConfigList;
// }

function hasNC(nc, neighbors) {
    var toReturn = true;
    nc.empty.forEach(function (e) {
        if (neighbors[e]) {
            toReturn = false;
        }
    });
    nc.filled.forEach(function (e) {
        if (!neighbors[e]) {
            toReturn = false;
        }
    });
    return toReturn;
}

function getNCDirs(nc, neighbors) {
    var dirs = [];
    if (!neighbors[4]) {
        return [];
    }
    for (var i = 0; 4 > i; i++) {
        if (hasNC(nc, neighbors)) {
            dirs.push(i)
        }
        nc.empty = rotateNC(nc.empty);
        nc.filled = rotateNC(nc.filled);
    }
    return dirs
}

function getTilePiece(tile) {
    return {
        edge: getNCDirs(neighborConfigs.edge, tile.neighbors),
        cornerIn: getNCDirs(neighborConfigs.cornerIn, tile.neighbors),
        cornerOut: getNCDirs(neighborConfigs.cornerOut, tile.neighbors),
        edgeLeft: getNCDirs(neighborConfigs.edgeLeft, tile.neighbors),
        edgeRight: getNCDirs(neighborConfigs.edgeRight, tile.neighbors),
        filled: tile.neighbors[4] ? [0] : []
    };
}

function tilePieceArray(tiles) {
    var pieces = [];
    tiles.forEach(function (e) {
        pieces.push(getTilePiece(e));
    })
    return pieces;
}

var neighborConfigs = {
    filled: { index: 0 },
    edge: { empty: [1], filled: [], index: 1 },
    cornerIn: { empty: [1, 5], filled: [], index: 2 },
    cornerOut: { empty: [2], filled: [1, 5], index: 3 },
    edgeLeft: { empty: [1], filled: [3], index: 4 },
    edgeRight: { empty: [1], filled: [5], index: 5 },
}

var ncNames = ["filled", "edge", "cornerIn", "cornerOut", "edgeLeft", "edgeRight"];

function drawTilePiece(piece, tilesets, ctx, x, y, w, h, tileMapData, tileMapKey, index) {
    ctx.save();
    ctx.translate(x * w + w / 2, y * h + h / 2);
    ncNames.forEach(function (e, i) {
        for (var j = 0; piece[e].length > j; j++) {
            ctx.save();
            ctx.rotate(Math.PI / 2 * piece[e][j]);
           // console.log(tileMapKey[tileMapData[i * 4] + tileMapData[i * 4 + 1] * 256 + tileMapData[i * 4 + 2] * 65536])
            //console.log(tileMapData[i * 4] + tileMapData[i * 4 + 1] * 256 + tileMapData[i * 4 + 2] * 65536)
            var tilesetName = tileMapKey[tileMapData[index * 4] + tileMapData[index * 4 + 1] * 256 + tileMapData[index * 4 + 2] * 65536]
            if (tilesetName) {
                ctx.drawImage(tilesets[tilesetName], w * i, 0, w, h, -w / 2, -h / 2, w, h);
            }
            ctx.restore();
        } 
    });
    ctx.restore();
}

function drawTilePieceArray(arr, tilesets, ctx, width, w, h, tileMapData, tileMapKey) {
    arr.forEach(function (e, i) {
        drawTilePiece(e, tilesets, ctx, i % width, Math.floor(i / width), w, h, tileMapData, tileMapKey, i);
    });
}