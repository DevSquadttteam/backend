var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
import User from "../db/models/User.js";
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }
        console.log(`"${token}"`);
        const secret = process.env.JWT_SECRET;
        console.log(process.env.JWT_SECRET);
        const decoded = jwt.verify(token, secret);
        const user = yield User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "User not found, authorization denied" });
        }
        req.user = user;
        next();
    }
    catch (err) {
        console.error(err);
        res.status(401).json({ message: "Token is not valid" });
    }
});
export default auth;
