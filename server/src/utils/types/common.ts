export interface IJwtPayload {
  id: number;
  userType: number;
}

export type AuthUserType = IJwtPayload | null;
