var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user, token } = yield this.authService.register(req.body);
                return res.status(201).json({ success: true, data: user, token });
            }
            catch (error) {
                return res.status(400).json({ success: false, message: error.message });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user, token } = yield this.authService.login(req.body);
                return res.status(200).json({ success: true, data: user, token });
            }
            catch (error) {
                return res.status(401).json({ success: false, message: error.message });
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
                if (!token)
                    return res.status(400).json({ success: false, message: "No token provided" });
                yield this.authService.logout(token);
                return res.status(200).json({ success: true, message: "Logged out successfully" });
            }
            catch (error) {
                return res.status(500).json({ success: false, message: error.message });
            }
        });
    }
    me(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const user = yield this.authService.getMe((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
                return res.status(200).json({ success: true, data: user });
            }
            catch (error) {
                return res.status(404).json({ success: false, message: error.message });
            }
        });
    }
}
