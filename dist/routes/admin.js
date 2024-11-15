"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const add_employee_1 = require("../services/settings/add_employee");
const router = express_1.default.Router();
// employee registration routes
router.post("/add-employee", add_employee_1.addEmployee);
exports.default = router;
