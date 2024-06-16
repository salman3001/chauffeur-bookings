export interface IJwtPayload {
  id: number;
  userType: number;
  permissions: number[] | undefined;
}

export type AuthUserType = IJwtPayload | null;
