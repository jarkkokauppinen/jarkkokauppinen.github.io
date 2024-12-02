"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var port = process.env.PORT || 3000;
app.use('/public', express_1.default.static('public'));
app.get('/', function (_req, res) {
    res.sendFile("".concat(process.cwd(), "/index.html"));
});
app.listen(port, function () {
    console.log("Server is running at ".concat(port));
});
