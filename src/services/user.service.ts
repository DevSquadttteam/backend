import User, { IUser } from "../db/models/User.js";
import bcrypt from "bcryptjs";

export class UserService {
  // Get all users
  async getAllUsers(): Promise<Partial<IUser>[]> {
    const users = await User.find().lean();
    return users.map(({ password, ...rest }) => rest);
  }

  // Get user by ID
  async getUserById(userId: string): Promise<Partial<IUser>> {
    const user = await User.findById(userId).lean();
    if (!user) throw new Error("User not found");
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async updateUser(userId: string, updateData: Partial<IUser>): Promise<Partial<IUser>> {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).lean();
    if (!updatedUser) throw new Error("User not found");

    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async deleteUser(userId: string): Promise<void> {
    const deleted = await User.findByIdAndDelete(userId);
    if (!deleted) throw new Error("User not found");
  }
}
