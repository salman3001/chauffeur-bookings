import { UserType } from '../utils/enums/userType';
import { AuthUserType } from 'src/utils/types/common';

export const BookedSlotsPolicy = {
  findAllByMonth(user: AuthUserType) {
    return user?.userType === UserType.ADMIN;
  },

  findAllByMonthForChauffeur(user: AuthUserType, requestedChauffeurId: number) {
    const isAdmin = user?.userType === UserType.ADMIN;
    const isValidChauffeur =
      user?.userType === UserType.CHAUFFEUR && user.id === requestedChauffeurId;
    return isAdmin || isValidChauffeur;
  },

  findChauffeurBookedSlotsByDate(user: AuthUserType) {
    return user ? true : false;
  },
};

export type IBookedSlotsPolicy = typeof BookedSlotsPolicy;
