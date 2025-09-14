import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../db/models/User.js";

export class AuthService {
  async register(userData: { name: string; email: string; password: string; role?: string; gender: string; }) {
    const JWT_SECRET = process.env.JWT_SECRET!;
    const existing = await User.findOne({ email: userData.email });
    if (existing) throw new Error("Email already in use");

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = new User({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      role: userData.role || "patient",
      gender: userData.gender,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id, role: savedUser.role }, JWT_SECRET);

    const { password, ...userWithoutPassword } = savedUser.toObject();
    return { user: userWithoutPassword, token };
  }

  async login(credentials: { email: string; password: string }) {
    const JWT_SECRET = process.env.JWT_SECRET!;
    const user = await User.findOne({ email: credentials.email });
    if (!user) throw new Error("Invalid email or password");

    const isMatch = await bcrypt.compare(credentials.password, user.password);
    if (!isMatch) throw new Error("Invalid email or password");

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
    const { password, ...userWithoutPassword } = user.toObject();
    return { user: userWithoutPassword, token };
  }

  async logout(token: string) {
    // JWT logout is stateless, handled on client side
    return true;
  }

  async getMe(userId: string) {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  }
}
