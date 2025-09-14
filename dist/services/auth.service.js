var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../db/models/User.js";
const JWT_SECRET = process.env.JWT_SECRET || "4dd5c253d82886bba3df5de32e745518976f647d";
export class AuthService {
    register(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const existing = yield User.findOne({ email: userData.email });
            if (existing)
                throw new Error("Email already in use");
            const hashedPassword = yield bcrypt.hash(userData.password, 10);
            const newUser = new User({
                name: userData.name,
                email: userData.email,
                password: hashedPassword,
                role: userData.role || "patient",
                gender: userData.gender,
            });
            const savedUser = yield newUser.save();
            console.log(JWT_SECRET);
            const token = jwt.sign({ id: savedUser._id, role: savedUser.role }, JWT_SECRET);
            const _a = savedUser.toObject(), { password } = _a, userWithoutPassword = __rest(_a, ["password"]);
            return { user: userWithoutPassword, token };
        });
    }
    login(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User.findOne({ email: credentials.email });
            if (!user)
                throw new Error("Invalid email or password");
            const isMatch = yield bcrypt.compare(credentials.password, user.password);
            if (!isMatch)
                throw new Error("Invalid email or password");
            const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
            const _a = user.toObject(), { password } = _a, userWithoutPassword = __rest(_a, ["password"]);
            return { user: userWithoutPassword, token };
        });
    }
    logout(token) {
        return __awaiter(this, void 0, void 0, function* () {
            // JWT logout is stateless, handled on client side
            return true;
        });
    }
    getMe(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User.findById(userId);
            if (!user)
                throw new Error("User not found");
            const _a = user.toObject(), { password } = _a, userWithoutPassword = __rest(_a, ["password"]);
            return userWithoutPassword;
        });
    }
}
