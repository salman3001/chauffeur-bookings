import { AuthUserType } from 'src/utils/types/common';

export const profilePolicy = {
  find(user: AuthUserType) {
    return user ? true : false;
  },

  update(user: AuthUserType) {
    return user ? true : false;
  },
};

export type IProfilePolicy = typeof profilePolicy;
