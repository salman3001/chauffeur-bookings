import { UserType } from '../core/utils/enums/userType';
import { AuthUserType } from 'src/core/utils/types/common';

export const userPolicy = {
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

  getChauffuers(user: AuthUserType) {
    return user ? true : false;
  },

  getAvailableSlots(user: AuthUserType) {
    return user ? true : false;
  },
};

export type IUserPolicy = typeof userPolicy;
