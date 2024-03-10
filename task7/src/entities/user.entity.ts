import { Schema, model } from "mongoose";

export interface UserEntity {
  id: string; // uuid
}

const UserSchema: Schema = new Schema<UserEntity>({
  id: { type: String, required: true },
});

export const UserModel = model<UserEntity>("User", UserSchema);
