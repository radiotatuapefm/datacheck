export type UserRole = "customer" | "analyst" | "admin";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  termsAccepted: boolean;
  credits: number;
  twoFactorEnabled: boolean;
  createdAt: string;
}

export interface ConsultationRecord {
  id: string;
  userId: string;
  module: string;
  payload: Record<string, unknown>;
  result: Record<string, unknown>;
  riskScore: number;
  createdAt: string;
}

export interface AuthTokenPayload {
  sub: string;
  email: string;
  role: UserRole;
}
