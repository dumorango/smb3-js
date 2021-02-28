/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/canvas.ts":
/*!***********************!*\
  !*** ./src/canvas.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.canvasContext = exports.drawSprite = void 0;
/* istanbul ignore file */
const canvas = document.createElement("canvas");
canvas.width = 256 * 3;
canvas.height = 240 * 3;
document.body.appendChild(canvas);
const context = canvas.getContext("2d");
if (!context)
    throw Error("Error getting canvas context");
context.imageSmoothingEnabled = false;
context.filter = "none";
context.scale(3, 3);
const drawSprite = ({ coordinates }, position, img, shouldDrawBorders = false) => {
    const { position: spritePosition, size } = coordinates;
    const { width, height } = size;
    if (shouldDrawBorders) {
        context.beginPath();
        context.rect(position.x, position.y, size.width, size.height);
        context.strokeStyle = "red";
        context.stroke();
    }
    context.drawImage(img, spritePosition.x, spritePosition.y, width, height, position.x, position.y, width, height);
};
exports.drawSprite = drawSprite;
exports.canvasContext = context;


/***/ }),

/***/ "./src/colision.ts":
/*!*************************!*\
  !*** ./src/colision.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.bounceUp = exports.turnAroundOnCollideHorizontally = exports.stopOnColideSolid = void 0;
const stopOnColideSolid = (hitSide, hitBox, movement, { height, width, }) => {
    let { velocity, position } = movement;
    if (hitSide === "TOP" && velocity.y > 0) {
        velocity.y = 0;
        position.y = hitBox.top - height;
    }
    else if (hitSide === "BOTTOM" && velocity.y < 0) {
        velocity.y = 0;
        position.y = hitBox.bottom;
    }
    else if (hitSide === "LEFT" && velocity.x > 0) {
        velocity.x = 0;
        position.x = hitBox.left - width;
    }
    else if (hitSide === "RIGHT" && velocity.x < 0) {
        velocity.x = 0;
        position.x = hitBox.right;
    }
    return Object.assign(Object.assign({}, movement), { velocity,
        position });
};
exports.stopOnColideSolid = stopOnColideSolid;
const turnAroundOnCollideHorizontally = (hitSide, hitBox, movement, { height }) => {
    let { velocity, position, acceleration } = movement;
    if (hitSide === "TOP" && velocity.y > 0) {
        velocity.y = 0;
        position.y = hitBox.top - height;
    }
    else if (hitSide === "BOTTOM" && velocity.y < 0) {
        velocity.y = 0;
        position.y = hitBox.bottom;
    }
    else if (hitSide === "LEFT" && velocity.x > 0) {
        acceleration.x = -acceleration.x;
    }
    else if (hitSide === "RIGHT" && velocity.x < 0) {
        acceleration.x = -acceleration.x;
    }
    return {
        acceleration,
        velocity,
        position,
    };
};
exports.turnAroundOnCollideHorizontally = turnAroundOnCollideHorizontally;
const bounceUp = (movement) => {
    return Object.assign(Object.assign({}, movement), { velocity: Object.assign(Object.assign({}, movement.velocity), { y: -4 }) });
};
exports.bounceUp = bounceUp;


/***/ }),

/***/ "./src/design.ts":
/*!***********************!*\
  !*** ./src/design.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getStage = void 0;
const initialPosition = {
    x: 200,
    y: 12 * 16,
};
const initialPosition2 = {
    x: 230,
    y: 12 * 16,
};
const getEnemies = () => {
    const goomba = {
        type: "GOOMBA",
        position: initialPosition,
    };
    const goomba2 = {
        type: "GOOMBA",
        position: initialPosition2,
    };
    return [goomba, goomba2];
};
const getBackgroundLayer = () => {
    const sky = {
        type: "SKY",
        size: { width: 16, height: 15 },
    };
    const skySpawnPoint = {
        pattern: sky,
        position: {
            x: 0,
            y: 0,
        },
    };
    const ground = {
        type: "GROUND",
        length: 16,
    };
    const groundSpawnPoint = {
        pattern: ground,
        position: {
            x: 0,
            y: 13,
        },
    };
    const pipe = {
        type: "PIPE",
        height: 2,
    };
    const pipePatternSpawnPoint = {
        pattern: pipe,
        position: {
            x: 5,
            y: 11,
        },
    };
    const pipePatternSpawnPoint2 = {
        pattern: pipe,
        position: {
            x: 15,
            y: 11,
        },
    };
    const brick = {
        type: "BRICK",
    };
    const brickSpawn = {
        pattern: brick,
        position: {
            x: 4,
            y: 9,
        },
    };
    return {
        patterns: [
            skySpawnPoint,
            groundSpawnPoint,
            pipePatternSpawnPoint,
            pipePatternSpawnPoint2,
            brickSpawn,
        ],
    };
};
const INITIAL_POSITION = {
    x: 20,
    y: 12 * 10 + 1,
};
const getStage = () => ({
    layers: [getBackgroundLayer()],
    enemies: getEnemies(),
    player: {
        position: INITIAL_POSITION,
    },
});
exports.getStage = getStage;


/***/ }),

/***/ "./src/frame-stream.ts":
/*!*****************************!*\
  !*** ./src/frame-stream.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFrameStream = void 0;
function getFrameStream() {
    return __asyncGenerator(this, arguments, function* getFrameStream_1() {
        while (true) {
            yield yield __await(new Promise((resolve) => {
                const previousTime = performance.now();
                requestAnimationFrame((time) => {
                    const timeBetweenFrames = time - previousTime;
                    const fps = 1000 / timeBetweenFrames;
                    resolve({ time, fps });
                });
            }));
        }
    });
}
exports.getFrameStream = getFrameStream;


/***/ }),

/***/ "./src/game.ts":
/*!*********************!*\
  !*** ./src/game.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadGame = exports.runFrame = void 0;
const colision_1 = __webpack_require__(/*! ./colision */ "./src/colision.ts");
const movement_1 = __webpack_require__(/*! ./movement */ "./src/movement.ts");
const canvas_1 = __webpack_require__(/*! ./canvas */ "./src/canvas.ts");
const player_movement_1 = __webpack_require__(/*! ./player-movement */ "./src/player-movement.ts");
const tiled_sprites_1 = __webpack_require__(/*! ./tiled-sprites */ "./src/tiled-sprites.ts");
const images_1 = __webpack_require__(/*! ./images */ "./src/images.ts");
const frame_stream_1 = __webpack_require__(/*! ./frame-stream */ "./src/frame-stream.ts");
const HIT_MARGIN = 5;
function getColitionHit(hitBox1, hitBox2) {
    const areVerticalAligned = hitBox1.right >= hitBox2.left + HIT_MARGIN &&
        hitBox1.left <= hitBox2.right - HIT_MARGIN;
    const areHorizontalAligned = hitBox1.bottom >= hitBox2.top + HIT_MARGIN &&
        hitBox1.top <= hitBox2.bottom - HIT_MARGIN;
    const hitTop = Math.abs(hitBox1.bottom - hitBox2.top) < HIT_MARGIN;
    const hitBottom = Math.abs(hitBox1.top - hitBox2.bottom) < HIT_MARGIN;
    const hitRight = Math.abs(hitBox1.left - hitBox2.right) < HIT_MARGIN;
    const hitLeft = Math.abs(hitBox1.right - hitBox2.left) < HIT_MARGIN;
    if (areVerticalAligned) {
        if (hitTop)
            return "TOP";
        else if (hitBottom)
            return "BOTTOM";
    }
    else if (areHorizontalAligned) {
        if (hitRight)
            return "RIGHT";
        else if (hitLeft)
            return "LEFT";
    }
}
const getHitBox = ({ x, y }, { width, height }) => {
    return {
        left: x,
        right: x + width,
        top: y,
        bottom: y + height,
    };
};
const accelerationConfig = {
    gravity: 0.1,
    maxSpeed: 2,
    friction: 0.15,
};
const keyMap = {
    ["RIGHT"]: "KeyD",
    ["LEFT"]: "KeyA",
    ["JUMP"]: "KeyJ",
};
const runFrame = (stage) => {
    var _a, _b, _c, _d, _e;
    // Apply movement to player and enemies
    stage.mario.movement = movement_1.applyMovement(accelerationConfig, stage.mario.movement);
    for (const enemy of stage.enemies) {
        enemy.movement = movement_1.applyMovement(accelerationConfig, enemy.movement);
    }
    //Apply collitions
    const playerHitBox = getHitBox(stage.mario.movement.position, stage.mario.sprite.coordinates.size);
    for (const patternState of stage.patterns) {
        const patternHitBox = getHitBox(patternState.movement.position, tiled_sprites_1.getPatternSize(patternState.pattern));
        // Apply colition between player and patterns
        const patternHitSide = getColitionHit(playerHitBox, patternHitBox);
        if (patternHitSide &&
            patternHitSide === "BOTTOM" &&
            ((_a = patternState.traits) === null || _a === void 0 ? void 0 : _a.includes("BREAKABLE")) &&
            !((_b = patternState.traits) === null || _b === void 0 ? void 0 : _b.includes("BROKEN")) &&
            stage.mario.movement.velocity.y < 0) {
            (_c = patternState.traits) === null || _c === void 0 ? void 0 : _c.push("BROKEN");
            stage.mario.movement = colision_1.stopOnColideSolid(patternHitSide, patternHitBox, stage.mario.movement, stage.mario.sprite.coordinates.size);
        }
        if (patternHitSide &&
            ((_d = patternState.traits) === null || _d === void 0 ? void 0 : _d.includes("SOLID")) &&
            !patternState.traits.includes("BROKEN")) {
            stage.mario.movement = colision_1.stopOnColideSolid(patternHitSide, patternHitBox, stage.mario.movement, stage.mario.sprite.coordinates.size);
        }
        for (let enemyState of stage.enemies) {
            const enemyHitbox = getHitBox(enemyState.movement.position, enemyState.sprite.coordinates.size);
            // Apply colition between enemy and patterns
            const enemyHitSide = getColitionHit(enemyHitbox, patternHitBox);
            if (enemyHitSide && enemyState.traits.includes("SIDEWAYS_WALKER")) {
                enemyState.movement = colision_1.turnAroundOnCollideHorizontally(enemyHitSide, patternHitBox, enemyState.movement, enemyState.sprite.coordinates.size);
            }
            else if (enemyHitSide && ((_e = patternState.traits) === null || _e === void 0 ? void 0 : _e.includes("SOLID"))) {
                enemyState.movement = colision_1.stopOnColideSolid(enemyHitSide, patternHitBox, enemyState.movement, enemyState.sprite.coordinates.size);
            }
            // Apply colision between player and enemy
            const playerOnEnemyHitSide = getColitionHit(playerHitBox, enemyHitbox);
            if (playerOnEnemyHitSide === "TOP" &&
                enemyState.traits.includes("BOUNCEABLE") &&
                !enemyState.isDead) {
                stage.mario = Object.assign(Object.assign({}, stage.mario), { movement: colision_1.bounceUp(stage.mario.movement) });
                enemyState.isDead = true;
            }
            const enemyOnPlayerHitSide = getColitionHit(playerHitBox, enemyHitbox);
            if (!enemyState.isDead &&
                enemyOnPlayerHitSide &&
                enemyOnPlayerHitSide !== "TOP") {
                stage.mario.isDead = true;
            }
        }
    }
    return stage;
};
exports.runFrame = runFrame;
const loadGame = async (stage) => {
    const spriteImages = await images_1.loadSpritesImages();
    (async () => {
        var _a;
        while (!(await frame_stream_1.getFrameStream().next()).done) {
            exports.runFrame(stage);
            // Draw state, enemies and player
            // Draw state patterns
            for (const patternState of stage.patterns) {
                if (!((_a = patternState.traits) === null || _a === void 0 ? void 0 : _a.includes("BROKEN"))) {
                    const tiles = tiled_sprites_1.getPatternTiles(patternState.pattern);
                    const tilesPlacements = tiled_sprites_1.getTilesSpricePlacements(tiles, patternState.movement.position);
                    for (const { sprite, position } of tilesPlacements) {
                        canvas_1.drawSprite(sprite, position, spriteImages[sprite.image]);
                    }
                }
            }
            // Draw enemies
            stage.enemies.map((enemyState) => {
                if (!enemyState.isDead) {
                    canvas_1.drawSprite(enemyState.sprite, enemyState.movement.position, spriteImages[enemyState.sprite.image]);
                }
            });
            // Draw player
            if (!stage.mario.isDead) {
                canvas_1.drawSprite(stage.mario.sprite, stage.mario.movement.position, spriteImages[stage.mario.sprite.image]);
            }
        }
    })();
    (async () => {
        var e_1, _a;
        try {
            for (var _b = __asyncValues(player_movement_1.getPlayerMovementStreamByInput(keyMap)), _c; _c = await _b.next(), !_c.done;) {
                const applyMovement = _c.value;
                stage.mario.movement = applyMovement(stage.mario.movement);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    })();
};
exports.loadGame = loadGame;


/***/ }),

/***/ "./src/images.ts":
/*!***********************!*\
  !*** ./src/images.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSpritesImages = void 0;
const enemies_2_png_1 = __webpack_require__(/*! ./img/enemies-2.png */ "./src/img/enemies-2.png");
const smb3_background_tiles_png_1 = __webpack_require__(/*! ./img/smb3_background_tiles.png */ "./src/img/smb3_background_tiles.png");
const smb3_mario_sprites_png_1 = __webpack_require__(/*! ./img/smb3_mario_sprites.png */ "./src/img/smb3_mario_sprites.png");
// Image loading
const loadSpritesImages = async () => {
    const [enemiesSpriteSheet, backgroundSpriteSheet, marioSpriteSheet,] = await Promise.all([enemies_2_png_1.default, smb3_background_tiles_png_1.default, smb3_mario_sprites_png_1.default].map((url) => new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.addEventListener("load", () => resolve(img));
    })));
    return {
        "MARIO": marioSpriteSheet,
        "BACKGROUND": backgroundSpriteSheet,
        "ENEMIES": enemiesSpriteSheet
    };
};
exports.loadSpritesImages = loadSpritesImages;


/***/ }),

/***/ "./src/img/enemies-2.png":
/*!*******************************!*\
  !*** ./src/img/enemies-2.png ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "fd1d106aebfb50cf9d6b8ae051992459.png");

/***/ }),

/***/ "./src/img/smb3_background_tiles.png":
/*!*******************************************!*\
  !*** ./src/img/smb3_background_tiles.png ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "9ea38745fb63bcca32af87fafef2f82a.png");

/***/ }),

/***/ "./src/img/smb3_mario_sprites.png":
/*!****************************************!*\
  !*** ./src/img/smb3_mario_sprites.png ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "e3bc3e389c39c446fc2dd697c3ed9d2f.png");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const game_1 = __webpack_require__(/*! ./game */ "./src/game.ts");
const design_1 = __webpack_require__(/*! ./design */ "./src/design.ts");
const stage_loader_1 = __webpack_require__(/*! ./stage-loader */ "./src/stage-loader.ts");
// let stage = getStageState(marioBreaksBlock);
let stage = stage_loader_1.getStageState(design_1.getStage());
game_1.loadGame(stage);
// setTimeout(() => loadGame(goombaKillsMario), 1000);


/***/ }),

/***/ "./src/movement.ts":
/*!*************************!*\
  !*** ./src/movement.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.applyMovement = exports.applyVelocity = void 0;
const applyVelocity = (position, velocity) => ({
    y: position.y + velocity.y,
    x: position.x + velocity.x,
});
exports.applyVelocity = applyVelocity;
const makeApplyAccelarationOnX = ({ maxSpeed, friction, }) => (acceleration, velocity) => {
    const accelerationSign = Math.sign(acceleration.x);
    const absAcceleration = acceleration.x !== 0 ? Math.abs(acceleration.x) : 0;
    const absVelocity = velocity.x !== 0 ? Math.abs(velocity.x) : 0;
    const absoluteFriction = friction * absVelocity;
    const absoluteFictionedAcceleration = absAcceleration - absoluteFriction;
    const velocityDelta = Math.min(absVelocity + absoluteFictionedAcceleration, maxSpeed);
    const normalizedVelocityDelta = Math.abs(velocityDelta) > 0.1 ? velocityDelta : 0;
    return {
        x: normalizedVelocityDelta * accelerationSign,
        y: velocity.y,
    };
};
const makeApplyAccelarationOnY = ({ gravity }) => (acceleration, velocity) => {
    const accelerationWithGravity = acceleration.y + gravity;
    const velocityDelta = velocity.y + accelerationWithGravity;
    return {
        x: velocity.x,
        y: velocityDelta,
    };
};
const applyAcceleration = (config, movement) => {
    const applyAccelerationOnX = makeApplyAccelarationOnX(config);
    const applyAccelerationOnY = makeApplyAccelarationOnY(config);
    const { velocity, acceleration } = movement;
    const newVelocityX = applyAccelerationOnX(acceleration, velocity);
    const newVelocityY = applyAccelerationOnY(acceleration, newVelocityX);
    return newVelocityY;
};
const applyMovement = (config, movement) => ({
    acceleration: movement.acceleration,
    velocity: applyAcceleration(config, movement),
    position: exports.applyVelocity(movement.position, movement.velocity),
});
exports.applyMovement = applyMovement;


/***/ }),

