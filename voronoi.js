//returns the indexes of the point closest to the given pixel
function taxicabVoronoi(points, x, y, w, h) {
	var result = [];
	for (var i = 0; h > i; i++) {
    	for (var j = 0; w > j; j++) {
        	var mindist = Infinity;
            var mindist2 = Infinity;
            var mindistindex = undefined;
            for (var k = 0; points.length > k; k++) {
            	var dist = Math.abs(points[k].x - j) + Math.abs(points[k].y - i);
                if (mindist > dist) {
                	mindist2 = mindist;
                	mindist = dist;
                    mindistindex = k;
                }
            }
            result[i * w + j] = mindistindex;
        }
    }
    return result;
}

//generates the points
function makeFlooredPoints(count, minimumDist, w, h) {
    var pts = [];
    for (var i = 0; count > i; i++) {
        var newpt = {
            x: Math.floor(Math.random() * w),
            y: Math.floor(Math.random() * h),
        };
        var mindist = Infinity;
        for (var k = 0; pts.length > k; k++) {
            var dist = Math.abs(pts[k].x - newpt.x) + Math.abs(pts[k].y - newpt.y);
            if (mindist > dist) {
                mindist = dist;
            }
        }
        if (mindist > minimumDist) {
            pts.push(newpt);
        }
    }
    return pts;
}

function drawTaxicabVoronoi(x, y, w, h, ctx, count, color1, color2) {
    var closests = taxicabVoronoi(makeFlooredPoints(count, 3, w, h), x, y, w, h);

    //draws regions baed on when the closest point changes
    for (var i = 0; h - 1 > i; i++) {
        for (var j = 0; w - 1 > j; j++) {
            if (closests[i * w + j] != closests[i * w + j + 1] || closests[i * w + j] != closests[i * w + j + w]) {
                ctx.fillStyle = color1;
                ctx.fillRect(j, i, 1, 1);
            } else if (closests[i * w + j] != closests[i * w + j - 1] || closests[i * w + j] != closests[i * w + j - w]) {
                ctx.fillStyle = color2;
                ctx.fillRect(j, i, 1, 1);
            }
        }
    }
}

function taxicabVoronoiImage(x, y, w, h, ctx, count, color1, color2) {
    var voronoiCanvas = document.createElement("canvas");
    voronoiCanvas.width = w;
    voronoiCanvas.height = h;
    drawTaxicabVoronoi(0, 0, w, h, voronoiCanvas.getContext("2d"), count, color1, color2);
    ctx.drawImage(voronoiCanvas, x, y);
}