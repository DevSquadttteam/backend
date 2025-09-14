import Appointment, { IAppointment } from "../db/models/Appointment.js";

export class AppointmentService {
  async createAppointment(data: {
    doctor: string;
    patient: string;
    dateTime: Date;
    notes?: string;
  }): Promise<IAppointment> {
    const appointment = new Appointment(data);
    return appointment.save();
  }

  async getAllAppointments(): Promise<IAppointment[]> {
    return Appointment.find()
      .populate("doctor", "name email field profilePicture")
      .populate("patient", "name email profilePicture")
      .lean();
  }

  async getDoctorAppointments(doctorId: string): Promise<IAppointment[]> {
    return Appointment.find({ doctor: doctorId })
      .populate("patient", "name email profilePicture")
      .lean();
  }

  async getPatientAppointments(patientId: string): Promise<IAppointment[]> {
    return Appointment.find({ patient: patientId })
      .populate("doctor", "name email field profilePicture")
      .lean();
  }

  async getAppointmentById(id: string): Promise<IAppointment | null> {
    return Appointment.findById(id)
      .populate("doctor", "name email field profilePicture")
      .populate("patient", "name email profilePicture")
      .lean();
  }

  async updateAppointment(id: string, data: Partial<IAppointment>): Promise<IAppointment | null> {
    return Appointment.findByIdAndUpdate(id, data, { new: true })
      .populate("doctor", "name email field profilePicture")
      .populate("patient", "name email profilePicture")
      .lean();
  }

  async deleteAppointment(id: string): Promise<void> {
    const deleted = await Appointment.findByIdAndDelete(id);
    if (!deleted) throw new Error("Appointment not found");
  }
}
