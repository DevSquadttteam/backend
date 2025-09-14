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
import User from "../db/models/User.js";
import bcrypt from "bcryptjs";
export class UserService {
    // Get all users
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield User.find().lean();
            return users.map((_a) => {
                var { password } = _a, rest = __rest(_a, ["password"]);
                return rest;
            });
        });
    }
    // Get user by ID
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User.findById(userId).lean();
            if (!user)
                throw new Error("User not found");
            const { password } = user, userWithoutPassword = __rest(user, ["password"]);
            return userWithoutPassword;
        });
    }
    updateUser(userId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (updateData.password) {
                updateData.password = yield bcrypt.hash(updateData.password, 10);
            }
            const updatedUser = yield User.findByIdAndUpdate(userId, updateData, { new: true }).lean();
            if (!updatedUser)
                throw new Error("User not found");
            const { password } = updatedUser, userWithoutPassword = __rest(updatedUser, ["password"]);
            return userWithoutPassword;
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield User.findByIdAndDelete(userId);
            if (!deleted)
                throw new Error("User not found");
        });
    }
}
