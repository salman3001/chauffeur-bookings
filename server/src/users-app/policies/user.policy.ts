import { UserType } from '../../core/utils/enums/userType';
import { AuthUserType } from 'src/core/utils/types/common';

export const userPolicy = {
  find() {
    return true;
  },

  findAll() {
    return true;
  },

  create(user: AuthUserType) {
    return user?.userType === UserType.SUPER_ADMIN;
  },

  update(user: AuthUserType) {
    return user?.userType === UserType.SUPER_ADMIN;
  },

  remove(user: AuthUserType) {
    return user?.userType === UserType.SUPER_ADMIN;
  },
};

export type IUserPolicy = typeof userPolicy;