/***/ "./src/player-movement.ts":
/*!********************************!*\
  !*** ./src/player-movement.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlayerMovementStreamByInput = void 0;
const setAccelerationX = (accX) => (movement) => (Object.assign(Object.assign({}, movement), { acceleration: Object.assign(Object.assign({}, movement.acceleration), { x: accX }) }));
const breakRight = (movement) => {
    if (movement.acceleration.x > 0) {
        return setAccelerationX(0)(movement);
    }
    else {
        return movement;
    }
};
const breakLeft = (movement) => {
    if (movement.acceleration.x < 0) {
        return setAccelerationX(0)(movement);
    }
    else {
        return movement;
    }
};
const setVelocityY = (velocityY) => (movement) => (Object.assign(Object.assign({}, movement), { velocity: Object.assign(Object.assign({}, movement.velocity), { y: velocityY }) }));
const setJumpVelocity = setVelocityY(-4);
const setJumpVelocityIfStopped = (movement) => {
    if (movement.velocity.y === 0) {
        return setJumpVelocity(movement);
    }
    else {
        return movement;
    }
};
function getInputStream(keyMap) {
    return __asyncGenerator(this, arguments, function* getInputStream_1() {
        while (true) {
            yield yield __await(new Promise((resolve) => {
                for (const key in keyMap) {
                    const input = key;
                    document.addEventListener("keydown", (event) => {
                        if (event.code === keyMap[input]) {
                            resolve({ input, action: "PRESS" });
                        }
                    });
                    document.addEventListener("keyup", (event) => {
                        if (event.code === keyMap[input]) {
                            resolve({ input, action: "RELEASE" });
                        }
                    });
                }
            }));
        }
    });
}
function getPlayerMovementStreamByInput(keyMap) {
    return __asyncGenerator(this, arguments, function* getPlayerMovementStreamByInput_1() {
        var e_1, _a;
        try {
            for (var _b = __asyncValues(getInputStream(keyMap)), _c; _c = yield __await(_b.next()), !_c.done;) {
                const inputEvent = _c.value;
                switch (inputEvent.input) {
                    case "RIGHT":
                        switch (inputEvent.action) {
                            case "PRESS":
                                yield yield __await(setAccelerationX(1));
                                break;
                            case "RELEASE":
                                yield yield __await(breakRight);
                                break;
                        }
                        break;
                    case "LEFT":
                        switch (inputEvent.action) {
                            case "PRESS":
                                yield yield __await(setAccelerationX(-1));
                                break;
                            case "RELEASE":
                                yield yield __await(breakLeft);
                                break;
                        }
                        break;
                    case "JUMP":
                        yield yield __await(setJumpVelocityIfStopped);
                        break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) yield __await(_a.call(_b));
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
}
exports.getPlayerMovementStreamByInput = getPlayerMovementStreamByInput;


/***/ }),

/***/ "./src/stage-loader.ts":
/*!*****************************!*\
  !*** ./src/stage-loader.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getStageState = exports.getPatternState = exports.makeGoomba = void 0;
const tiled_sprites_1 = __webpack_require__(/*! ./tiled-sprites */ "./src/tiled-sprites.ts");
const goomba = {
    step1: {
        image: "ENEMIES",
        coordinates: {
            position: {
                x: 2,
                y: 155,
            },
            size: {
                height: 16,
                width: 16,
            },
        },
    },
};
const makeGoomba = (initialPosition) => {
    return {
        type: "GOOMBA",
        traits: ["SIDEWAYS_WALKER", "BOUNCEABLE"],
        movement: {
            position: initialPosition,
            velocity: {
                x: 0,
                y: 0
            },
            acceleration: {
                x: -0.15,
                y: 0
            }
        },
        isDead: false,
        sprite: goomba.step1,
    };
};
exports.makeGoomba = makeGoomba;
const getPatternTraits = (patternType) => {
    switch (patternType) {
        case "GROUND":
        case "PIPE":
            return ["SOLID"];
        case "BRICK":
            return ["SOLID", "BREAKABLE"];
        default:
            return [];
    }
};
const getPatternState = ({ pattern, position, }) => {
    return {
        pattern,
        movement: {
            position: {
                x: position.x * tiled_sprites_1.TILE_SIZE,
                y: position.y * tiled_sprites_1.TILE_SIZE
            },
            velocity: { x: 0, y: 0 },
            acceleration: { x: 0, y: 0 },
        },
        traits: getPatternTraits(pattern.type),
    };
};
exports.getPatternState = getPatternState;
const mario = {
    stalled: {
        image: "MARIO",
        coordinates: {
            position: {
                x: 216,
                y: 89,
            },
            size: {
                height: 15,
                width: 14,
            },
        },
    },
};
const getPlayerInitialState = (playerSpawnPointPosition) => {
    return {
        movement: {
            position: playerSpawnPointPosition,
            velocity: { x: 0, y: 0 },
            acceleration: { x: 0, y: 0 },
        },
        sprite: mario.stalled,
        isDead: false,
    };
};
const getEnemyState = (enemySpawnPoint) => {
    if (enemySpawnPoint.type === "GOOMBA") {
        return exports.makeGoomba(enemySpawnPoint.position);
    }
    else {
        throw new Error(`Enemy type not found: ${enemySpawnPoint.type}`);
    }
};
function* getPatternsState(layers) {
    for (const layer of layers) {
        for (const patternSpawn of layer.patterns) {
            yield exports.getPatternState(patternSpawn);
        }
    }
}
const getStageState = (stageDesign) => {
    return {
        mario: getPlayerInitialState(stageDesign.player.position),
        enemies: stageDesign.enemies.map(getEnemyState),
        patterns: [...getPatternsState(stageDesign.layers)],
    };
};
exports.getStageState = getStageState;


/***/ }),

