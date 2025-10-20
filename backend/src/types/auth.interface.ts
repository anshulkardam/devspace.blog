import { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';

export interface UserJwtPayload extends JwtPayload {
  userId: Types.ObjectId;
}

export interface AdminJwtPayload extends JwtPayload {
  userId: Types.ObjectId;
  role: string;
}
