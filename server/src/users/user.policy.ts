import { UserType } from '../core/utils/enums/userType';
import { AuthUserType } from 'src/core/utils/types/common';

export const userPolicy = {
  find(user: AuthUserType) {
    return user?.userType === UserType.ADMIN;
  },

  findAll(user: AuthUserType) {
    console.log(user);

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

  getChauffeurs(user: AuthUserType) {
    const isAdmin = user?.userType === UserType.ADMIN;
    if (user && isAdmin) {
      return true;
    } else {
      return false;
    }
  },

  getActiveChauffeurs(user: AuthUserType) {
    return user ? true : false;
  },

  checkAvailabilty(user: AuthUserType) {
    return user ? true : false;
  },

  getCustomer(user: AuthUserType) {
    const isAdmin = user?.userType === UserType.ADMIN;
    if (user && isAdmin) {
      return true;
    } else {
      return false;
    }
  },
};

export type IUserPolicy = typeof userPolicy;
