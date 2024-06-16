import { AuthUserType } from 'src/core/utils/types/common';

export const profilePolicy = {
  find(user: AuthUserType) {
    return user ? true : false;
  },

  update(user: AuthUserType, profileUserId: number) {
    return user?.id === profileUserId;
  },
};

export type IProfilePolicy = typeof profilePolicy;
