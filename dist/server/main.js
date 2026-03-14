"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const alwinApp_1 = require("./alwinApp");
const model_1 = require("./model");
const state = (0, model_1.createInitialAppState)();
(0, alwinApp_1.mountApp)(state);