/***/ "./src/tiled-sprites.ts":
/*!******************************!*\
  !*** ./src/tiled-sprites.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getTilesSpricePlacements = exports.getPatternSize = exports.getPatternTiles = exports.TILE_SIZE = void 0;
exports.TILE_SIZE = 16;
const TILE_PADDING = 1;
const TILE_SPRITES_MAP = {
    "SKY": {
        x: 38,
        y: 1,
    },
    "GROUND_TOP_LEFT": {
        x: 26,
        y: 9,
    },
    "GROUND_TOP_MIDDLE": {
        x: 27,
        y: 9,
    },
    "GROUND_TOP_RIGHT": {
        x: 28,
        y: 9,
    },
    "PIPE_TOP_LEFT": {
        x: 4,
        y: 2,
    },
    "PIPE_TOP_RIGHT": {
        x: 5,
        y: 2,
    },
    "PIPE_BOTTOM_LEFT": {
        x: 4,
        y: 3,
    },
    "PIPE_BOTTOM_RIGHT": {
        x: 5,
        y: 3,
    },
    "BRICK1": {
        x: 61,
        y: 0,
    },
};
const createSkyPattern = ({ width, height }) => {
    const skySpritePattern = Array(height).fill(Array(width).fill("SKY", 0, width), 0, height);
    return skySpritePattern;
};
const createPipePattern = (height) => {
    const base = Array(height).fill([
        "PIPE_BOTTOM_LEFT",
        "PIPE_BOTTOM_RIGHT",
    ]);
    return [["PIPE_TOP_LEFT", "PIPE_TOP_RIGHT"], ...base];
};
const createBrickPattern = () => {
    return [["BRICK1"]];
};
const createGroundPattern = (length) => {
    const middleLength = length > 2 ? length - 2 : 0;
    const tilesArray = Array(middleLength).fill("GROUND_TOP_MIDDLE", 0, middleLength);
    return [["GROUND_TOP_LEFT", ...tilesArray, "GROUND_TOP_RIGHT"]];
};
const getPatternTiles = (pattern) => {
    if (pattern.type === "GROUND") {
        return createGroundPattern(pattern.length);
    }
    else if (pattern.type === "SKY") {
        return createSkyPattern(pattern.size);
    }
    else if (pattern.type === "PIPE") {
        return createPipePattern(pattern.height);
    }
    else if (pattern.type === "BRICK") {
        return createBrickPattern();
    }
    throw new Error(`Pattern Type not mapped`);
};
exports.getPatternTiles = getPatternTiles;
const getPatternSize = (pattern) => {
    const tiles = exports.getPatternTiles(pattern);
    return {
        width: (tiles[0].length) * exports.TILE_SIZE,
        height: (tiles.length) * exports.TILE_SIZE,
    };
};
exports.getPatternSize = getPatternSize;
const getSpriteCoordinates = ({ x, y }) => {
    const sizeWithPadding = exports.TILE_SIZE + TILE_PADDING;
    return {
        position: {
            x: x * sizeWithPadding + TILE_PADDING,
            y: y * sizeWithPadding + TILE_PADDING,
        },
        size: {
            height: exports.TILE_SIZE,
            width: exports.TILE_SIZE,
        },
    };
};
const getTileSprite = (tile) => {
    const tilePosition = TILE_SPRITES_MAP[tile];
    if (!tilePosition)
        throw new Error(`Tile not mapped ${tile}`);
    const coordinates = getSpriteCoordinates(tilePosition);
    return {
        image: "BACKGROUND",
        coordinates,
    };
};
function* getTilesSpricePlacements(tiles, position) {
    const startingPosition = {
        x: position.x,
        y: position.y,
    };
    for (let [j, line] of tiles.entries()) {
        for (let [i, tile] of line.entries()) {
            const sprite = getTileSprite(tile);
            const offset = {
                x: i * exports.TILE_SIZE,
                y: j * exports.TILE_SIZE,
            };
            const position = {
                x: startingPosition.x + offset.x,
                y: startingPosition.y + offset.y,
            };
            yield {
                sprite,
                position,
            };
        }
    }
}
exports.getTilesSpricePlacements = getTilesSpricePlacements;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NhbnZhcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29saXNpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Rlc2lnbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWUtc3RyZWFtLnRzIiwid2VicGFjazovLy8uL3NyYy9nYW1lLnRzIiwid2VicGFjazovLy8uL3NyYy9pbWFnZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltZy9lbmVtaWVzLTIucG5nIiwid2VicGFjazovLy8uL3NyYy9pbWcvc21iM19iYWNrZ3JvdW5kX3RpbGVzLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1nL3NtYjNfbWFyaW9fc3ByaXRlcy5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9tb3ZlbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGxheWVyLW1vdmVtZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9zdGFnZS1sb2FkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RpbGVkLXNwcml0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2hGQSwwQkFBMEI7QUFDMUIsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUVoRCxNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDdkIsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBRXhCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRWxDLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEMsSUFBSSxDQUFDLE9BQU87SUFBRSxNQUFNLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBRTFELE9BQU8sQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUM7QUFDdEMsT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDeEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFYixNQUFNLFVBQVUsR0FBRyxDQUFDLEVBQUUsV0FBVyxFQUFVLEVBQUUsUUFBa0IsRUFBRSxHQUFxQixFQUFFLG9CQUE2QixLQUFLLEVBQUUsRUFBRTtJQUNuSSxNQUFNLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsR0FBRyxXQUFXLENBQUM7SUFDdkQsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUM7SUFDL0IsSUFBSSxpQkFBaUIsRUFBRTtRQUNyQixPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDcEIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUQsT0FBTyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDNUIsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ2xCO0lBRUQsT0FBTyxDQUFDLFNBQVMsQ0FDZixHQUFHLEVBQ0gsY0FBYyxDQUFDLENBQUMsRUFDaEIsY0FBYyxDQUFDLENBQUMsRUFDaEIsS0FBSyxFQUNMLE1BQU0sRUFDTixRQUFRLENBQUMsQ0FBQyxFQUNWLFFBQVEsQ0FBQyxDQUFDLEVBQ1YsS0FBSyxFQUNMLE1BQU0sQ0FDUCxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBckJXLGtCQUFVLGNBcUJyQjtBQUVXLHFCQUFhLEdBQUcsT0FBTyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDeEI5QixNQUFNLGlCQUFpQixHQUFHLENBQy9CLE9BQWdCLEVBQ2hCLE1BQWMsRUFDZCxRQUFrQixFQUNsQixFQUNFLE1BQU0sRUFDTixLQUFLLEdBQ0EsRUFDRyxFQUFFO0lBQ1osSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsR0FBRyxRQUFRLENBQUM7SUFDdEMsSUFBSSxPQUFPLEtBQUssS0FBSyxJQUFJLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ3ZDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsUUFBUSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQztLQUNsQztTQUFNLElBQUksT0FBTyxLQUFLLFFBQVEsSUFBSSxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNqRCxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNmLFFBQVEsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztLQUM1QjtTQUFNLElBQUksT0FBTyxLQUFLLE1BQU0sSUFBSSxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUMvQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNmLFFBQVEsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7S0FDbEM7U0FBTSxJQUFJLE9BQU8sS0FBSyxPQUFPLElBQUksUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDaEQsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDZixRQUFRLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7S0FDM0I7SUFDRCx1Q0FDSyxRQUFRLEtBQ1gsUUFBUTtRQUNSLFFBQVEsSUFDUjtBQUNKLENBQUMsQ0FBQztBQTVCVyx5QkFBaUIscUJBNEI1QjtBQUVLLE1BQU0sK0JBQStCLEdBQUcsQ0FDN0MsT0FBZ0IsRUFDaEIsTUFBYyxFQUNkLFFBQWtCLEVBQ2xCLEVBQUUsTUFBTSxFQUFRLEVBQ04sRUFBRTtJQUNaLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxHQUFHLFFBQVEsQ0FBQztJQUNwRCxJQUFJLE9BQU8sS0FBSyxLQUFLLElBQUksUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDdkMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDZixRQUFRLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDO0tBQ2xDO1NBQU0sSUFBSSxPQUFPLEtBQUssUUFBUSxJQUFJLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ2pELFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsUUFBUSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0tBQzVCO1NBQU0sSUFBSSxPQUFPLEtBQUssTUFBTSxJQUFJLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQy9DLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO0tBQ2xDO1NBQU0sSUFBSSxPQUFPLEtBQUssT0FBTyxJQUFJLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ2hELFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO0tBQ2xDO0lBQ0QsT0FBTztRQUNMLFlBQVk7UUFDWixRQUFRO1FBQ1IsUUFBUTtLQUNULENBQUM7QUFDSixDQUFDLENBQUM7QUF2QlcsdUNBQStCLG1DQXVCMUM7QUFFSyxNQUFNLFFBQVEsR0FBRyxDQUFDLFFBQWtCLEVBQUUsRUFBRTtJQUM3Qyx1Q0FDSyxRQUFRLEtBQ1gsUUFBUSxrQ0FDSCxRQUFRLENBQUMsUUFBUSxLQUNwQixDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BRVA7QUFDSixDQUFDLENBQUM7QUFSVyxnQkFBUSxZQVFuQjs7Ozs7Ozs7Ozs7Ozs7OztBQzNFQSxNQUFNLGVBQWUsR0FBRztJQUN0QixDQUFDLEVBQUUsR0FBRztJQUNOLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRTtDQUNYLENBQUM7QUFFRixNQUFNLGdCQUFnQixHQUFHO0lBQ3ZCLENBQUMsRUFBRSxHQUFHO0lBQ04sQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFO0NBQ1gsQ0FBQztBQUVGLE1BQU0sVUFBVSxHQUFHLEdBQUcsRUFBRTtJQUN0QixNQUFNLE1BQU0sR0FBRztRQUNiLElBQUksRUFBRSxRQUFpQjtRQUN2QixRQUFRLEVBQUUsZUFBZTtLQUMxQixDQUFDO0lBQ0YsTUFBTSxPQUFPLEdBQUc7UUFDZCxJQUFJLEVBQUUsUUFBaUI7UUFDdkIsUUFBUSxFQUFFLGdCQUFnQjtLQUMzQixDQUFDO0lBQ0YsT0FBTyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUMzQixDQUFDLENBQUM7QUFFRixNQUFNLGtCQUFrQixHQUFHLEdBQUcsRUFBRTtJQUM5QixNQUFNLEdBQUcsR0FBRztRQUNWLElBQUksRUFBRSxLQUFjO1FBQ3BCLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtLQUNoQyxDQUFDO0lBQ0YsTUFBTSxhQUFhLEdBQUc7UUFDcEIsT0FBTyxFQUFFLEdBQUc7UUFDWixRQUFRLEVBQUU7WUFDUixDQUFDLEVBQUUsQ0FBQztZQUNKLENBQUMsRUFBRSxDQUFDO1NBQ0w7S0FDRixDQUFDO0lBQ0YsTUFBTSxNQUFNLEdBQWtCO1FBQzVCLElBQUksRUFBRSxRQUFpQjtRQUN2QixNQUFNLEVBQUUsRUFBRTtLQUNYLENBQUM7SUFDRixNQUFNLGdCQUFnQixHQUFHO1FBQ3ZCLE9BQU8sRUFBRSxNQUFNO1FBQ2YsUUFBUSxFQUFFO1lBQ1IsQ0FBQyxFQUFFLENBQUM7WUFDSixDQUFDLEVBQUUsRUFBRTtTQUNOO0tBQ0YsQ0FBQztJQUNGLE1BQU0sSUFBSSxHQUFHO1FBQ1gsSUFBSSxFQUFFLE1BQWU7UUFDckIsTUFBTSxFQUFFLENBQUM7S0FDVixDQUFDO0lBQ0YsTUFBTSxxQkFBcUIsR0FBRztRQUM1QixPQUFPLEVBQUUsSUFBSTtRQUNiLFFBQVEsRUFBRTtZQUNSLENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLEVBQUU7U0FDTjtLQUNGLENBQUM7SUFDRixNQUFNLHNCQUFzQixHQUFHO1FBQzdCLE9BQU8sRUFBRSxJQUFJO1FBQ2IsUUFBUSxFQUFFO1lBQ1IsQ0FBQyxFQUFFLEVBQUU7WUFDTCxDQUFDLEVBQUUsRUFBRTtTQUNOO0tBQ0YsQ0FBQztJQUNGLE1BQU0sS0FBSyxHQUFHO1FBQ1osSUFBSSxFQUFFLE9BQWdCO0tBQ3ZCLENBQUM7SUFDRixNQUFNLFVBQVUsR0FBRztRQUNqQixPQUFPLEVBQUUsS0FBSztRQUNkLFFBQVEsRUFBRTtZQUNSLENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLENBQUM7U0FDTDtLQUNGLENBQUM7SUFDRixPQUFPO1FBQ0wsUUFBUSxFQUFFO1lBQ1IsYUFBYTtZQUNiLGdCQUFnQjtZQUNoQixxQkFBcUI7WUFDckIsc0JBQXNCO1lBQ3RCLFVBQVU7U0FDWDtLQUNGLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRixNQUFNLGdCQUFnQixHQUFHO0lBQ3ZCLENBQUMsRUFBRSxFQUFFO0lBQ0wsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztDQUNmLENBQUM7QUFFSyxNQUFNLFFBQVEsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzdCLE1BQU0sRUFBRSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDOUIsT0FBTyxFQUFFLFVBQVUsRUFBRTtJQUNyQixNQUFNLEVBQUU7UUFDTixRQUFRLEVBQUUsZ0JBQWdCO0tBQzNCO0NBQ0YsQ0FBQyxDQUFDO0FBTlUsZ0JBQVEsWUFNbEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuR0wsU0FBdUIsY0FBYzs7UUFDakMsT0FBTyxJQUFJLEVBQUU7WUFDWCxvQkFBTSxJQUFJLE9BQU8sQ0FHZCxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUNiLE1BQU0sWUFBWSxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDdkMscUJBQXFCLENBQUMsQ0FBQyxJQUFZLEVBQUUsRUFBRTtvQkFDckMsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLEdBQUcsWUFBWSxDQUFDO29CQUM5QyxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsaUJBQWlCLENBQUM7b0JBQ3JDLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO2dCQUN6QixDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxFQUFDO1NBQ0o7SUFDSCxDQUFDO0NBQUE7QUFkSCx3Q0FjRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiSCw4RUFJb0I7QUFDcEIsOEVBQTJDO0FBQzNDLHdFQUFzQztBQUN0QyxtR0FBbUU7QUFFbkUsNkZBSXlCO0FBQ3pCLHdFQUE2QztBQUM3QywwRkFBZ0Q7QUFXaEQsTUFBTSxVQUFVLEdBQUcsQ0FBQyxDQUFDO0FBRXJCLFNBQVMsY0FBYyxDQUFDLE9BQWUsRUFBRSxPQUFlO0lBQ3RELE1BQU0sa0JBQWtCLEdBQ3RCLE9BQU8sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLElBQUksR0FBRyxVQUFVO1FBQzFDLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7SUFDN0MsTUFBTSxvQkFBb0IsR0FDeEIsT0FBTyxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsR0FBRyxHQUFHLFVBQVU7UUFDMUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQztJQUM3QyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQztJQUNuRSxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLFVBQVUsQ0FBQztJQUN0RSxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLFVBQVUsQ0FBQztJQUNyRSxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBQztJQUNwRSxJQUFJLGtCQUFrQixFQUFFO1FBQ3RCLElBQUksTUFBTTtZQUFFLE9BQU8sS0FBSyxDQUFDO2FBQ3BCLElBQUksU0FBUztZQUFFLE9BQU8sUUFBUSxDQUFDO0tBQ3JDO1NBQU0sSUFBSSxvQkFBb0IsRUFBRTtRQUMvQixJQUFJLFFBQVE7WUFBRSxPQUFPLE9BQU8sQ0FBQzthQUN4QixJQUFJLE9BQU87WUFBRSxPQUFPLE1BQU0sQ0FBQztLQUNqQztBQUNILENBQUM7QUFZRCxNQUFNLFNBQVMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBWSxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBUSxFQUFVLEVBQUU7SUFDeEUsT0FBTztRQUNMLElBQUksRUFBRSxDQUFDO1FBQ1AsS0FBSyxFQUFFLENBQUMsR0FBRyxLQUFLO1FBQ2hCLEdBQUcsRUFBRSxDQUFDO1FBQ04sTUFBTSxFQUFFLENBQUMsR0FBRyxNQUFNO0tBQ25CLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRixNQUFNLGtCQUFrQixHQUFHO0lBQ3pCLE9BQU8sRUFBRSxHQUFHO0lBQ1osUUFBUSxFQUFFLENBQUM7SUFDWCxRQUFRLEVBQUUsSUFBSTtDQUNmLENBQUM7QUFFRixNQUFNLE1BQU0sR0FBRztJQUNiLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTTtJQUNqQixDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU07SUFDaEIsQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNO0NBQ2pCLENBQUM7QUFJSyxNQUFNLFFBQVEsR0FBRyxDQUFDLEtBQVksRUFBRSxFQUFFOztJQUN2Qyx1Q0FBdUM7SUFDdkMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsd0JBQWEsQ0FDbEMsa0JBQWtCLEVBQ2xCLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUNyQixDQUFDO0lBQ0YsS0FBSyxNQUFNLEtBQUssSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFO1FBQ2pDLEtBQUssQ0FBQyxRQUFRLEdBQUcsd0JBQWEsQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDcEU7SUFDRCxrQkFBa0I7SUFDbEIsTUFBTSxZQUFZLEdBQUcsU0FBUyxDQUM1QixLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQzdCLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQ3BDLENBQUM7SUFFRixLQUFLLE1BQU0sWUFBWSxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7UUFDekMsTUFBTSxhQUFhLEdBQUcsU0FBUyxDQUM3QixZQUFZLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFDOUIsOEJBQWMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQ3JDLENBQUM7UUFDRCw2Q0FBNkM7UUFDN0MsTUFBTSxjQUFjLEdBQUcsY0FBYyxDQUFDLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FBQztRQUNuRSxJQUNFLGNBQWM7WUFDZCxjQUFjLEtBQUssUUFBUTthQUMzQixrQkFBWSxDQUFDLE1BQU0sMENBQUUsUUFBUSxDQUFDLFdBQVcsQ0FBQztZQUMxQyxDQUFDLG1CQUFZLENBQUMsTUFBTSwwQ0FBRSxRQUFRLENBQUMsUUFBUSxDQUFDO1lBQ3hDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUNuQztZQUNBLGtCQUFZLENBQUMsTUFBTSwwQ0FBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDcEMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsNEJBQWlCLENBQ3RDLGNBQWMsRUFDZCxhQUFhLEVBQ2IsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQ3BCLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQ3BDLENBQUM7U0FDSDtRQUNELElBQ0UsY0FBYzthQUNkLGtCQUFZLENBQUMsTUFBTSwwQ0FBRSxRQUFRLENBQUMsT0FBTyxDQUFDO1lBQ3RDLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQ3ZDO1lBQ0EsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsNEJBQWlCLENBQ3RDLGNBQWMsRUFDZCxhQUFhLEVBQ2IsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQ3BCLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQ3BDLENBQUM7U0FDSDtRQUNGLEtBQUssSUFBSSxVQUFVLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRTtZQUNwQyxNQUFNLFdBQVcsR0FBRyxTQUFTLENBQzNCLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUM1QixVQUFVLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQ25DLENBQUM7WUFDRiw0Q0FBNEM7WUFDNUMsTUFBTSxZQUFZLEdBQUcsY0FBYyxDQUFDLFdBQVcsRUFBRSxhQUFhLENBQUMsQ0FBQztZQUNoRSxJQUFJLFlBQVksSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO2dCQUNqRSxVQUFVLENBQUMsUUFBUSxHQUFHLDBDQUErQixDQUNuRCxZQUFZLEVBQ1osYUFBYSxFQUNiLFVBQVUsQ0FBQyxRQUFRLEVBQ25CLFVBQVUsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FDbkMsQ0FBQzthQUNIO2lCQUFNLElBQUksWUFBWSxLQUFJLGtCQUFZLENBQUMsTUFBTSwwQ0FBRSxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUU7Z0JBQ2pFLFVBQVUsQ0FBQyxRQUFRLEdBQUcsNEJBQWlCLENBQ3JDLFlBQVksRUFDWixhQUFhLEVBQ2IsVUFBVSxDQUFDLFFBQVEsRUFDbkIsVUFBVSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUNuQyxDQUFDO2FBQ0g7WUFDRCwwQ0FBMEM7WUFDMUMsTUFBTSxvQkFBb0IsR0FBRyxjQUFjLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQ3ZFLElBQ0Usb0JBQW9CLEtBQUssS0FBSztnQkFDOUIsVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDO2dCQUN4QyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQ2xCO2dCQUNBLEtBQUssQ0FBQyxLQUFLLG1DQUNOLEtBQUssQ0FBQyxLQUFLLEtBQ2QsUUFBUSxFQUFFLG1CQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FDekMsQ0FBQztnQkFDRixVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzthQUMxQjtZQUNELE1BQU0sb0JBQW9CLEdBQUcsY0FBYyxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUMsQ0FBQztZQUN2RSxJQUNFLENBQUMsVUFBVSxDQUFDLE1BQU07Z0JBQ2xCLG9CQUFvQjtnQkFDcEIsb0JBQW9CLEtBQUssS0FBSyxFQUM5QjtnQkFDQSxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7YUFDM0I7U0FDRjtLQUNGO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDLENBQUM7QUEvRlcsZ0JBQVEsWUErRm5CO0FBRUssTUFBTSxRQUFRLEdBQUcsS0FBSyxFQUFFLEtBQVksRUFBRSxFQUFFO0lBQzdDLE1BQU0sWUFBWSxHQUFHLE1BQU0sMEJBQWlCLEVBQUUsQ0FBQztJQUMvQyxDQUFDLEtBQUssSUFBSSxFQUFFOztRQUNWLE9BQU8sQ0FBQyxDQUFDLE1BQU0sNkJBQWMsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFO1lBQzVDLGdCQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEIsaUNBQWlDO1lBQ2pDLHNCQUFzQjtZQUN0QixLQUFLLE1BQU0sWUFBWSxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7Z0JBQ3pDLElBQUksQ0FBQyxtQkFBWSxDQUFDLE1BQU0sMENBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFFO29CQUM1QyxNQUFNLEtBQUssR0FBRywrQkFBZSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDcEQsTUFBTSxlQUFlLEdBQUcsd0NBQXdCLENBQzlDLEtBQUssRUFDTCxZQUFZLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FDL0IsQ0FBQztvQkFDRixLQUFLLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksZUFBZSxFQUFFO3dCQUNsRCxtQkFBVSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO3FCQUMxRDtpQkFDRjthQUNGO1lBQ0QsZUFBZTtZQUNmLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7Z0JBQy9CLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFO29CQUN0QixtQkFBVSxDQUNSLFVBQVUsQ0FBQyxNQUFNLEVBQ2pCLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUM1QixZQUFZLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FDdEMsQ0FBQztpQkFDSDtZQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0gsY0FBYztZQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDdkIsbUJBQVUsQ0FDUixLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFDbEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUM3QixZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQ3ZDLENBQUM7YUFDSDtTQUNGO0lBQ0gsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNMLENBQUMsS0FBSyxJQUFJLEVBQUU7OztZQUNWLEtBQWtDLHVFQUE4QixDQUFDLE1BQU0sQ0FBQztnQkFBN0QsTUFBTSxhQUFhO2dCQUM1QixLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUM1RDs7Ozs7Ozs7O0lBQ0gsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNQLENBQUMsQ0FBQztBQTVDVyxnQkFBUSxZQTRDbkI7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvTkYsa0dBQXFEO0FBQ3JELHNJQUE4RDtBQUM5RCw2SEFBNEQ7QUFFNUQsZ0JBQWdCO0FBQ1QsTUFBTSxpQkFBaUIsR0FBRyxLQUFLLElBQUksRUFBRTtJQUN4QyxNQUFNLENBQ0osa0JBQWtCLEVBQ2xCLHFCQUFxQixFQUNyQixnQkFBZ0IsRUFDakIsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQ25CLENBQUMsdUJBQWtCLEVBQUUsbUNBQWUsRUFBRSxnQ0FBZ0IsQ0FBQyxDQUFDLEdBQUcsQ0FDekQsQ0FBQyxHQUFHLEVBQTZCLEVBQUUsQ0FDakMsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUN0QixNQUFNLEdBQUcsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2QsR0FBRyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNuRCxDQUFDLENBQUMsQ0FDTCxDQUNGLENBQUM7SUFDRixPQUFPO1FBQ0wsT0FBTyxFQUFFLGdCQUFnQjtRQUN6QixZQUFZLEVBQUUscUJBQXFCO1FBQ25DLFNBQVMsRUFBRSxrQkFBa0I7S0FDOUIsQ0FBQztBQUNKLENBQUMsQ0FBQztBQXBCUyx5QkFBaUIscUJBb0IxQjs7Ozs7Ozs7Ozs7OztBQ3pCSjtBQUFlLG9GQUF1Qix5Q0FBeUMsRTs7Ozs7Ozs7Ozs7O0FDQS9FO0FBQWUsb0ZBQXVCLHlDQUF5QyxFOzs7Ozs7Ozs7Ozs7QUNBL0U7QUFBZSxvRkFBdUIseUNBQXlDLEU7Ozs7Ozs7Ozs7Ozs7O0FDQS9FLGtFQUFrQztBQUVsQyx3RUFBb0M7QUFDcEMsMEZBQStDO0FBRS9DLCtDQUErQztBQUMvQyxJQUFJLEtBQUssR0FBRyw0QkFBYSxDQUFDLGlCQUFRLEVBQUUsQ0FBQyxDQUFDO0FBRXRDLGVBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUVoQixzREFBc0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUNhL0MsTUFBTSxhQUFhLEdBQUcsQ0FBQyxRQUFrQixFQUFFLFFBQWtCLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDeEUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUM7SUFDMUIsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUM7Q0FDM0IsQ0FBQyxDQUFDO0FBSFUscUJBQWEsaUJBR3ZCO0FBRUgsTUFBTSx3QkFBd0IsR0FBRyxDQUFDLEVBQ2hDLFFBQVEsRUFDUixRQUFRLEdBQ1csRUFBRSxFQUFFLENBQUMsQ0FBQyxZQUEwQixFQUFFLFFBQWtCLEVBQUUsRUFBRTtJQUMzRSxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25ELE1BQU0sZUFBZSxHQUFHLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVFLE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLE1BQU0sZ0JBQWdCLEdBQUcsUUFBUSxHQUFHLFdBQVcsQ0FBQztJQUNoRCxNQUFNLDZCQUE2QixHQUFHLGVBQWUsR0FBRyxnQkFBZ0IsQ0FBQztJQUN6RSxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUM1QixXQUFXLEdBQUcsNkJBQTZCLEVBQzNDLFFBQVEsQ0FDVCxDQUFDO0lBQ0YsTUFBTSx1QkFBdUIsR0FDM0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BELE9BQU87UUFDTCxDQUFDLEVBQUUsdUJBQXVCLEdBQUcsZ0JBQWdCO1FBQzdDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztLQUNkLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRixNQUFNLHdCQUF3QixHQUFHLENBQUMsRUFBRSxPQUFPLEVBQXNCLEVBQUUsRUFBRSxDQUFDLENBQ3BFLFlBQTBCLEVBQzFCLFFBQWtCLEVBQ2xCLEVBQUU7SUFDRixNQUFNLHVCQUF1QixHQUFHLFlBQVksQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDO0lBQ3pELE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxDQUFDLEdBQUcsdUJBQXVCLENBQUM7SUFDM0QsT0FBTztRQUNMLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNiLENBQUMsRUFBRSxhQUFhO0tBQ2pCLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRixNQUFNLGlCQUFpQixHQUFHLENBQUMsTUFBMEIsRUFBRSxRQUFrQixFQUFFLEVBQUU7SUFDM0UsTUFBTSxvQkFBb0IsR0FBRyx3QkFBd0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5RCxNQUFNLG9CQUFvQixHQUFHLHdCQUF3QixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlELE1BQU0sRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLEdBQUcsUUFBUSxDQUFDO0lBQzVDLE1BQU0sWUFBWSxHQUFHLG9CQUFvQixDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNsRSxNQUFNLFlBQVksR0FBRyxvQkFBb0IsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDdEUsT0FBTyxZQUFZLENBQUM7QUFDdEIsQ0FBQyxDQUFDO0FBRUssTUFBTSxhQUFhLEdBQUcsQ0FBQyxNQUEwQixFQUFFLFFBQWtCLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDaEYsWUFBWSxFQUFFLFFBQVEsQ0FBQyxZQUFZO0lBQ25DLFFBQVEsRUFBRSxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDO0lBQzdDLFFBQVEsRUFBRSxxQkFBYSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQztDQUM5RCxDQUFDLENBQUM7QUFKVSxxQkFBYSxpQkFJdkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaERILE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxJQUFZLEVBQUUsRUFBRSxDQUFDLENBQUMsUUFBa0IsRUFBRSxFQUFFLENBQUMsaUNBQzlELFFBQVEsS0FDWCxZQUFZLGtDQUNQLFFBQVEsQ0FBQyxZQUFZLEtBQ3hCLENBQUMsRUFBRSxJQUFJLE9BRVQsQ0FBQztBQUVILE1BQU0sVUFBVSxHQUFHLENBQUMsUUFBa0IsRUFBRSxFQUFFO0lBQ3hDLElBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQzlCLE9BQU8sZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO0tBQ3JDO1NBQU07UUFDTCxPQUFPLFFBQVEsQ0FBQztLQUNqQjtBQUNILENBQUM7QUFFRCxNQUFNLFNBQVMsR0FBRyxDQUFDLFFBQWtCLEVBQUUsRUFBRTtJQUN2QyxJQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUM5QixPQUFPLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztLQUNyQztTQUFNO1FBQ0wsT0FBTyxRQUFRLENBQUM7S0FDakI7QUFDSCxDQUFDO0FBQ0QsTUFBTSxZQUFZLEdBQUcsQ0FBQyxTQUFpQixFQUFFLEVBQUUsQ0FBQyxDQUFDLFFBQWtCLEVBQUUsRUFBRSxDQUFDLGlDQUMvRCxRQUFRLEtBQ1gsUUFBUSxrQ0FDSCxRQUFRLENBQUMsUUFBUSxLQUNwQixDQUFDLEVBQUUsU0FBUyxPQUVkLENBQUM7QUFFSCxNQUFNLGVBQWUsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUV6QyxNQUFNLHdCQUF3QixHQUFHLENBQUMsUUFBa0IsRUFBRSxFQUFFO0lBQ3RELElBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQzdCLE9BQU8sZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ2pDO1NBQU07UUFDTCxPQUFPLFFBQVEsQ0FBQztLQUNqQjtBQUNILENBQUM7QUFJRCxTQUFnQixjQUFjLENBQUMsTUFBYzs7UUFDM0MsT0FBTyxJQUFJLEVBQUU7WUFDWCxvQkFBTSxJQUFJLE9BQU8sQ0FBYSxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUN4QyxLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sRUFBRTtvQkFDeEIsTUFBTSxLQUFLLEdBQUcsR0FBWSxDQUFDO29CQUMzQixRQUFRLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7d0JBQzdDLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7NEJBQ2hDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQzt5QkFDckM7b0JBQ0gsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO3dCQUMzQyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFOzRCQUNoQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7eUJBQ3ZDO29CQUNILENBQUMsQ0FBQyxDQUFDO2lCQUNKO1lBQ0gsQ0FBQyxDQUFDLEVBQUM7U0FDSjtJQUNILENBQUM7Q0FBQTtBQUVELFNBQXVCLDhCQUE4QixDQUNuRCxNQUErQjs7OztZQUUvQixLQUErQixxQ0FBYyxDQUFDLE1BQU0sQ0FBQztnQkFBMUMsTUFBTSxVQUFVO2dCQUN6QixRQUFRLFVBQVUsQ0FBQyxLQUFLLEVBQUU7b0JBQ3hCLEtBQUssT0FBTzt3QkFDVixRQUFRLFVBQVUsQ0FBQyxNQUFNLEVBQUU7NEJBQ3pCLEtBQUssT0FBTztnQ0FDVixvQkFBTSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsRUFBQztnQ0FDMUIsTUFBTTs0QkFDUixLQUFLLFNBQVM7Z0NBQ1osb0JBQU0sVUFBVSxFQUFDO2dDQUNqQixNQUFNO3lCQUNUO3dCQUNELE1BQU07b0JBQ1IsS0FBSyxNQUFNO3dCQUNULFFBQVEsVUFBVSxDQUFDLE1BQU0sRUFBRTs0QkFDekIsS0FBSyxPQUFPO2dDQUNWLG9CQUFNLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUM7Z0NBQzNCLE1BQU07NEJBQ1IsS0FBSyxTQUFTO2dDQUNaLG9CQUFNLFNBQVMsRUFBQztnQ0FDaEIsTUFBTTt5QkFDVDt3QkFDRCxNQUFNO29CQUNSLEtBQUssTUFBTTt3QkFDVCxvQkFBTSx3QkFBd0IsRUFBQzt3QkFDL0IsTUFBTTtpQkFDVDthQUNGOzs7Ozs7Ozs7SUFDSCxDQUFDO0NBQUE7QUE5QkQsd0VBOEJDOzs7Ozs7Ozs7Ozs7Ozs7O0FDL0dELDZGQUE0QztBQUU1QyxNQUFNLE1BQU0sR0FBRztJQUNiLEtBQUssRUFBRTtRQUNMLEtBQUssRUFBRSxTQUFrQjtRQUN6QixXQUFXLEVBQUU7WUFDWCxRQUFRLEVBQUU7Z0JBQ1IsQ0FBQyxFQUFFLENBQUM7Z0JBQ0osQ0FBQyxFQUFFLEdBQUc7YUFDUDtZQUNELElBQUksRUFBRTtnQkFDSixNQUFNLEVBQUUsRUFBRTtnQkFDVixLQUFLLEVBQUUsRUFBRTthQUNWO1NBQ0Y7S0FDRjtDQUNGLENBQUM7QUFFSyxNQUFNLFVBQVUsR0FBRyxDQUFDLGVBQXlCLEVBQUUsRUFBRTtJQUN0RCxPQUFPO1FBQ0wsSUFBSSxFQUFFLFFBQWlCO1FBQ3ZCLE1BQU0sRUFBRSxDQUFDLGlCQUEwQixFQUFFLFlBQXFCLENBQUM7UUFDM0QsUUFBUSxFQUFFO1lBQ1IsUUFBUSxFQUFFLGVBQWU7WUFDekIsUUFBUSxFQUFFO2dCQUNSLENBQUMsRUFBRSxDQUFDO2dCQUNKLENBQUMsRUFBRSxDQUFDO2FBQ0w7WUFDRCxZQUFZLEVBQUU7Z0JBQ1osQ0FBQyxFQUFFLENBQUMsSUFBSTtnQkFDUixDQUFDLEVBQUUsQ0FBQzthQUNMO1NBQ0Y7UUFDRCxNQUFNLEVBQUUsS0FBSztRQUNiLE1BQU0sRUFBRSxNQUFNLENBQUMsS0FBSztLQUNyQixDQUFDO0FBQ0osQ0FBQztBQWxCWSxrQkFBVSxjQWtCdEI7QUFFRCxNQUFNLGdCQUFnQixHQUFHLENBQUMsV0FBd0IsRUFBWSxFQUFFO0lBQzlELFFBQVEsV0FBVyxFQUFFO1FBQ25CLEtBQUssUUFBUSxDQUFDO1FBQ2QsS0FBSyxNQUFNO1lBQ1QsT0FBTyxDQUFDLE9BQWdCLENBQUMsQ0FBQztRQUM1QixLQUFLLE9BQU87WUFDVixPQUFPLENBQUMsT0FBZ0IsRUFBRSxXQUFvQixDQUFDLENBQUM7UUFDbEQ7WUFDRSxPQUFPLEVBQUUsQ0FBQztLQUNiO0FBQ0gsQ0FBQyxDQUFDO0FBRUssTUFBTSxlQUFlLEdBQUcsQ0FBQyxFQUM5QixPQUFPLEVBQ1AsUUFBUSxHQUNVLEVBQUUsRUFBRTtJQUN0QixPQUFPO1FBQ0wsT0FBTztRQUNQLFFBQVEsRUFBRTtZQUNSLFFBQVEsRUFBRTtnQkFDUixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsR0FBRyx5QkFBUztnQkFDekIsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEdBQUcseUJBQVM7YUFDMUI7WUFDRCxRQUFRLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDeEIsWUFBWSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO1NBQzdCO1FBQ0QsTUFBTSxFQUFFLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7S0FDdkMsQ0FBQztBQUNKLENBQUMsQ0FBQztBQWhCVyx1QkFBZSxtQkFnQjFCO0FBRUYsTUFBTSxLQUFLLEdBQUc7SUFDWixPQUFPLEVBQUU7UUFDUCxLQUFLLEVBQUUsT0FBZ0I7UUFDdkIsV0FBVyxFQUFFO1lBQ1gsUUFBUSxFQUFFO2dCQUNSLENBQUMsRUFBRSxHQUFHO2dCQUNOLENBQUMsRUFBRSxFQUFFO2FBQ047WUFDRCxJQUFJLEVBQUU7Z0JBQ0osTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsS0FBSyxFQUFFLEVBQUU7YUFDVjtTQUNGO0tBQ0Y7Q0FDRixDQUFDO0FBRUYsTUFBTSxxQkFBcUIsR0FBRyxDQUM1Qix3QkFBa0MsRUFDbEMsRUFBRTtJQUNGLE9BQU87UUFDTCxRQUFRLEVBQUU7WUFDUixRQUFRLEVBQUUsd0JBQXdCO1lBQ2xDLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUN4QixZQUFZLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7U0FDN0I7UUFDRCxNQUFNLEVBQUUsS0FBSyxDQUFDLE9BQU87UUFDckIsTUFBTSxFQUFFLEtBQUs7S0FDZCxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUYsTUFBTSxhQUFhLEdBQUcsQ0FBQyxlQUFnQyxFQUFFLEVBQUU7SUFDekQsSUFBSSxlQUFlLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUNyQyxPQUFPLGtCQUFVLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQzdDO1NBQU07UUFDTCxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixlQUFlLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUNsRTtBQUNILENBQUMsQ0FBQztBQUVGLFFBQVEsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE1BQTBCO0lBQ25ELEtBQUssTUFBTSxLQUFLLElBQUksTUFBTSxFQUFFO1FBQzFCLEtBQUssTUFBTSxZQUFZLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRTtZQUN6QyxNQUFNLHVCQUFlLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDckM7S0FDRjtBQUNILENBQUM7QUFFTSxNQUFNLGFBQWEsR0FBRyxDQUFDLFdBQXdCLEVBQUUsRUFBRTtJQUN4RCxPQUFPO1FBQ0wsS0FBSyxFQUFFLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ3pELE9BQU8sRUFBRSxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUM7UUFDL0MsUUFBUSxFQUFFLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDcEQsQ0FBQztBQUNKLENBQUMsQ0FBQztBQU5XLHFCQUFhLGlCQU14Qjs7Ozs7Ozs7Ozs7Ozs7OztBQzFIVyxpQkFBUyxHQUFHLEVBQUUsQ0FBQztBQUU1QixNQUFNLFlBQVksR0FBRyxDQUFDLENBQUM7QUFDdkIsTUFBTSxnQkFBZ0IsR0FBRztJQUNyQixLQUFLLEVBQ0w7UUFDRSxDQUFDLEVBQUUsRUFBRTtRQUNMLENBQUMsRUFBRSxDQUFDO0tBQ0w7SUFDRCxpQkFBaUIsRUFDakI7UUFDRSxDQUFDLEVBQUUsRUFBRTtRQUNMLENBQUMsRUFBRSxDQUFDO0tBQ0w7SUFDRCxtQkFBbUIsRUFDbkI7UUFDRSxDQUFDLEVBQUUsRUFBRTtRQUNMLENBQUMsRUFBRSxDQUFDO0tBQ0w7SUFDRCxrQkFBa0IsRUFDbEI7UUFDRSxDQUFDLEVBQUUsRUFBRTtRQUNMLENBQUMsRUFBRSxDQUFDO0tBQ0w7SUFDRCxlQUFlLEVBQ2Y7UUFDRSxDQUFDLEVBQUUsQ0FBQztRQUNKLENBQUMsRUFBRSxDQUFDO0tBQ0w7SUFDRCxnQkFBZ0IsRUFDaEI7UUFDRSxDQUFDLEVBQUUsQ0FBQztRQUNKLENBQUMsRUFBRSxDQUFDO0tBQ0w7SUFDRCxrQkFBa0IsRUFDbEI7UUFDRSxDQUFDLEVBQUUsQ0FBQztRQUNKLENBQUMsRUFBRSxDQUFDO0tBQ0w7SUFDRCxtQkFBbUIsRUFDbkI7UUFDRSxDQUFDLEVBQUUsQ0FBQztRQUNKLENBQUMsRUFBRSxDQUFDO0tBQ0w7SUFDRCxRQUFRLEVBQ1I7UUFDRSxDQUFDLEVBQUUsRUFBRTtRQUNMLENBQUMsRUFBRSxDQUFDO0tBQ0w7Q0FDRixDQUFDO0FBSUosTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBUSxFQUFFLEVBQUU7SUFDbkQsTUFBTSxnQkFBZ0IsR0FBRyxLQUFLLENBQVUsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUNsRCxLQUFLLENBQU8sS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQWMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQ2pELENBQUMsRUFDRCxNQUFNLENBQ1AsQ0FBQztJQUNGLE9BQU8sZ0JBQWdCLENBQUM7QUFDMUIsQ0FBQyxDQUFDO0FBRUYsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLE1BQWMsRUFBRSxFQUFFO0lBQzNDLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBUyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDdEMsa0JBQTJCO1FBQzNCLG1CQUE0QjtLQUM3QixDQUFDLENBQUM7SUFDSCxPQUFPLENBQUMsQ0FBQyxlQUF3QixFQUFFLGdCQUF5QixDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUMxRSxDQUFDLENBQUM7QUFFRixNQUFNLGtCQUFrQixHQUFHLEdBQUcsRUFBRTtJQUM5QixPQUFPLENBQUMsQ0FBQyxRQUFpQixDQUFDLENBQUMsQ0FBQztBQUMvQixDQUFDLENBQUM7QUFFRixNQUFNLG1CQUFtQixHQUFHLENBQUMsTUFBYyxFQUFFLEVBQUU7SUFDN0MsTUFBTSxZQUFZLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pELE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBc0IsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUM5RCxtQkFBNEIsRUFDNUIsQ0FBQyxFQUNELFlBQVksQ0FDYixDQUFDO0lBQ0YsT0FBTyxDQUFDLENBQUMsaUJBQTBCLEVBQUUsR0FBRyxVQUFVLEVBQUUsa0JBQTJCLENBQUMsQ0FBQyxDQUFDO0FBQ3BGLENBQUMsQ0FBQztBQUVLLE1BQU0sZUFBZSxHQUFHLENBQUMsT0FBZ0IsRUFBRSxFQUFFO0lBQ2xELElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDN0IsT0FBTyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDNUM7U0FBTSxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssS0FBSyxFQUFFO1FBQ2pDLE9BQU8sZ0JBQWdCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3ZDO1NBQU0sSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtRQUNsQyxPQUFPLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUMxQztTQUFNLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7UUFDbkMsT0FBTyxrQkFBa0IsRUFBRSxDQUFDO0tBQzdCO0lBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBQzdDLENBQUMsQ0FBQztBQVhXLHVCQUFlLG1CQVcxQjtBQUdLLE1BQU0sY0FBYyxHQUFHLENBQUMsT0FBZ0IsRUFBRSxFQUFFO0lBQ2pELE1BQU0sS0FBSyxHQUFHLHVCQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkMsT0FBTztRQUNMLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxpQkFBUztRQUNwQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsaUJBQVM7S0FDbkMsQ0FBQztBQUNKLENBQUMsQ0FBQztBQU5XLHNCQUFjLGtCQU16QjtBQUVGLE1BQU0sb0JBQW9CLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQVksRUFBRSxFQUFFO0lBQ2xELE1BQU0sZUFBZSxHQUFHLGlCQUFTLEdBQUcsWUFBWSxDQUFDO0lBQ2pELE9BQU87UUFDTCxRQUFRLEVBQUU7WUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHLGVBQWUsR0FBRyxZQUFZO1lBQ3JDLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxHQUFHLFlBQVk7U0FDdEM7UUFDRCxJQUFJLEVBQUU7WUFDSixNQUFNLEVBQUUsaUJBQVM7WUFDakIsS0FBSyxFQUFFLGlCQUFTO1NBQ2pCO0tBQ0YsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLE1BQU0sYUFBYSxHQUFHLENBQUMsSUFBVSxFQUFFLEVBQUU7SUFDbkMsTUFBTSxZQUFZLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUMsSUFBSSxDQUFDLFlBQVk7UUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzlELE1BQU0sV0FBVyxHQUFHLG9CQUFvQixDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3ZELE9BQU87UUFDTCxLQUFLLEVBQUUsWUFBcUI7UUFDNUIsV0FBVztLQUNaLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRixRQUFlLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxLQUFlLEVBQUUsUUFBa0I7SUFDM0UsTUFBTSxnQkFBZ0IsR0FBRztRQUN2QixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDYixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDZCxDQUFDO0lBQ0YsS0FBSyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUNyQyxLQUFLLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3BDLE1BQU0sTUFBTSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuQyxNQUFNLE1BQU0sR0FBRztnQkFDYixDQUFDLEVBQUUsQ0FBQyxHQUFHLGlCQUFTO2dCQUNoQixDQUFDLEVBQUUsQ0FBQyxHQUFHLGlCQUFTO2FBQ2pCLENBQUM7WUFDRixNQUFNLFFBQVEsR0FBRztnQkFDZixDQUFDLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO2dCQUNoQyxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO2FBQ2pDLENBQUM7WUFDRixNQUFNO2dCQUNKLE1BQU07Z0JBQ04sUUFBUTthQUNULENBQUM7U0FDSDtLQUNGO0FBQ0gsQ0FBQztBQXRCRCw0REFzQkMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImltcG9ydCB7IFNwcml0ZSwgU3ByaXRlSW1hZ2UsIFBvc2l0aW9uIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIGZpbGUgKi9cbmNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG5cbmNhbnZhcy53aWR0aCA9IDI1NiAqIDM7XG5jYW52YXMuaGVpZ2h0ID0gMjQwICogMztcblxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjYW52YXMpO1xuXG5jb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbmlmICghY29udGV4dCkgdGhyb3cgRXJyb3IoXCJFcnJvciBnZXR0aW5nIGNhbnZhcyBjb250ZXh0XCIpO1xuXG5jb250ZXh0LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuY29udGV4dC5maWx0ZXIgPSBcIm5vbmVcIjtcbmNvbnRleHQuc2NhbGUoMywgMyk7XG5cbmV4cG9ydCBjb25zdCBkcmF3U3ByaXRlID0gKHsgY29vcmRpbmF0ZXMgfTogU3ByaXRlLCBwb3NpdGlvbjogUG9zaXRpb24sIGltZzogSFRNTEltYWdlRWxlbWVudCwgc2hvdWxkRHJhd0JvcmRlcnM6IGJvb2xlYW4gPSBmYWxzZSkgPT4ge1xuICBjb25zdCB7IHBvc2l0aW9uOiBzcHJpdGVQb3NpdGlvbiwgc2l6ZSB9ID0gY29vcmRpbmF0ZXM7XG4gIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gc2l6ZTtcbiAgaWYgKHNob3VsZERyYXdCb3JkZXJzKSB7XG4gICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICBjb250ZXh0LnJlY3QocG9zaXRpb24ueCwgcG9zaXRpb24ueSwgc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQpO1xuICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBcInJlZFwiO1xuICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gIH1cblxuICBjb250ZXh0LmRyYXdJbWFnZShcbiAgICBpbWcsXG4gICAgc3ByaXRlUG9zaXRpb24ueCxcbiAgICBzcHJpdGVQb3NpdGlvbi55LFxuICAgIHdpZHRoLFxuICAgIGhlaWdodCxcbiAgICBwb3NpdGlvbi54LFxuICAgIHBvc2l0aW9uLnksXG4gICAgd2lkdGgsXG4gICAgaGVpZ2h0XG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgY2FudmFzQ29udGV4dCA9IGNvbnRleHQ7XG4iLCJpbXBvcnQgeyBNb3ZlbWVudCB9IGZyb20gXCIuL21vdmVtZW50XCI7XG5cbnR5cGUgSGl0Qm94ID0ge1xuICBsZWZ0OiBudW1iZXI7XG4gIHJpZ2h0OiBudW1iZXI7XG4gIHRvcDogbnVtYmVyO1xuICBib3R0b206IG51bWJlcjtcbn07XG5cbnR5cGUgSGl0U2lkZSA9IFwiVE9QXCIgfCBcIkJPVFRPTVwiIHwgXCJMRUZUXCIgfCBcIlJJR0hUXCI7XG5cbnR5cGUgU2l6ZSA9IHtcbiAgaGVpZ2h0OiBudW1iZXI7XG4gIHdpZHRoOiBudW1iZXI7XG59O1xuXG5leHBvcnQgY29uc3Qgc3RvcE9uQ29saWRlU29saWQgPSAoXG4gIGhpdFNpZGU6IEhpdFNpZGUsXG4gIGhpdEJveDogSGl0Qm94LFxuICBtb3ZlbWVudDogTW92ZW1lbnQsXG4gIHtcbiAgICBoZWlnaHQsXG4gICAgd2lkdGgsXG4gIH06IFNpemVcbik6IE1vdmVtZW50ID0+IHtcbiAgbGV0IHsgdmVsb2NpdHksIHBvc2l0aW9uIH0gPSBtb3ZlbWVudDtcbiAgaWYgKGhpdFNpZGUgPT09IFwiVE9QXCIgJiYgdmVsb2NpdHkueSA+IDApIHtcbiAgICB2ZWxvY2l0eS55ID0gMDtcbiAgICBwb3NpdGlvbi55ID0gaGl0Qm94LnRvcCAtIGhlaWdodDtcbiAgfSBlbHNlIGlmIChoaXRTaWRlID09PSBcIkJPVFRPTVwiICYmIHZlbG9jaXR5LnkgPCAwKSB7XG4gICAgdmVsb2NpdHkueSA9IDA7XG4gICAgcG9zaXRpb24ueSA9IGhpdEJveC5ib3R0b207XG4gIH0gZWxzZSBpZiAoaGl0U2lkZSA9PT0gXCJMRUZUXCIgJiYgdmVsb2NpdHkueCA+IDApIHtcbiAgICB2ZWxvY2l0eS54ID0gMDtcbiAgICBwb3NpdGlvbi54ID0gaGl0Qm94LmxlZnQgLSB3aWR0aDtcbiAgfSBlbHNlIGlmIChoaXRTaWRlID09PSBcIlJJR0hUXCIgJiYgdmVsb2NpdHkueCA8IDApIHtcbiAgICB2ZWxvY2l0eS54ID0gMDtcbiAgICBwb3NpdGlvbi54ID0gaGl0Qm94LnJpZ2h0O1xuICB9XG4gIHJldHVybiB7XG4gICAgLi4ubW92ZW1lbnQsXG4gICAgdmVsb2NpdHksXG4gICAgcG9zaXRpb24sXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgdHVybkFyb3VuZE9uQ29sbGlkZUhvcml6b250YWxseSA9IChcbiAgaGl0U2lkZTogSGl0U2lkZSxcbiAgaGl0Qm94OiBIaXRCb3gsXG4gIG1vdmVtZW50OiBNb3ZlbWVudCxcbiAgeyBoZWlnaHQgfTogU2l6ZVxuKTogTW92ZW1lbnQgPT4ge1xuICBsZXQgeyB2ZWxvY2l0eSwgcG9zaXRpb24sIGFjY2VsZXJhdGlvbiB9ID0gbW92ZW1lbnQ7XG4gIGlmIChoaXRTaWRlID09PSBcIlRPUFwiICYmIHZlbG9jaXR5LnkgPiAwKSB7XG4gICAgdmVsb2NpdHkueSA9IDA7XG4gICAgcG9zaXRpb24ueSA9IGhpdEJveC50b3AgLSBoZWlnaHQ7XG4gIH0gZWxzZSBpZiAoaGl0U2lkZSA9PT0gXCJCT1RUT01cIiAmJiB2ZWxvY2l0eS55IDwgMCkge1xuICAgIHZlbG9jaXR5LnkgPSAwO1xuICAgIHBvc2l0aW9uLnkgPSBoaXRCb3guYm90dG9tO1xuICB9IGVsc2UgaWYgKGhpdFNpZGUgPT09IFwiTEVGVFwiICYmIHZlbG9jaXR5LnggPiAwKSB7XG4gICAgYWNjZWxlcmF0aW9uLnggPSAtYWNjZWxlcmF0aW9uLng7XG4gIH0gZWxzZSBpZiAoaGl0U2lkZSA9PT0gXCJSSUdIVFwiICYmIHZlbG9jaXR5LnggPCAwKSB7XG4gICAgYWNjZWxlcmF0aW9uLnggPSAtYWNjZWxlcmF0aW9uLng7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBhY2NlbGVyYXRpb24sXG4gICAgdmVsb2NpdHksXG4gICAgcG9zaXRpb24sXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgYm91bmNlVXAgPSAobW92ZW1lbnQ6IE1vdmVtZW50KSA9PiB7XG4gIHJldHVybiB7XG4gICAgLi4ubW92ZW1lbnQsXG4gICAgdmVsb2NpdHk6IHtcbiAgICAgIC4uLm1vdmVtZW50LnZlbG9jaXR5LFxuICAgICAgeTogLTQsXG4gICAgfSxcbiAgfTtcbn07XG4iLCJpbXBvcnQge1xuICAgIEdyb3VuZFBhdHRlcm4sXG4gIH0gZnJvbSBcIi4vdHlwZXNcIjtcbiAgXG4gIGNvbnN0IGluaXRpYWxQb3NpdGlvbiA9IHtcbiAgICB4OiAyMDAsXG4gICAgeTogMTIgKiAxNixcbiAgfTtcbiAgXG4gIGNvbnN0IGluaXRpYWxQb3NpdGlvbjIgPSB7XG4gICAgeDogMjMwLFxuICAgIHk6IDEyICogMTYsXG4gIH07XG4gIFxuICBjb25zdCBnZXRFbmVtaWVzID0gKCkgPT4ge1xuICAgIGNvbnN0IGdvb21iYSA9IHtcbiAgICAgIHR5cGU6IFwiR09PTUJBXCIgYXMgY29uc3QsXG4gICAgICBwb3NpdGlvbjogaW5pdGlhbFBvc2l0aW9uLFxuICAgIH07XG4gICAgY29uc3QgZ29vbWJhMiA9IHtcbiAgICAgIHR5cGU6IFwiR09PTUJBXCIgYXMgY29uc3QsXG4gICAgICBwb3NpdGlvbjogaW5pdGlhbFBvc2l0aW9uMixcbiAgICB9O1xuICAgIHJldHVybiBbZ29vbWJhLCBnb29tYmEyXTtcbiAgfTtcbiAgXG4gIGNvbnN0IGdldEJhY2tncm91bmRMYXllciA9ICgpID0+IHtcbiAgICBjb25zdCBza3kgPSB7XG4gICAgICB0eXBlOiBcIlNLWVwiIGFzIGNvbnN0LFxuICAgICAgc2l6ZTogeyB3aWR0aDogMTYsIGhlaWdodDogMTUgfSxcbiAgICB9O1xuICAgIGNvbnN0IHNreVNwYXduUG9pbnQgPSB7XG4gICAgICBwYXR0ZXJuOiBza3ksXG4gICAgICBwb3NpdGlvbjoge1xuICAgICAgICB4OiAwLFxuICAgICAgICB5OiAwLFxuICAgICAgfSxcbiAgICB9O1xuICAgIGNvbnN0IGdyb3VuZDogR3JvdW5kUGF0dGVybiA9IHtcbiAgICAgIHR5cGU6IFwiR1JPVU5EXCIgYXMgY29uc3QsXG4gICAgICBsZW5ndGg6IDE2LFxuICAgIH07XG4gICAgY29uc3QgZ3JvdW5kU3Bhd25Qb2ludCA9IHtcbiAgICAgIHBhdHRlcm46IGdyb3VuZCxcbiAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDEzLFxuICAgICAgfSxcbiAgICB9O1xuICAgIGNvbnN0IHBpcGUgPSB7XG4gICAgICB0eXBlOiBcIlBJUEVcIiBhcyBjb25zdCxcbiAgICAgIGhlaWdodDogMixcbiAgICB9O1xuICAgIGNvbnN0IHBpcGVQYXR0ZXJuU3Bhd25Qb2ludCA9IHtcbiAgICAgIHBhdHRlcm46IHBpcGUsXG4gICAgICBwb3NpdGlvbjoge1xuICAgICAgICB4OiA1LFxuICAgICAgICB5OiAxMSxcbiAgICAgIH0sXG4gICAgfTtcbiAgICBjb25zdCBwaXBlUGF0dGVyblNwYXduUG9pbnQyID0ge1xuICAgICAgcGF0dGVybjogcGlwZSxcbiAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgIHg6IDE1LFxuICAgICAgICB5OiAxMSxcbiAgICAgIH0sXG4gICAgfTtcbiAgICBjb25zdCBicmljayA9IHtcbiAgICAgIHR5cGU6IFwiQlJJQ0tcIiBhcyBjb25zdCxcbiAgICB9O1xuICAgIGNvbnN0IGJyaWNrU3Bhd24gPSB7XG4gICAgICBwYXR0ZXJuOiBicmljayxcbiAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgIHg6IDQsXG4gICAgICAgIHk6IDksXG4gICAgICB9LFxuICAgIH07XG4gICAgcmV0dXJuIHtcbiAgICAgIHBhdHRlcm5zOiBbXG4gICAgICAgIHNreVNwYXduUG9pbnQsXG4gICAgICAgIGdyb3VuZFNwYXduUG9pbnQsXG4gICAgICAgIHBpcGVQYXR0ZXJuU3Bhd25Qb2ludCxcbiAgICAgICAgcGlwZVBhdHRlcm5TcGF3blBvaW50MixcbiAgICAgICAgYnJpY2tTcGF3bixcbiAgICAgIF0sXG4gICAgfTtcbiAgfTtcbiAgXG4gIGNvbnN0IElOSVRJQUxfUE9TSVRJT04gPSB7XG4gICAgeDogMjAsXG4gICAgeTogMTIgKiAxMCArIDEsXG4gIH07XG4gIFxuICBleHBvcnQgY29uc3QgZ2V0U3RhZ2UgPSAoKSA9PiAoe1xuICAgIGxheWVyczogW2dldEJhY2tncm91bmRMYXllcigpXSxcbiAgICBlbmVtaWVzOiBnZXRFbmVtaWVzKCksXG4gICAgcGxheWVyOiB7XG4gICAgICBwb3NpdGlvbjogSU5JVElBTF9QT1NJVElPTixcbiAgICB9LFxuICB9KTtcbiAgIiwiZXhwb3J0IGFzeW5jIGZ1bmN0aW9uKiBnZXRGcmFtZVN0cmVhbSgpIHtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgeWllbGQgbmV3IFByb21pc2U8e1xuICAgICAgICB0aW1lOiBudW1iZXI7XG4gICAgICAgIGZwcz86IG51bWJlcjtcbiAgICAgIH0+KChyZXNvbHZlKSA9PiB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzVGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKHRpbWU6IG51bWJlcikgPT4ge1xuICAgICAgICAgIGNvbnN0IHRpbWVCZXR3ZWVuRnJhbWVzID0gdGltZSAtIHByZXZpb3VzVGltZTtcbiAgICAgICAgICBjb25zdCBmcHMgPSAxMDAwIC8gdGltZUJldHdlZW5GcmFtZXM7XG4gICAgICAgICAgcmVzb2x2ZSh7IHRpbWUsIGZwcyB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0iLCJpbXBvcnQgeyBTcHJpdGVJbWFnZSwgU3RhZ2VEZXNpZ24sIFN0YWdlU3RhdGUgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHtcbiAgYm91bmNlVXAsXG4gIHN0b3BPbkNvbGlkZVNvbGlkLFxuICB0dXJuQXJvdW5kT25Db2xsaWRlSG9yaXpvbnRhbGx5LFxufSBmcm9tIFwiLi9jb2xpc2lvblwiO1xuaW1wb3J0IHsgYXBwbHlNb3ZlbWVudCB9IGZyb20gXCIuL21vdmVtZW50XCI7XG5pbXBvcnQgeyBkcmF3U3ByaXRlIH0gZnJvbSBcIi4vY2FudmFzXCI7XG5pbXBvcnQgeyBnZXRQbGF5ZXJNb3ZlbWVudFN0cmVhbUJ5SW5wdXQgfSBmcm9tIFwiLi9wbGF5ZXItbW92ZW1lbnRcIjtcbmltcG9ydCB7IGdldFN0YWdlU3RhdGUgfSBmcm9tIFwiLi9zdGFnZS1sb2FkZXJcIjtcbmltcG9ydCB7XG4gIGdldFBhdHRlcm5TaXplLFxuICBnZXRQYXR0ZXJuVGlsZXMsXG4gIGdldFRpbGVzU3ByaWNlUGxhY2VtZW50cyBhcyBnZXRUaWxlc1Nwcml0ZVBsYWNlbWVudHMsXG59IGZyb20gXCIuL3RpbGVkLXNwcml0ZXNcIjtcbmltcG9ydCB7IGxvYWRTcHJpdGVzSW1hZ2VzIH0gZnJvbSBcIi4vaW1hZ2VzXCI7XG5pbXBvcnQgeyBnZXRGcmFtZVN0cmVhbSB9IGZyb20gXCIuL2ZyYW1lLXN0cmVhbVwiO1xuaW1wb3J0IHsgZ29vbWJhS2lsbHNNYXJpbywgbWFyaW9LaWxsc0dvb21iYSB9IGZyb20gXCIuL19fdGVzdHNfXy90ZXN0LXN0YWdlXCI7XG5cbi8vIENvbGxpc2lvbmRcbnR5cGUgSGl0Qm94ID0ge1xuICBsZWZ0OiBudW1iZXI7XG4gIHJpZ2h0OiBudW1iZXI7XG4gIHRvcDogbnVtYmVyO1xuICBib3R0b206IG51bWJlcjtcbn07XG5cbmNvbnN0IEhJVF9NQVJHSU4gPSA1O1xuXG5mdW5jdGlvbiBnZXRDb2xpdGlvbkhpdChoaXRCb3gxOiBIaXRCb3gsIGhpdEJveDI6IEhpdEJveCkge1xuICBjb25zdCBhcmVWZXJ0aWNhbEFsaWduZWQgPVxuICAgIGhpdEJveDEucmlnaHQgPj0gaGl0Qm94Mi5sZWZ0ICsgSElUX01BUkdJTiAmJlxuICAgIGhpdEJveDEubGVmdCA8PSBoaXRCb3gyLnJpZ2h0IC0gSElUX01BUkdJTjtcbiAgY29uc3QgYXJlSG9yaXpvbnRhbEFsaWduZWQgPVxuICAgIGhpdEJveDEuYm90dG9tID49IGhpdEJveDIudG9wICsgSElUX01BUkdJTiAmJlxuICAgIGhpdEJveDEudG9wIDw9IGhpdEJveDIuYm90dG9tIC0gSElUX01BUkdJTjtcbiAgY29uc3QgaGl0VG9wID0gTWF0aC5hYnMoaGl0Qm94MS5ib3R0b20gLSBoaXRCb3gyLnRvcCkgPCBISVRfTUFSR0lOO1xuICBjb25zdCBoaXRCb3R0b20gPSBNYXRoLmFicyhoaXRCb3gxLnRvcCAtIGhpdEJveDIuYm90dG9tKSA8IEhJVF9NQVJHSU47XG4gIGNvbnN0IGhpdFJpZ2h0ID0gTWF0aC5hYnMoaGl0Qm94MS5sZWZ0IC0gaGl0Qm94Mi5yaWdodCkgPCBISVRfTUFSR0lOO1xuICBjb25zdCBoaXRMZWZ0ID0gTWF0aC5hYnMoaGl0Qm94MS5yaWdodCAtIGhpdEJveDIubGVmdCkgPCBISVRfTUFSR0lOO1xuICBpZiAoYXJlVmVydGljYWxBbGlnbmVkKSB7XG4gICAgaWYgKGhpdFRvcCkgcmV0dXJuIFwiVE9QXCI7XG4gICAgZWxzZSBpZiAoaGl0Qm90dG9tKSByZXR1cm4gXCJCT1RUT01cIjtcbiAgfSBlbHNlIGlmIChhcmVIb3Jpem9udGFsQWxpZ25lZCkge1xuICAgIGlmIChoaXRSaWdodCkgcmV0dXJuIFwiUklHSFRcIjtcbiAgICBlbHNlIGlmIChoaXRMZWZ0KSByZXR1cm4gXCJMRUZUXCI7XG4gIH1cbn1cblxudHlwZSBQb3NpdGlvbiA9IHtcbiAgeDogbnVtYmVyO1xuICB5OiBudW1iZXI7XG59O1xuXG50eXBlIFNpemUgPSB7XG4gIGhlaWdodDogbnVtYmVyO1xuICB3aWR0aDogbnVtYmVyO1xufTtcblxuY29uc3QgZ2V0SGl0Qm94ID0gKHsgeCwgeSB9OiBQb3NpdGlvbiwgeyB3aWR0aCwgaGVpZ2h0IH06IFNpemUpOiBIaXRCb3ggPT4ge1xuICByZXR1cm4ge1xuICAgIGxlZnQ6IHgsXG4gICAgcmlnaHQ6IHggKyB3aWR0aCxcbiAgICB0b3A6IHksXG4gICAgYm90dG9tOiB5ICsgaGVpZ2h0LFxuICB9O1xufTtcblxuY29uc3QgYWNjZWxlcmF0aW9uQ29uZmlnID0ge1xuICBncmF2aXR5OiAwLjEsXG4gIG1heFNwZWVkOiAyLFxuICBmcmljdGlvbjogMC4xNSxcbn07XG5cbmNvbnN0IGtleU1hcCA9IHtcbiAgW1wiUklHSFRcIl06IFwiS2V5RFwiLFxuICBbXCJMRUZUXCJdOiBcIktleUFcIixcbiAgW1wiSlVNUFwiXTogXCJLZXlKXCIsXG59O1xuXG50eXBlIFN0YWdlID0gUmV0dXJuVHlwZTx0eXBlb2YgZ2V0U3RhZ2VTdGF0ZT47XG5cbmV4cG9ydCBjb25zdCBydW5GcmFtZSA9IChzdGFnZTogU3RhZ2UpID0+IHtcbiAgLy8gQXBwbHkgbW92ZW1lbnQgdG8gcGxheWVyIGFuZCBlbmVtaWVzXG4gIHN0YWdlLm1hcmlvLm1vdmVtZW50ID0gYXBwbHlNb3ZlbWVudChcbiAgICBhY2NlbGVyYXRpb25Db25maWcsXG4gICAgc3RhZ2UubWFyaW8ubW92ZW1lbnRcbiAgKTtcbiAgZm9yIChjb25zdCBlbmVteSBvZiBzdGFnZS5lbmVtaWVzKSB7XG4gICAgZW5lbXkubW92ZW1lbnQgPSBhcHBseU1vdmVtZW50KGFjY2VsZXJhdGlvbkNvbmZpZywgZW5lbXkubW92ZW1lbnQpO1xuICB9XG4gIC8vQXBwbHkgY29sbGl0aW9uc1xuICBjb25zdCBwbGF5ZXJIaXRCb3ggPSBnZXRIaXRCb3goXG4gICAgc3RhZ2UubWFyaW8ubW92ZW1lbnQucG9zaXRpb24sXG4gICAgc3RhZ2UubWFyaW8uc3ByaXRlLmNvb3JkaW5hdGVzLnNpemVcbiAgKTtcblxuICBmb3IgKGNvbnN0IHBhdHRlcm5TdGF0ZSBvZiBzdGFnZS5wYXR0ZXJucykge1xuICAgIGNvbnN0IHBhdHRlcm5IaXRCb3ggPSBnZXRIaXRCb3goXG4gICAgICBwYXR0ZXJuU3RhdGUubW92ZW1lbnQucG9zaXRpb24sXG4gICAgICBnZXRQYXR0ZXJuU2l6ZShwYXR0ZXJuU3RhdGUucGF0dGVybilcbiAgICApO1xuICAgICAvLyBBcHBseSBjb2xpdGlvbiBiZXR3ZWVuIHBsYXllciBhbmQgcGF0dGVybnNcbiAgICAgY29uc3QgcGF0dGVybkhpdFNpZGUgPSBnZXRDb2xpdGlvbkhpdChwbGF5ZXJIaXRCb3gsIHBhdHRlcm5IaXRCb3gpO1xuICAgICBpZiAoXG4gICAgICAgcGF0dGVybkhpdFNpZGUgJiZcbiAgICAgICBwYXR0ZXJuSGl0U2lkZSA9PT0gXCJCT1RUT01cIiAmJlxuICAgICAgIHBhdHRlcm5TdGF0ZS50cmFpdHM/LmluY2x1ZGVzKFwiQlJFQUtBQkxFXCIpICYmXG4gICAgICAgIXBhdHRlcm5TdGF0ZS50cmFpdHM/LmluY2x1ZGVzKFwiQlJPS0VOXCIpICYmXG4gICAgICAgc3RhZ2UubWFyaW8ubW92ZW1lbnQudmVsb2NpdHkueSA8IDBcbiAgICAgKSB7XG4gICAgICAgcGF0dGVyblN0YXRlLnRyYWl0cz8ucHVzaChcIkJST0tFTlwiKTtcbiAgICAgICBzdGFnZS5tYXJpby5tb3ZlbWVudCA9IHN0b3BPbkNvbGlkZVNvbGlkKFxuICAgICAgICAgcGF0dGVybkhpdFNpZGUsXG4gICAgICAgICBwYXR0ZXJuSGl0Qm94LFxuICAgICAgICAgc3RhZ2UubWFyaW8ubW92ZW1lbnQsXG4gICAgICAgICBzdGFnZS5tYXJpby5zcHJpdGUuY29vcmRpbmF0ZXMuc2l6ZVxuICAgICAgICk7XG4gICAgIH1cbiAgICAgaWYgKFxuICAgICAgIHBhdHRlcm5IaXRTaWRlICYmXG4gICAgICAgcGF0dGVyblN0YXRlLnRyYWl0cz8uaW5jbHVkZXMoXCJTT0xJRFwiKSAmJlxuICAgICAgICFwYXR0ZXJuU3RhdGUudHJhaXRzLmluY2x1ZGVzKFwiQlJPS0VOXCIpXG4gICAgICkge1xuICAgICAgIHN0YWdlLm1hcmlvLm1vdmVtZW50ID0gc3RvcE9uQ29saWRlU29saWQoXG4gICAgICAgICBwYXR0ZXJuSGl0U2lkZSxcbiAgICAgICAgIHBhdHRlcm5IaXRCb3gsXG4gICAgICAgICBzdGFnZS5tYXJpby5tb3ZlbWVudCxcbiAgICAgICAgIHN0YWdlLm1hcmlvLnNwcml0ZS5jb29yZGluYXRlcy5zaXplXG4gICAgICAgKTtcbiAgICAgfVxuICAgIGZvciAobGV0IGVuZW15U3RhdGUgb2Ygc3RhZ2UuZW5lbWllcykge1xuICAgICAgY29uc3QgZW5lbXlIaXRib3ggPSBnZXRIaXRCb3goXG4gICAgICAgIGVuZW15U3RhdGUubW92ZW1lbnQucG9zaXRpb24sXG4gICAgICAgIGVuZW15U3RhdGUuc3ByaXRlLmNvb3JkaW5hdGVzLnNpemVcbiAgICAgICk7ICAgICBcbiAgICAgIC8vIEFwcGx5IGNvbGl0aW9uIGJldHdlZW4gZW5lbXkgYW5kIHBhdHRlcm5zXG4gICAgICBjb25zdCBlbmVteUhpdFNpZGUgPSBnZXRDb2xpdGlvbkhpdChlbmVteUhpdGJveCwgcGF0dGVybkhpdEJveCk7XG4gICAgICBpZiAoZW5lbXlIaXRTaWRlICYmIGVuZW15U3RhdGUudHJhaXRzLmluY2x1ZGVzKFwiU0lERVdBWVNfV0FMS0VSXCIpKSB7XG4gICAgICAgIGVuZW15U3RhdGUubW92ZW1lbnQgPSB0dXJuQXJvdW5kT25Db2xsaWRlSG9yaXpvbnRhbGx5KFxuICAgICAgICAgIGVuZW15SGl0U2lkZSxcbiAgICAgICAgICBwYXR0ZXJuSGl0Qm94LFxuICAgICAgICAgIGVuZW15U3RhdGUubW92ZW1lbnQsXG4gICAgICAgICAgZW5lbXlTdGF0ZS5zcHJpdGUuY29vcmRpbmF0ZXMuc2l6ZVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChlbmVteUhpdFNpZGUgJiYgcGF0dGVyblN0YXRlLnRyYWl0cz8uaW5jbHVkZXMoXCJTT0xJRFwiKSkge1xuICAgICAgICBlbmVteVN0YXRlLm1vdmVtZW50ID0gc3RvcE9uQ29saWRlU29saWQoXG4gICAgICAgICAgZW5lbXlIaXRTaWRlLFxuICAgICAgICAgIHBhdHRlcm5IaXRCb3gsXG4gICAgICAgICAgZW5lbXlTdGF0ZS5tb3ZlbWVudCxcbiAgICAgICAgICBlbmVteVN0YXRlLnNwcml0ZS5jb29yZGluYXRlcy5zaXplXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICAvLyBBcHBseSBjb2xpc2lvbiBiZXR3ZWVuIHBsYXllciBhbmQgZW5lbXlcbiAgICAgIGNvbnN0IHBsYXllck9uRW5lbXlIaXRTaWRlID0gZ2V0Q29saXRpb25IaXQocGxheWVySGl0Qm94LCBlbmVteUhpdGJveCk7XG4gICAgICBpZiAoXG4gICAgICAgIHBsYXllck9uRW5lbXlIaXRTaWRlID09PSBcIlRPUFwiICYmXG4gICAgICAgIGVuZW15U3RhdGUudHJhaXRzLmluY2x1ZGVzKFwiQk9VTkNFQUJMRVwiKSAmJlxuICAgICAgICAhZW5lbXlTdGF0ZS5pc0RlYWRcbiAgICAgICkge1xuICAgICAgICBzdGFnZS5tYXJpbyA9IHtcbiAgICAgICAgICAuLi5zdGFnZS5tYXJpbyxcbiAgICAgICAgICBtb3ZlbWVudDogYm91bmNlVXAoc3RhZ2UubWFyaW8ubW92ZW1lbnQpLFxuICAgICAgICB9O1xuICAgICAgICBlbmVteVN0YXRlLmlzRGVhZCA9IHRydWU7XG4gICAgICB9XG4gICAgICBjb25zdCBlbmVteU9uUGxheWVySGl0U2lkZSA9IGdldENvbGl0aW9uSGl0KHBsYXllckhpdEJveCwgZW5lbXlIaXRib3gpO1xuICAgICAgaWYgKFxuICAgICAgICAhZW5lbXlTdGF0ZS5pc0RlYWQgJiZcbiAgICAgICAgZW5lbXlPblBsYXllckhpdFNpZGUgJiZcbiAgICAgICAgZW5lbXlPblBsYXllckhpdFNpZGUgIT09IFwiVE9QXCJcbiAgICAgICkge1xuICAgICAgICBzdGFnZS5tYXJpby5pc0RlYWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gc3RhZ2U7XG59O1xuXG5leHBvcnQgY29uc3QgbG9hZEdhbWUgPSBhc3luYyAoc3RhZ2U6IFN0YWdlKSA9PiB7ICBcbiAgY29uc3Qgc3ByaXRlSW1hZ2VzID0gYXdhaXQgbG9hZFNwcml0ZXNJbWFnZXMoKTtcbiAgKGFzeW5jICgpID0+IHtcbiAgICB3aGlsZSAoIShhd2FpdCBnZXRGcmFtZVN0cmVhbSgpLm5leHQoKSkuZG9uZSkgeyAgICAgIFxuICAgICAgcnVuRnJhbWUoc3RhZ2UpO1xuICAgICAgLy8gRHJhdyBzdGF0ZSwgZW5lbWllcyBhbmQgcGxheWVyXG4gICAgICAvLyBEcmF3IHN0YXRlIHBhdHRlcm5zXG4gICAgICBmb3IgKGNvbnN0IHBhdHRlcm5TdGF0ZSBvZiBzdGFnZS5wYXR0ZXJucykge1xuICAgICAgICBpZiAoIXBhdHRlcm5TdGF0ZS50cmFpdHM/LmluY2x1ZGVzKFwiQlJPS0VOXCIpKSB7XG4gICAgICAgICAgY29uc3QgdGlsZXMgPSBnZXRQYXR0ZXJuVGlsZXMocGF0dGVyblN0YXRlLnBhdHRlcm4pO1xuICAgICAgICAgIGNvbnN0IHRpbGVzUGxhY2VtZW50cyA9IGdldFRpbGVzU3ByaXRlUGxhY2VtZW50cyhcbiAgICAgICAgICAgIHRpbGVzLFxuICAgICAgICAgICAgcGF0dGVyblN0YXRlLm1vdmVtZW50LnBvc2l0aW9uXG4gICAgICAgICAgKTtcbiAgICAgICAgICBmb3IgKGNvbnN0IHsgc3ByaXRlLCBwb3NpdGlvbiB9IG9mIHRpbGVzUGxhY2VtZW50cykge1xuICAgICAgICAgICAgZHJhd1Nwcml0ZShzcHJpdGUsIHBvc2l0aW9uLCBzcHJpdGVJbWFnZXNbc3ByaXRlLmltYWdlXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBEcmF3IGVuZW1pZXNcbiAgICAgIHN0YWdlLmVuZW1pZXMubWFwKChlbmVteVN0YXRlKSA9PiB7XG4gICAgICAgIGlmICghZW5lbXlTdGF0ZS5pc0RlYWQpIHtcbiAgICAgICAgICBkcmF3U3ByaXRlKFxuICAgICAgICAgICAgZW5lbXlTdGF0ZS5zcHJpdGUsXG4gICAgICAgICAgICBlbmVteVN0YXRlLm1vdmVtZW50LnBvc2l0aW9uLFxuICAgICAgICAgICAgc3ByaXRlSW1hZ2VzW2VuZW15U3RhdGUuc3ByaXRlLmltYWdlXVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgLy8gRHJhdyBwbGF5ZXJcbiAgICAgIGlmICghc3RhZ2UubWFyaW8uaXNEZWFkKSB7XG4gICAgICAgIGRyYXdTcHJpdGUoXG4gICAgICAgICAgc3RhZ2UubWFyaW8uc3ByaXRlLFxuICAgICAgICAgIHN0YWdlLm1hcmlvLm1vdmVtZW50LnBvc2l0aW9uLFxuICAgICAgICAgIHNwcml0ZUltYWdlc1tzdGFnZS5tYXJpby5zcHJpdGUuaW1hZ2VdXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9KSgpO1xuICAoYXN5bmMgKCkgPT4ge1xuICAgIGZvciBhd2FpdCAoY29uc3QgYXBwbHlNb3ZlbWVudCBvZiBnZXRQbGF5ZXJNb3ZlbWVudFN0cmVhbUJ5SW5wdXQoa2V5TWFwKSkge1xuICAgICAgc3RhZ2UubWFyaW8ubW92ZW1lbnQgPSBhcHBseU1vdmVtZW50KHN0YWdlLm1hcmlvLm1vdmVtZW50KTtcbiAgICB9XG4gIH0pKCk7XG59O1xuIiwiaW1wb3J0IEVuZW1pZXNTcHJpdGVTaGVldCBmcm9tIFwiLi9pbWcvZW5lbWllcy0yLnBuZ1wiO1xuaW1wb3J0IEJhY2tncm91bmRJbWFnZSBmcm9tIFwiLi9pbWcvc21iM19iYWNrZ3JvdW5kX3RpbGVzLnBuZ1wiO1xuaW1wb3J0IE1hcmlvU3ByaXRlU2hlZXQgZnJvbSBcIi4vaW1nL3NtYjNfbWFyaW9fc3ByaXRlcy5wbmdcIjtcblxuLy8gSW1hZ2UgbG9hZGluZ1xuZXhwb3J0IGNvbnN0IGxvYWRTcHJpdGVzSW1hZ2VzID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IFtcbiAgICAgIGVuZW1pZXNTcHJpdGVTaGVldCxcbiAgICAgIGJhY2tncm91bmRTcHJpdGVTaGVldCxcbiAgICAgIG1hcmlvU3ByaXRlU2hlZXQsXG4gICAgXSA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgW0VuZW1pZXNTcHJpdGVTaGVldCwgQmFja2dyb3VuZEltYWdlLCBNYXJpb1Nwcml0ZVNoZWV0XS5tYXAoXG4gICAgICAgICh1cmwpOiBQcm9taXNlPEhUTUxJbWFnZUVsZW1lbnQ+ID0+XG4gICAgICAgICAgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgaW1nLnNyYyA9IHVybDtcbiAgICAgICAgICAgIGltZy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiByZXNvbHZlKGltZykpO1xuICAgICAgICAgIH0pXG4gICAgICApXG4gICAgKTtcbiAgICByZXR1cm4ge1xuICAgICAgXCJNQVJJT1wiOiBtYXJpb1Nwcml0ZVNoZWV0LFxuICAgICAgXCJCQUNLR1JPVU5EXCI6IGJhY2tncm91bmRTcHJpdGVTaGVldCxcbiAgICAgIFwiRU5FTUlFU1wiOiBlbmVtaWVzU3ByaXRlU2hlZXRcbiAgICB9O1xuICB9OyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmZDFkMTA2YWViZmI1MGNmOWQ2YjhhZTA1MTk5MjQ1OS5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiOWVhMzg3NDVmYjYzYmNjYTMyYWY4N2ZhZmVmMmY4MmEucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImUzYmMzZTM4OWMzOWM0NDZmYzJkZDY5N2MzZWQ5ZDJmLnBuZ1wiOyIsImltcG9ydCB7IGxvYWRHYW1lIH0gZnJvbSBcIi4vZ2FtZVwiO1xuaW1wb3J0IHsgZ29vbWJhS2lsbHNNYXJpbywgbWFyaW9CcmVha3NCbG9jaywgbWFyaW9LaWxsc0dvb21iYSB9IGZyb20gXCIuL19fdGVzdHNfXy90ZXN0LXN0YWdlXCI7XG5pbXBvcnQgeyBnZXRTdGFnZSB9IGZyb20gXCIuL2Rlc2lnblwiO1xuaW1wb3J0IHsgZ2V0U3RhZ2VTdGF0ZSB9IGZyb20gXCIuL3N0YWdlLWxvYWRlclwiO1xuXG4vLyBsZXQgc3RhZ2UgPSBnZXRTdGFnZVN0YXRlKG1hcmlvQnJlYWtzQmxvY2spO1xubGV0IHN0YWdlID0gZ2V0U3RhZ2VTdGF0ZShnZXRTdGFnZSgpKTtcblxubG9hZEdhbWUoc3RhZ2UpO1xuXG4vLyBzZXRUaW1lb3V0KCgpID0+IGxvYWRHYW1lKGdvb21iYUtpbGxzTWFyaW8pLCAxMDAwKTtcbiIsInR5cGUgQWNjZWxlcmF0aW9uQ29uZmlnID0ge1xuICBtYXhTcGVlZDogbnVtYmVyO1xuICBncmF2aXR5OiBudW1iZXI7XG4gIGZyaWN0aW9uOiBudW1iZXI7XG59O1xuXG50eXBlIENvb3JkaW5hdGVzID0ge1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcbn07XG5cbmV4cG9ydCB0eXBlIFBvc2l0aW9uID0gQ29vcmRpbmF0ZXM7XG5cbnR5cGUgVmVsb2NpdHkgPSBDb29yZGluYXRlcztcblxudHlwZSBBY2NlbGVyYXRpb24gPSBDb29yZGluYXRlcztcblxuZXhwb3J0IHR5cGUgTW92ZW1lbnQgPSB7XG4gIHZlbG9jaXR5OiBWZWxvY2l0eTtcbiAgYWNjZWxlcmF0aW9uOiBBY2NlbGVyYXRpb247XG4gIHBvc2l0aW9uOiBQb3NpdGlvbjtcbn07XG5cbmV4cG9ydCBjb25zdCBhcHBseVZlbG9jaXR5ID0gKHBvc2l0aW9uOiBQb3NpdGlvbiwgdmVsb2NpdHk6IFZlbG9jaXR5KSA9PiAoe1xuICB5OiBwb3NpdGlvbi55ICsgdmVsb2NpdHkueSxcbiAgeDogcG9zaXRpb24ueCArIHZlbG9jaXR5LngsXG59KTtcblxuY29uc3QgbWFrZUFwcGx5QWNjZWxhcmF0aW9uT25YID0gKHtcbiAgbWF4U3BlZWQsXG4gIGZyaWN0aW9uLFxufTogQWNjZWxlcmF0aW9uQ29uZmlnKSA9PiAoYWNjZWxlcmF0aW9uOiBBY2NlbGVyYXRpb24sIHZlbG9jaXR5OiBWZWxvY2l0eSkgPT4ge1xuICBjb25zdCBhY2NlbGVyYXRpb25TaWduID0gTWF0aC5zaWduKGFjY2VsZXJhdGlvbi54KTtcbiAgY29uc3QgYWJzQWNjZWxlcmF0aW9uID0gYWNjZWxlcmF0aW9uLnggIT09IDAgPyBNYXRoLmFicyhhY2NlbGVyYXRpb24ueCkgOiAwO1xuICBjb25zdCBhYnNWZWxvY2l0eSA9IHZlbG9jaXR5LnggIT09IDAgPyBNYXRoLmFicyh2ZWxvY2l0eS54KSA6IDA7XG4gIGNvbnN0IGFic29sdXRlRnJpY3Rpb24gPSBmcmljdGlvbiAqIGFic1ZlbG9jaXR5O1xuICBjb25zdCBhYnNvbHV0ZUZpY3Rpb25lZEFjY2VsZXJhdGlvbiA9IGFic0FjY2VsZXJhdGlvbiAtIGFic29sdXRlRnJpY3Rpb247XG4gIGNvbnN0IHZlbG9jaXR5RGVsdGEgPSBNYXRoLm1pbihcbiAgICBhYnNWZWxvY2l0eSArIGFic29sdXRlRmljdGlvbmVkQWNjZWxlcmF0aW9uLFxuICAgIG1heFNwZWVkXG4gICk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRWZWxvY2l0eURlbHRhID1cbiAgICBNYXRoLmFicyh2ZWxvY2l0eURlbHRhKSA+IDAuMSA/IHZlbG9jaXR5RGVsdGEgOiAwO1xuICByZXR1cm4ge1xuICAgIHg6IG5vcm1hbGl6ZWRWZWxvY2l0eURlbHRhICogYWNjZWxlcmF0aW9uU2lnbixcbiAgICB5OiB2ZWxvY2l0eS55LFxuICB9O1xufTtcblxuY29uc3QgbWFrZUFwcGx5QWNjZWxhcmF0aW9uT25ZID0gKHsgZ3Jhdml0eSB9OiBBY2NlbGVyYXRpb25Db25maWcpID0+IChcbiAgYWNjZWxlcmF0aW9uOiBBY2NlbGVyYXRpb24sXG4gIHZlbG9jaXR5OiBWZWxvY2l0eVxuKSA9PiB7XG4gIGNvbnN0IGFjY2VsZXJhdGlvbldpdGhHcmF2aXR5ID0gYWNjZWxlcmF0aW9uLnkgKyBncmF2aXR5O1xuICBjb25zdCB2ZWxvY2l0eURlbHRhID0gdmVsb2NpdHkueSArIGFjY2VsZXJhdGlvbldpdGhHcmF2aXR5O1xuICByZXR1cm4ge1xuICAgIHg6IHZlbG9jaXR5LngsXG4gICAgeTogdmVsb2NpdHlEZWx0YSxcbiAgfTtcbn07XG5cbmNvbnN0IGFwcGx5QWNjZWxlcmF0aW9uID0gKGNvbmZpZzogQWNjZWxlcmF0aW9uQ29uZmlnLCBtb3ZlbWVudDogTW92ZW1lbnQpID0+IHtcbiAgY29uc3QgYXBwbHlBY2NlbGVyYXRpb25PblggPSBtYWtlQXBwbHlBY2NlbGFyYXRpb25PblgoY29uZmlnKTtcbiAgY29uc3QgYXBwbHlBY2NlbGVyYXRpb25PblkgPSBtYWtlQXBwbHlBY2NlbGFyYXRpb25PblkoY29uZmlnKTtcbiAgY29uc3QgeyB2ZWxvY2l0eSwgYWNjZWxlcmF0aW9uIH0gPSBtb3ZlbWVudDtcbiAgY29uc3QgbmV3VmVsb2NpdHlYID0gYXBwbHlBY2NlbGVyYXRpb25PblgoYWNjZWxlcmF0aW9uLCB2ZWxvY2l0eSk7XG4gIGNvbnN0IG5ld1ZlbG9jaXR5WSA9IGFwcGx5QWNjZWxlcmF0aW9uT25ZKGFjY2VsZXJhdGlvbiwgbmV3VmVsb2NpdHlYKTtcbiAgcmV0dXJuIG5ld1ZlbG9jaXR5WTtcbn07XG5cbmV4cG9ydCBjb25zdCBhcHBseU1vdmVtZW50ID0gKGNvbmZpZzogQWNjZWxlcmF0aW9uQ29uZmlnLCBtb3ZlbWVudDogTW92ZW1lbnQpID0+ICh7XG4gIGFjY2VsZXJhdGlvbjogbW92ZW1lbnQuYWNjZWxlcmF0aW9uLFxuICB2ZWxvY2l0eTogYXBwbHlBY2NlbGVyYXRpb24oY29uZmlnLCBtb3ZlbWVudCksXG4gIHBvc2l0aW9uOiBhcHBseVZlbG9jaXR5KG1vdmVtZW50LnBvc2l0aW9uLCBtb3ZlbWVudC52ZWxvY2l0eSksXG59KTtcbiIsImltcG9ydCB7IE1vdmVtZW50IH0gZnJvbSBcIi4vbW92ZW1lbnRcIjtcblxuZXhwb3J0IHR5cGUgSW5wdXQgPSBcIlJJR0hUXCIgfCBcIkxFRlRcIiB8IFwiSlVNUFwiO1xuXG5leHBvcnQgdHlwZSBBY3Rpb24gPSBcIlBSRVNTXCIgfCBcIlJFTEVBU0VcIjtcblxuZXhwb3J0IHR5cGUgSW5wdXRFdmVudCA9IHtcbiAgaW5wdXQ6IElucHV0O1xuICBhY3Rpb246IEFjdGlvbjtcbn07XG5cbmV4cG9ydCB0eXBlIEtleXNNYXAgPSB7XG4gIGxlZnQ6IHN0cmluZztcbiAgcmlnaHQ6IHN0cmluZztcbiAganVtcDogc3RyaW5nO1xufTtcblxudHlwZSBLZXlDb2RlID0gc3RyaW5nO1xuXG5leHBvcnQgdHlwZSBLZXlNYXAgPSB7XG4gIFtrZXkgaW4gSW5wdXRdOiBLZXlDb2RlO1xufTsgXG5cbmV4cG9ydCB0eXBlIElucHV0RXZlbnRTdHJlYW0gPSBBc3luY0dlbmVyYXRvcjxJbnB1dEV2ZW50PjtcblxuXG5jb25zdCBzZXRBY2NlbGVyYXRpb25YID0gKGFjY1g6IG51bWJlcikgPT4gKG1vdmVtZW50OiBNb3ZlbWVudCkgPT4gKHtcbiAgLi4ubW92ZW1lbnQsXG4gIGFjY2VsZXJhdGlvbjoge1xuICAgIC4uLm1vdmVtZW50LmFjY2VsZXJhdGlvbixcbiAgICB4OiBhY2NYLFxuICB9LFxufSk7XG5cbmNvbnN0IGJyZWFrUmlnaHQgPSAobW92ZW1lbnQ6IE1vdmVtZW50KSA9PiB7XG4gIGlmKG1vdmVtZW50LmFjY2VsZXJhdGlvbi54ID4gMCApe1xuICAgIHJldHVybiBzZXRBY2NlbGVyYXRpb25YKDApKG1vdmVtZW50KVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBtb3ZlbWVudDtcbiAgfVxufVxuXG5jb25zdCBicmVha0xlZnQgPSAobW92ZW1lbnQ6IE1vdmVtZW50KSA9PiB7XG4gIGlmKG1vdmVtZW50LmFjY2VsZXJhdGlvbi54IDwgMCApe1xuICAgIHJldHVybiBzZXRBY2NlbGVyYXRpb25YKDApKG1vdmVtZW50KVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBtb3ZlbWVudDtcbiAgfVxufVxuY29uc3Qgc2V0VmVsb2NpdHlZID0gKHZlbG9jaXR5WTogbnVtYmVyKSA9PiAobW92ZW1lbnQ6IE1vdmVtZW50KSA9PiAoe1xuICAuLi5tb3ZlbWVudCxcbiAgdmVsb2NpdHk6IHtcbiAgICAuLi5tb3ZlbWVudC52ZWxvY2l0eSxcbiAgICB5OiB2ZWxvY2l0eVksXG4gIH0sXG59KTtcblxuY29uc3Qgc2V0SnVtcFZlbG9jaXR5ID0gc2V0VmVsb2NpdHlZKC00KTtcblxuY29uc3Qgc2V0SnVtcFZlbG9jaXR5SWZTdG9wcGVkID0gKG1vdmVtZW50OiBNb3ZlbWVudCkgPT4ge1xuICBpZihtb3ZlbWVudC52ZWxvY2l0eS55ID09PSAwKSB7XG4gICByZXR1cm4gc2V0SnVtcFZlbG9jaXR5KG1vdmVtZW50KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbW92ZW1lbnQ7XG4gIH0gXG59XG5cbnR5cGUgQXBwbHlNb3ZlbWVudCA9IChtb3ZlbWVudDogTW92ZW1lbnQpID0+IE1vdmVtZW50O1xuXG5hc3luYyBmdW5jdGlvbiogZ2V0SW5wdXRTdHJlYW0oa2V5TWFwOiBLZXlNYXApIHtcbiAgd2hpbGUgKHRydWUpIHtcbiAgICB5aWVsZCBuZXcgUHJvbWlzZTxJbnB1dEV2ZW50PigocmVzb2x2ZSkgPT4ge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4ga2V5TWFwKSB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0ga2V5IGFzIElucHV0O1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICBpZiAoZXZlbnQuY29kZSA9PT0ga2V5TWFwW2lucHV0XSkge1xuICAgICAgICAgICAgcmVzb2x2ZSh7IGlucHV0LCBhY3Rpb246IFwiUFJFU1NcIiB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgaWYgKGV2ZW50LmNvZGUgPT09IGtleU1hcFtpbnB1dF0pIHtcbiAgICAgICAgICAgIHJlc29sdmUoeyBpbnB1dCwgYWN0aW9uOiBcIlJFTEVBU0VcIiB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiogZ2V0UGxheWVyTW92ZW1lbnRTdHJlYW1CeUlucHV0KCAgXG4gIGtleU1hcDogIFJlY29yZDxJbnB1dCwgS2V5Q29kZT5cbik6IEFzeW5jR2VuZXJhdG9yPEFwcGx5TW92ZW1lbnQ+IHtcbiAgZm9yIGF3YWl0IChjb25zdCBpbnB1dEV2ZW50IG9mIGdldElucHV0U3RyZWFtKGtleU1hcCkpIHtcbiAgICBzd2l0Y2ggKGlucHV0RXZlbnQuaW5wdXQpIHtcbiAgICAgIGNhc2UgXCJSSUdIVFwiOlxuICAgICAgICBzd2l0Y2ggKGlucHV0RXZlbnQuYWN0aW9uKSB7XG4gICAgICAgICAgY2FzZSBcIlBSRVNTXCI6XG4gICAgICAgICAgICB5aWVsZCBzZXRBY2NlbGVyYXRpb25YKDEpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBcIlJFTEVBU0VcIjpcbiAgICAgICAgICAgIHlpZWxkIGJyZWFrUmlnaHQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJMRUZUXCI6XG4gICAgICAgIHN3aXRjaCAoaW5wdXRFdmVudC5hY3Rpb24pIHtcbiAgICAgICAgICBjYXNlIFwiUFJFU1NcIjpcbiAgICAgICAgICAgIHlpZWxkIHNldEFjY2VsZXJhdGlvblgoLTEpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBcIlJFTEVBU0VcIjpcbiAgICAgICAgICAgIHlpZWxkIGJyZWFrTGVmdDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIkpVTVBcIjpcbiAgICAgICAgeWllbGQgc2V0SnVtcFZlbG9jaXR5SWZTdG9wcGVkO1xuICAgICAgICBicmVhazsgXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge1xuICBFbmVteVNwYXduUG9pbnQsXG4gIFN0YWdlRGVzaWduLFxuICBQb3NpdGlvbixcbiAgVGlsZWRMYXllckRlc2lnbixcbiAgUGF0dGVyblR5cGUsXG4gIFBhdHRlcm5TcGF3blBvaW50LFxuICBUcmFpdH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IFRJTEVfU0laRSB9IGZyb20gXCIuL3RpbGVkLXNwcml0ZXNcIjtcblxuY29uc3QgZ29vbWJhID0ge1xuICBzdGVwMToge1xuICAgIGltYWdlOiBcIkVORU1JRVNcIiBhcyBjb25zdCxcbiAgICBjb29yZGluYXRlczoge1xuICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgeDogMixcbiAgICAgICAgeTogMTU1LFxuICAgICAgfSxcbiAgICAgIHNpemU6IHtcbiAgICAgICAgaGVpZ2h0OiAxNixcbiAgICAgICAgd2lkdGg6IDE2LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IG1ha2VHb29tYmEgPSAoaW5pdGlhbFBvc2l0aW9uOiBQb3NpdGlvbikgPT4ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IFwiR09PTUJBXCIgYXMgY29uc3QsXG4gICAgdHJhaXRzOiBbXCJTSURFV0FZU19XQUxLRVJcIiBhcyBjb25zdCwgXCJCT1VOQ0VBQkxFXCIgYXMgY29uc3RdLFxuICAgIG1vdmVtZW50OiB7XG4gICAgICBwb3NpdGlvbjogaW5pdGlhbFBvc2l0aW9uLFxuICAgICAgdmVsb2NpdHk6IHtcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogMFxuICAgICAgfSxcbiAgICAgIGFjY2VsZXJhdGlvbjoge1xuICAgICAgICB4OiAtMC4xNSxcbiAgICAgICAgeTogMFxuICAgICAgfVxuICAgIH0sXG4gICAgaXNEZWFkOiBmYWxzZSxcbiAgICBzcHJpdGU6IGdvb21iYS5zdGVwMSxcbiAgfTsgIFxufVxuXG5jb25zdCBnZXRQYXR0ZXJuVHJhaXRzID0gKHBhdHRlcm5UeXBlOiBQYXR0ZXJuVHlwZSk6IFRyYWl0W10gID0+IHtcbiAgc3dpdGNoIChwYXR0ZXJuVHlwZSkge1xuICAgIGNhc2UgXCJHUk9VTkRcIjpcbiAgICBjYXNlIFwiUElQRVwiOlxuICAgICAgcmV0dXJuIFtcIlNPTElEXCIgYXMgY29uc3RdO1xuICAgIGNhc2UgXCJCUklDS1wiOlxuICAgICAgcmV0dXJuIFtcIlNPTElEXCIgYXMgY29uc3QsIFwiQlJFQUtBQkxFXCIgYXMgY29uc3RdO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gW107XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBnZXRQYXR0ZXJuU3RhdGUgPSAoe1xuICBwYXR0ZXJuLFxuICBwb3NpdGlvbixcbn06IFBhdHRlcm5TcGF3blBvaW50KSA9PiB7XG4gIHJldHVybiB7XG4gICAgcGF0dGVybixcbiAgICBtb3ZlbWVudDoge1xuICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgeDogcG9zaXRpb24ueCAqIFRJTEVfU0laRSxcbiAgICAgICAgeTogcG9zaXRpb24ueSAqIFRJTEVfU0laRVxuICAgICAgfSxcbiAgICAgIHZlbG9jaXR5OiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgIGFjY2VsZXJhdGlvbjogeyB4OiAwLCB5OiAwIH0sXG4gICAgfSxcbiAgICB0cmFpdHM6IGdldFBhdHRlcm5UcmFpdHMocGF0dGVybi50eXBlKSwgICAgXG4gIH07XG59O1xuXG5jb25zdCBtYXJpbyA9IHtcbiAgc3RhbGxlZDoge1xuICAgIGltYWdlOiBcIk1BUklPXCIgYXMgY29uc3QsXG4gICAgY29vcmRpbmF0ZXM6IHtcbiAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgIHg6IDIxNixcbiAgICAgICAgeTogODksXG4gICAgICB9LFxuICAgICAgc2l6ZToge1xuICAgICAgICBoZWlnaHQ6IDE1LFxuICAgICAgICB3aWR0aDogMTQsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59O1xuXG5jb25zdCBnZXRQbGF5ZXJJbml0aWFsU3RhdGUgPSAoXG4gIHBsYXllclNwYXduUG9pbnRQb3NpdGlvbjogUG9zaXRpb25cbikgPT4ge1xuICByZXR1cm4ge1xuICAgIG1vdmVtZW50OiB7XG4gICAgICBwb3NpdGlvbjogcGxheWVyU3Bhd25Qb2ludFBvc2l0aW9uLFxuICAgICAgdmVsb2NpdHk6IHsgeDogMCwgeTogMCB9LFxuICAgICAgYWNjZWxlcmF0aW9uOiB7IHg6IDAsIHk6IDAgfSxcbiAgICB9LFxuICAgIHNwcml0ZTogbWFyaW8uc3RhbGxlZCxcbiAgICBpc0RlYWQ6IGZhbHNlLFxuICB9O1xufTtcblxuY29uc3QgZ2V0RW5lbXlTdGF0ZSA9IChlbmVteVNwYXduUG9pbnQ6IEVuZW15U3Bhd25Qb2ludCkgPT4ge1xuICBpZiAoZW5lbXlTcGF3blBvaW50LnR5cGUgPT09IFwiR09PTUJBXCIpIHtcbiAgICByZXR1cm4gbWFrZUdvb21iYShlbmVteVNwYXduUG9pbnQucG9zaXRpb24pO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihgRW5lbXkgdHlwZSBub3QgZm91bmQ6ICR7ZW5lbXlTcGF3blBvaW50LnR5cGV9YCk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uKiBnZXRQYXR0ZXJuc1N0YXRlKGxheWVyczogVGlsZWRMYXllckRlc2lnbltdKSB7XG4gIGZvciAoY29uc3QgbGF5ZXIgb2YgbGF5ZXJzKSB7XG4gICAgZm9yIChjb25zdCBwYXR0ZXJuU3Bhd24gb2YgbGF5ZXIucGF0dGVybnMpIHtcbiAgICAgIHlpZWxkIGdldFBhdHRlcm5TdGF0ZShwYXR0ZXJuU3Bhd24pO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZ2V0U3RhZ2VTdGF0ZSA9IChzdGFnZURlc2lnbjogU3RhZ2VEZXNpZ24pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBtYXJpbzogZ2V0UGxheWVySW5pdGlhbFN0YXRlKHN0YWdlRGVzaWduLnBsYXllci5wb3NpdGlvbiksXG4gICAgZW5lbWllczogc3RhZ2VEZXNpZ24uZW5lbWllcy5tYXAoZ2V0RW5lbXlTdGF0ZSksXG4gICAgcGF0dGVybnM6IFsuLi5nZXRQYXR0ZXJuc1N0YXRlKHN0YWdlRGVzaWduLmxheWVycyldLFxuICB9O1xufTtcbiIsImltcG9ydCB7XG4gIFBvc2l0aW9uLCAgXG4gIFBhdHRlcm4sXG4gIFNpemUsICBcbn0gZnJvbSBcIi4vdHlwZXNcIjtcblxuZXhwb3J0IGNvbnN0IFRJTEVfU0laRSA9IDE2O1xuXG5jb25zdCBUSUxFX1BBRERJTkcgPSAxO1xuY29uc3QgVElMRV9TUFJJVEVTX01BUCA9IHtcbiAgICBcIlNLWVwiOlxuICAgIHtcbiAgICAgIHg6IDM4LFxuICAgICAgeTogMSxcbiAgICB9LCAgXG4gICAgXCJHUk9VTkRfVE9QX0xFRlRcIjpcbiAgICB7XG4gICAgICB4OiAyNixcbiAgICAgIHk6IDksXG4gICAgfSwgICAgXG4gICAgXCJHUk9VTkRfVE9QX01JRERMRVwiOlxuICAgIHtcbiAgICAgIHg6IDI3LFxuICAgICAgeTogOSxcbiAgICB9LCAgICBcbiAgICBcIkdST1VORF9UT1BfUklHSFRcIjpcbiAgICB7XG4gICAgICB4OiAyOCxcbiAgICAgIHk6IDksXG4gICAgfSwgICAgXG4gICAgXCJQSVBFX1RPUF9MRUZUXCI6XG4gICAge1xuICAgICAgeDogNCxcbiAgICAgIHk6IDIsXG4gICAgfSwgICAgXG4gICAgXCJQSVBFX1RPUF9SSUdIVFwiOlxuICAgIHtcbiAgICAgIHg6IDUsXG4gICAgICB5OiAyLFxuICAgIH0sICAgIFxuICAgIFwiUElQRV9CT1RUT01fTEVGVFwiOlxuICAgIHtcbiAgICAgIHg6IDQsXG4gICAgICB5OiAzLFxuICAgIH0sICAgIFxuICAgIFwiUElQRV9CT1RUT01fUklHSFRcIjpcbiAgICB7XG4gICAgICB4OiA1LFxuICAgICAgeTogMyxcbiAgICB9LCBcbiAgICBcIkJSSUNLMVwiOlxuICAgIHtcbiAgICAgIHg6IDYxLFxuICAgICAgeTogMCxcbiAgICB9LCAgXG4gIH07XG5cbnR5cGUgVGlsZSA9IGtleW9mIHR5cGVvZiBUSUxFX1NQUklURVNfTUFQOyBcblxuY29uc3QgY3JlYXRlU2t5UGF0dGVybiA9ICh7IHdpZHRoLCBoZWlnaHQgfTogU2l6ZSkgPT4ge1xuICBjb25zdCBza3lTcHJpdGVQYXR0ZXJuID0gQXJyYXk8IFRpbGVbXT4oaGVpZ2h0KS5maWxsKFxuICAgIEFycmF5PFRpbGU+KHdpZHRoKS5maWxsKFwiU0tZXCIgYXMgY29uc3QsIDAsIHdpZHRoKSxcbiAgICAwLFxuICAgIGhlaWdodFxuICApO1xuICByZXR1cm4gc2t5U3ByaXRlUGF0dGVybjtcbn07XG5cbmNvbnN0IGNyZWF0ZVBpcGVQYXR0ZXJuID0gKGhlaWdodDogbnVtYmVyKSA9PiB7XG4gIGNvbnN0IGJhc2UgPSBBcnJheTxUaWxlW10+KGhlaWdodCkuZmlsbChbXG4gICAgXCJQSVBFX0JPVFRPTV9MRUZUXCIgYXMgY29uc3QsXG4gICAgXCJQSVBFX0JPVFRPTV9SSUdIVFwiIGFzIGNvbnN0LFxuICBdKTtcbiAgcmV0dXJuIFtbXCJQSVBFX1RPUF9MRUZUXCIgYXMgY29uc3QsIFwiUElQRV9UT1BfUklHSFRcIiBhcyBjb25zdF0sIC4uLmJhc2VdO1xufTtcblxuY29uc3QgY3JlYXRlQnJpY2tQYXR0ZXJuID0gKCkgPT4ge1xuICByZXR1cm4gW1tcIkJSSUNLMVwiIGFzIGNvbnN0XV07XG59O1xuXG5jb25zdCBjcmVhdGVHcm91bmRQYXR0ZXJuID0gKGxlbmd0aDogbnVtYmVyKSA9PiB7XG4gIGNvbnN0IG1pZGRsZUxlbmd0aCA9IGxlbmd0aCA+IDIgPyBsZW5ndGggLSAyIDogMDtcbiAgY29uc3QgdGlsZXNBcnJheSA9IEFycmF5PFwiR1JPVU5EX1RPUF9NSURETEVcIj4obWlkZGxlTGVuZ3RoKS5maWxsKFxuICAgIFwiR1JPVU5EX1RPUF9NSURETEVcIiBhcyBjb25zdCxcbiAgICAwLFxuICAgIG1pZGRsZUxlbmd0aFxuICApO1xuICByZXR1cm4gW1tcIkdST1VORF9UT1BfTEVGVFwiIGFzIGNvbnN0LCAuLi50aWxlc0FycmF5LCBcIkdST1VORF9UT1BfUklHSFRcIiBhcyBjb25zdF1dO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldFBhdHRlcm5UaWxlcyA9IChwYXR0ZXJuOiBQYXR0ZXJuKSA9PiB7XG4gIGlmIChwYXR0ZXJuLnR5cGUgPT09IFwiR1JPVU5EXCIpIHtcbiAgICByZXR1cm4gY3JlYXRlR3JvdW5kUGF0dGVybihwYXR0ZXJuLmxlbmd0aCk7XG4gIH0gZWxzZSBpZiAocGF0dGVybi50eXBlID09PSBcIlNLWVwiKSB7XG4gICAgcmV0dXJuIGNyZWF0ZVNreVBhdHRlcm4ocGF0dGVybi5zaXplKTtcbiAgfSBlbHNlIGlmIChwYXR0ZXJuLnR5cGUgPT09IFwiUElQRVwiKSB7XG4gICAgcmV0dXJuIGNyZWF0ZVBpcGVQYXR0ZXJuKHBhdHRlcm4uaGVpZ2h0KTtcbiAgfSBlbHNlIGlmIChwYXR0ZXJuLnR5cGUgPT09IFwiQlJJQ0tcIikge1xuICAgIHJldHVybiBjcmVhdGVCcmlja1BhdHRlcm4oKTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoYFBhdHRlcm4gVHlwZSBub3QgbWFwcGVkYCk7XG59O1xuXG5cbmV4cG9ydCBjb25zdCBnZXRQYXR0ZXJuU2l6ZSA9IChwYXR0ZXJuOiBQYXR0ZXJuKSA9PiB7XG4gIGNvbnN0IHRpbGVzID0gZ2V0UGF0dGVyblRpbGVzKHBhdHRlcm4pO1xuICByZXR1cm4geyAgICBcbiAgICB3aWR0aDogKHRpbGVzWzBdLmxlbmd0aCkgKiBUSUxFX1NJWkUsICAgIFxuICAgIGhlaWdodDogKHRpbGVzLmxlbmd0aCkgKiBUSUxFX1NJWkUsXG4gIH07XG59O1xuXG5jb25zdCBnZXRTcHJpdGVDb29yZGluYXRlcyA9ICh7IHgsIHkgfTogUG9zaXRpb24pID0+IHtcbiAgY29uc3Qgc2l6ZVdpdGhQYWRkaW5nID0gVElMRV9TSVpFICsgVElMRV9QQURESU5HO1xuICByZXR1cm4ge1xuICAgIHBvc2l0aW9uOiB7XG4gICAgICB4OiB4ICogc2l6ZVdpdGhQYWRkaW5nICsgVElMRV9QQURESU5HLFxuICAgICAgeTogeSAqIHNpemVXaXRoUGFkZGluZyArIFRJTEVfUEFERElORyxcbiAgICB9LFxuICAgIHNpemU6IHtcbiAgICAgIGhlaWdodDogVElMRV9TSVpFLFxuICAgICAgd2lkdGg6IFRJTEVfU0laRSxcbiAgICB9LFxuICB9O1xufTtcblxuY29uc3QgZ2V0VGlsZVNwcml0ZSA9ICh0aWxlOiBUaWxlKSA9PiB7XG4gIGNvbnN0IHRpbGVQb3NpdGlvbiA9IFRJTEVfU1BSSVRFU19NQVBbdGlsZV07XG4gIGlmICghdGlsZVBvc2l0aW9uKSB0aHJvdyBuZXcgRXJyb3IoYFRpbGUgbm90IG1hcHBlZCAke3RpbGV9YCk7XG4gIGNvbnN0IGNvb3JkaW5hdGVzID0gZ2V0U3ByaXRlQ29vcmRpbmF0ZXModGlsZVBvc2l0aW9uKTtcbiAgcmV0dXJuIHtcbiAgICBpbWFnZTogXCJCQUNLR1JPVU5EXCIgYXMgY29uc3QsXG4gICAgY29vcmRpbmF0ZXMsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24qIGdldFRpbGVzU3ByaWNlUGxhY2VtZW50cyh0aWxlczogVGlsZVtdW10sIHBvc2l0aW9uOiBQb3NpdGlvbikge1xuICBjb25zdCBzdGFydGluZ1Bvc2l0aW9uID0ge1xuICAgIHg6IHBvc2l0aW9uLngsXG4gICAgeTogcG9zaXRpb24ueSxcbiAgfTtcbiAgZm9yIChsZXQgW2osIGxpbmVdIG9mIHRpbGVzLmVudHJpZXMoKSkge1xuICAgIGZvciAobGV0IFtpLCB0aWxlXSBvZiBsaW5lLmVudHJpZXMoKSkge1xuICAgICAgY29uc3Qgc3ByaXRlID0gZ2V0VGlsZVNwcml0ZSh0aWxlKTtcbiAgICAgIGNvbnN0IG9mZnNldCA9IHtcbiAgICAgICAgeDogaSAqIFRJTEVfU0laRSxcbiAgICAgICAgeTogaiAqIFRJTEVfU0laRSxcbiAgICAgIH07XG4gICAgICBjb25zdCBwb3NpdGlvbiA9IHtcbiAgICAgICAgeDogc3RhcnRpbmdQb3NpdGlvbi54ICsgb2Zmc2V0LngsXG4gICAgICAgIHk6IHN0YXJ0aW5nUG9zaXRpb24ueSArIG9mZnNldC55LFxuICAgICAgfTtcbiAgICAgIHlpZWxkIHtcbiAgICAgICAgc3ByaXRlLFxuICAgICAgICBwb3NpdGlvbixcbiAgICAgIH07XG4gICAgfVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9