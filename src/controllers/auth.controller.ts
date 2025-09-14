import { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";

export class AuthController {
  constructor(private authService: AuthService) {}

  async register(req: Request, res: Response): Promise<Response> {
    try {
      const { user, token } = await this.authService.register(req.body);
      return res.status(201).json({ success: true, data: user, token });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { user, token } = await this.authService.login(req.body);
      return res.status(200).json({ success: true, data: user, token });
    } catch (error: any) {
      return res.status(401).json({ success: false, message: error.message });
    }
  }

  async logout(req: Request, res: Response): Promise<Response> {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(400).json({ success: false, message: "No token provided" });

      await this.authService.logout(token);
      return res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async me(req: any, res: Response): Promise<Response> {
    try {
      const user = await this.authService.getMe(req.user?.id as any);
      return res.status(200).json({ success: true, data: user });
    } catch (error: any) {
      return res.status(404).json({ success: false, message: error.message });
    }
  }
}
