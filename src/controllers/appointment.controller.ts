import { Request, Response } from "express";
import { AppointmentService } from "../services/appointment.service.js";

export class AppointmentController {
  private service = new AppointmentService();

  async create(req: Request, res: Response) {
    try {
      const appointment = await this.service.createAppointment(req.body);
      return res.status(201).json({ success: true, data: appointment });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const appointments = await this.service.getAllAppointments();
      return res.json({ success: true, data: appointments });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const appointment = await this.service.getAppointmentById(req.params.id);
      if (!appointment) throw new Error("Appointment not found");
      return res.json({ success: true, data: appointment });
    } catch (error: any) {
      return res.status(404).json({ success: false, message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const appointment = await this.service.updateAppointment(req.params.id, req.body);
      if (!appointment) throw new Error("Appointment not found");
      return res.json({ success: true, data: appointment });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.service.deleteAppointment(req.params.id);
      return res.json({ success: true, message: "Appointment deleted successfully" });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
}
