var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AppointmentService } from "../services/appointment.service.js";
export class AppointmentController {
    constructor() {
        this.service = new AppointmentService();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appointment = yield this.service.createAppointment(req.body);
                return res.status(201).json({ success: true, data: appointment });
            }
            catch (error) {
                return res.status(400).json({ success: false, message: error.message });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appointments = yield this.service.getAllAppointments();
                return res.json({ success: true, data: appointments });
            }
            catch (error) {
                return res.status(500).json({ success: false, message: error.message });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appointment = yield this.service.getAppointmentById(req.params.id);
                if (!appointment)
                    throw new Error("Appointment not found");
                return res.json({ success: true, data: appointment });
            }
            catch (error) {
                return res.status(404).json({ success: false, message: error.message });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appointment = yield this.service.updateAppointment(req.params.id, req.body);
                if (!appointment)
                    throw new Error("Appointment not found");
                return res.json({ success: true, data: appointment });
            }
            catch (error) {
                return res.status(400).json({ success: false, message: error.message });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.service.deleteAppointment(req.params.id);
                return res.json({ success: true, message: "Appointment deleted successfully" });
            }
            catch (error) {
                return res.status(400).json({ success: false, message: error.message });
            }
        });
    }
}
