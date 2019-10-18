var c = document.getElementById("canvas");
var context = c.getContext("2d");

function grabImages(imgs, callback) {
    var imageList = {};
    var loaded = 0;
    for (var i = 0; imgs.length > i; i++) {
        imageList[imgs[i].name] = new Image();
        imageList[imgs[i].name].src = imgs[i].src;
        imageList[imgs[i].name].onload = function () {
            loaded++
        }
    }
    function testForAllLoaded() {
        if (loaded == imgs.length) {
            callback(imageList);
        } else {
            setTimeout(testForAllLoaded, 0);
        }
    }
    testForAllLoaded();
}

function dataFromImg(url, callback) {
    var img = new Image();
    img.src = url;
    img.onload = function() {
        var imagecanvas = document.createElement("canvas");
        var imagecontext = imagecanvas.getContext("2d");
        imagecanvas.width = img.width;
        imagecanvas.height = img.height;
        imagecontext.drawImage(img, 0, 0);
        callback(imagecontext.getImageData(0, 0, img.width, img.height));
    }
}

function AABB(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.w = this.x2 - this.x1;
    this.h = this.y2 - this.y1;
    this.center = {
        x: (x1 + x2) / 2,
        y: (y1 + y2) / 2
    };
    this.draw = function() {
        context.strokeRect(Math.round(this.x1), Math.round(this.y1), this.w, this.h);
    }
    this.collide = function(aabb) {
        if (Math.abs(this.center.x - aabb.center.x) <= this.w / 2 + aabb.w / 2 && Math.abs(this.center.y - aabb.center.y) <= this.h / 2 + aabb.h / 2) {
            return true;
        }
        return false;
    }
    this.move = function(x, y) {
        this.x1 += x;
        this.x2 += x;
        this.y1 += y;
        this.y2 += y;
        this.center.x += x;
        this.center.y += y;
        return this;
    }
}

function getBooleanGrid(imgdata) {
	var data = imgdata.data;
    var returnData = [];
	for (var i = 0; data.length > i; i+=4) {
    	returnData.push(data[i] < 127);
    }
    return returnData;
}

function getAABBGrid(arr, width, size) {
    var height = arr.length / width;
    var arr2 = JSON.parse(JSON.stringify(arr));
    var aabbs = [];
    for (var i = 0; height > i; i++) {
        for (var j = 0; width > j; j++) {
			if (arr2[i * width + j]) {
            	arr2[i * width + j] = false;
                var k = 1;
                var l = 1;
            	if (arr2[i * width + j + 1]) {
                	while (arr2[i * width + j + k] && (j + k) % width != 0) {
                    	arr2[i * width + j + k] = false;
                    	k++;
                        
                    }
                } else if (arr2[i * width + j + l * width] && (i + l) % height != 0) {
                	while (arr2[i * width + j + l * width]) {
                    	arr2[i * width + j + l * width] = false;
                    	l++;
                    }
                } else {
                	k = 1;
                    l = 1;
                }
                aabbs.push(new AABB(size * j, size * i, size * (j + k), size * (i + l)))
            }
        }
    }
    return aabbs;
}

function clamp(v, min, max) {
    return (v > min) ? ((v < max) ? v : max) : min;
}

function between(v, min, max) {
    return v == clamp(v, min ,max);
}

var mousex = 0;
var mousey = 0;
var mousexs = 0;
var mouseys = 0;

document.addEventListener("mousemove", function(e) {
    mousex = e.clientX;
    mousey = e.clientY;
    mousexs = (e.clientX - window.innerWidth / 2) * (c.width / window.innerWidth);
    mouseys = (e.clientY - window.innerHeight / 2) * (c.height / window.innerHeight);
})

var keys = {}
document.addEventListener("keydown", function(e) {
    keys[e.key] = true;
})
document.addEventListener("keyup", function(e) {
    keys[e.key] = false;
})

var player = {
    beforew: 0,
    afterw: 0,
    x: 100,
    y: -100,
    dx: 0,
    dy: 0,
    olddx: 0,
    olddy: 0,
    bounds: [-7, -7, 7, 7],
    getHitbox: function() {
        return new AABB(this.x + this.bounds[0], this.y + this.bounds[1], this.x + this.bounds[2], this.y + this.bounds[3]);
    },
    physics: function() {
        this.olddx = this.dx;
        this.olddy = this.dy;
        this.afterw++;
        this.dy += 0.8;
        if (keys.a) {
            this.dx -= (Math.sign(this.dx) == -1) ? 1 : 2;
        }
        if (keys.d) {
            this.dx += (Math.sign(this.dx) == 1) ? 1 : 2;
        }
        if (keys.w) {
            this.afterw = 0;
        }
        this.dx *= 0.85;
        this.x += this.dx;
        var hitbox = this.getHitbox();
        for (var i = 0; obst.length > i; i++) {
            var e = obst[i];
            if (hitbox.collide(e)) {
                this.x -= this.dx;
                if (hitbox.center.x < e.center.x) {
                    this.x = e.center.x - e.w / 2 - hitbox.w / 2 - 0.1;
                    this.dx *= -0.8;
                } else {
                    this.x = e.center.x + e.w / 2 + hitbox.w / 2 + 0.1;
                    this.dx *= -0.8;
                }
            }
        }
        this.y += this.dy;
        var jumpable = false;
        hitbox = this.getHitbox();
        for (var i = 0; obst.length > i; i++) {
            var e = obst[i];
            if (hitbox.collide(e)) {
                this.y -= this.dy;
                if (hitbox.center.y < e.center.y) {
                    this.y = e.center.y - e.h / 2 - hitbox.h / 2 - 0.1;
                    this.dy = 0;
                    jumpable = true;
                    this.beforew = 0;
                    if (keys.w && this.afterw < 4) {
                        this.dy -= 11;
                        this.beforew = 4;
                        this.afterw = 4;
                    }
                } else {
                    this.y = e.center.y + e.h / 2 + hitbox.h / 2 + 0.1;
                    this.dy *= -0.25;
                }
            }
        }
        if (!jumpable) {
            if (keys.w && this.beforew < 4) {
                this.dy -= 11;
                this.beforew = 4;
            }
            this.beforew++;
        }
    }
};

