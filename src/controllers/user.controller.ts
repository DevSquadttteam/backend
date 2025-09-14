import { Request, Response } from "express";
import { UserService } from "../services/user.service.js";

export class UserController {
  private userService = new UserService();

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.userService.getAllUsers();
      return res.json({ success: true, data: users });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.userService.getUserById(req.params.id);
      return res.json({ success: true, data: user });
    } catch (error: any) {
      return res.status(404).json({ success: false, message: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const updatedUser = await this.userService.updateUser(req.params.id, req.body);
      return res.json({ success: true, data: updatedUser });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      await this.userService.deleteUser(req.params.id);
      return res.json({ success: true, message: "User deleted successfully" });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
}
