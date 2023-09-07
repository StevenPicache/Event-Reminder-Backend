"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const eventServices = require('../services/events');
const testEventRead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Reached test event");
    const result = yield eventServices.testEventServicesFunction();
    console.log(result);
    res.send(result);
});
const testEventWrite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Reached test event");
    res.send('Reached test event');
});
const testEventDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Reached test event");
    res.send('Reached test event');
});
const testEventCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Reached test event");
    res.send('Reached test event');
});
router.get('/testEventRead', testEventRead);
router.put('/testEventWrite', testEventWrite);
router.delete('/testEventDelete', testEventDelete);
router.post('/testEventCreate', testEventCreate);
module.exports = router;
