import { UserRole } from "./index";

declare global {
  namespace Express {
    interface User {
      id: string;
      name: string;
      email: string;
      role: UserRole;
      termsAccepted: boolean;
      credits: number;
      twoFactorEnabled: boolean;
      createdAt: string;
    }

    interface Request {
      user?: User;
    }
  }
}

export {};
