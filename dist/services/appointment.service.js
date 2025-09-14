var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Appointment from "../db/models/Appointment.js";
export class AppointmentService {
    createAppointment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointment = new Appointment(data);
            return appointment.save();
        });
    }
    getAllAppointments() {
        return __awaiter(this, void 0, void 0, function* () {
            return Appointment.find()
                .populate("doctor", "name email field profilePicture")
                .populate("patient", "name email profilePicture")
                .lean();
        });
    }
    getDoctorAppointments(doctorId) {
        return __awaiter(this, void 0, void 0, function* () {
            return Appointment.find({ doctor: doctorId })
                .populate("patient", "name email profilePicture")
                .lean();
        });
    }
    getPatientAppointments(patientId) {
        return __awaiter(this, void 0, void 0, function* () {
            return Appointment.find({ patient: patientId })
                .populate("doctor", "name email field profilePicture")
                .lean();
        });
    }
    getAppointmentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return Appointment.findById(id)
                .populate("doctor", "name email field profilePicture")
                .populate("patient", "name email profilePicture")
                .lean();
        });
    }
    updateAppointment(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return Appointment.findByIdAndUpdate(id, data, { new: true })
                .populate("doctor", "name email field profilePicture")
                .populate("patient", "name email profilePicture")
                .lean();
        });
    }
    deleteAppointment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield Appointment.findByIdAndDelete(id);
            if (!deleted)
                throw new Error("Appointment not found");
        });
    }
}
