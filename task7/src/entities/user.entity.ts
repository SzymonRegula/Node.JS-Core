import { Schema, model } from "mongoose";

export type Role = "admin" | "user";

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface UserRegistrationRequest extends UserLoginRequest {
  role: Role;
}

export interface UserEntity extends UserRegistrationRequest {
  id: string; // uuid
}

const UserSchema: Schema = new Schema<UserEntity>({
  id: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

export const UserModel = model<UserEntity>("User", UserSchema);
