import { AuthGuard } from './auth.guard';

describe('UsersGuardGuard', () => {
  it('should be defined', () => {
    expect(new AuthGuard()).toBeDefined();
  });

  it('should populate user', () => {
    const ctx = {
      switchToHttp: jest.fn().mockReturnValueOnce({
        getRequest: jest.fn().mockReturnValueOnce({ user: 'user' }),
      }),
    } as any;
    expect(new AuthGuard().canActivate(ctx)).toBeTruthy();
  });

  it('should return false', () => {
    const ctx = {
      switchToHttp: jest.fn().mockReturnValueOnce({
        getRequest: jest.fn().mockReturnValueOnce(null),
      }),
    } as any;
    expect(new AuthGuard().canActivate(ctx)).toBeFalsy();
  });
});
