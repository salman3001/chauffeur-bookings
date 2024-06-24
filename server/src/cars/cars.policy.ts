import { AuthUserType } from 'src/utils/types/common';
import { UserType } from 'src/utils/enums/userType';

export const CarsPolicy = {
  find(user: AuthUserType) {
    return user?.userType === UserType.ADMIN;
  },

  findAll(user: AuthUserType) {
    return user?.userType === UserType.ADMIN;
  },

  create(user: AuthUserType) {
    return user?.userType === UserType.ADMIN;
  },

  update(user: AuthUserType) {
    return user?.userType === UserType.ADMIN;
  },

  remove(user: AuthUserType) {
    return user?.userType === UserType.ADMIN;
  },
};

export type ICarsPolicy = typeof CarsPolicy;
