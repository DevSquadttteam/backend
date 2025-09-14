var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UserService } from "../services/user.service.js";
export class UserController {
    constructor() {
        this.userService = new UserService();
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userService.getAllUsers();
                return res.json({ success: true, data: users });
            }
            catch (error) {
                return res.status(500).json({ success: false, message: error.message });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.getUserById(req.params.id);
                return res.json({ success: true, data: user });
            }
            catch (error) {
                return res.status(404).json({ success: false, message: error.message });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield this.userService.updateUser(req.params.id, req.body);
                return res.json({ success: true, data: updatedUser });
            }
            catch (error) {
                return res.status(400).json({ success: false, message: error.message });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userService.deleteUser(req.params.id);
                return res.json({ success: true, message: "User deleted successfully" });
            }
            catch (error) {
                return res.status(400).json({ success: false, message: error.message });
            }
        });
    }
}
