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
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const file = req.file;
        console.log('req.body:', req.body);
        console.log('req.file:', req.file);
        const userExists = yield User_1.default.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = new User_1.default({
            name: username,
            email,
            password: hashedPassword,
            image: file === null || file === void 0 ? void 0 : file.path,
        });
        yield newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('login fun called');
    const { email, password } = req.body;
    console.log(email, password);
    const user = yield User_1.default.findOne({ email });
    if (!user) {
        console.log('user not found');
        return res.status(400).json({ message: 'User not found' });
    }
    const isPasswordCorrect = yield bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Invalid password' });
    }
    const token = jsonwebtoken_1.default.sign({ userId: user._id, userName: user, role: 'normal' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const logedUser = {
        image: user.image,
        name: user.name,
        email: user.email
    };
    res.json(Object.assign(Object.assign({ message: 'Login successful' }, logedUser), { token }));
});
exports.login = login;