var obst = [];

var tileData;

var tilePieceMap = [];

var tileMapWidth = 0;
var tileMapHeight = 0;

var canv = document.createElement("canvas");

dataFromImg("maptest.png", function (data) {
    dataFromImg("tilemap.png", function (tileMapData) {
        obst = getAABBGrid(getBooleanGrid(data), data.width, 16);
        //tilePieceMap = tilePieceArray(getNeighbors(getBooleanGrid(data), data.width));
        tilePieceMap = tilePieceArray(getNeighborsWithColor(tileMapData.data, tileMapData.width));
        tileMapWidth = data.width;
        tileMapHeight = data.height;
        canv.width = tileMapWidth * 16;
        canv.height = data.height * 16;
        grabImages([{ name: "tilesettest", src: "tileset3.png"}, { name: "truss", src: "tileset_truss.png"}, { name: "black", src: "tileset_black.png"}], function (tileImage) {
            tileData = tileImage.tilesettest; 
            var mapctx = canv.getContext("2d");
            drawTilePieceArray(tilePieceMap, tileImage, canv.getContext("2d"), tileMapWidth, 16, 16, tileMapData.data, { 0: "tilesettest", 255: "truss", 16777215: undefined });
            mapctx.globalCompositeOperation = "source-atop";
            var mapLayer2 = document.createElement("canvas");
            var mapLayer2Context = mapLayer2.getContext("2d");
            mapLayer2.width = canv.width;
            mapLayer2.height = canv.height;
            drawTilePieceArray(tilePieceMap, tileImage, mapLayer2Context, tileMapWidth, 16, 16, tileMapData.data, { 0: "black", 16777215: undefined });
            mapLayer2Context.globalCompositeOperation = "source-in";
            taxicabVoronoiImage(0, 0, tileMapWidth * 16, tileMapHeight * 16, mapLayer2Context, 700, "#00000066", "#00000033");
            mapctx.drawImage(mapLayer2, 0, 0);
            loop();
        });
    });
});

var windowScroll = {
    x: 0,
    y: 0
};

var shadowmask = document.createElement("canvas");
shadowmask.width = 768;
shadowmask.height = 432;
var shadowmaskContext = shadowmask.getContext("2d");
shadowmaskContext.fillRect(0, 0, shadowmask.width, shadowmask.height);
shadowmaskContext.globalCompositeOperation = "destination-out";

shadowmaskContext.fillStyle = "#00000022";

for (var i = 0; 10 > i; i++) {
    shadowmaskContext.beginPath();
    shadowmaskContext.arc(shadowmask.width / 2, shadowmask.height / 2, i * 25, 0, Math.PI * 2);
    shadowmaskContext.fill();
}

var screenshake = 0;

var background = document.createElement("canvas");
background.width = 2048;
background.height = 512;
taxicabVoronoiImage(0, 0, 2048, 512, background.getContext("2d"), 700, "#00000066", "#00000033");

function loop() {
    screenshake *= 0.7;
    windowScroll.x -= (windowScroll.x - (player.x + mousexs / 2 + screenshake * (Math.random() - 0.5))) / 10;
    windowScroll.y -= (windowScroll.y - (player.y + mouseys / 2 + screenshake * (Math.random() - 0.5))) / 10;
    context.clearRect(0, 0, c.width, c.height);
    player.physics();

    context.fillStyle = "#2A2A2A";
    context.fillRect(0, 0, c.width, c.height);

    context.save();
    context.translate(c.width / 2 - Math.round(windowScroll.x), c.height / 2 - Math.round(windowScroll.y));
    context.drawImage(background, Math.round(windowScroll.x * -0.25), Math.round(windowScroll.y * -0.25));
    //obst.forEach(e => e.draw());
    //drawTilePieceArray(tilePieceMap, tileData, context, tileMapWidth, 16, 16);
    context.drawImage(canv, 0, 0);


    context.fillStyle = "Black";
    context.fillRect(Math.floor(player.x) - 7, Math.floor(player.y) - 7, 15, 15);
    context.drawImage(shadowmask, -shadowmask.width / 2 + player.x, -shadowmask.height / 2 + player.y)

    context.restore();


    // context.fillStyle = context.createRadialGradient(c.width / 2, c.height / 2, 50, c.width / 2, c.height / 2, 200);
    // context.fillStyle.addColorStop(1, "#000000FF");
    // context.fillStyle.addColorStop(0, "#00000000");
    // context.fillRect(0, 0, c.width, c.height);



    requestAnimationFrame(loop);
}
