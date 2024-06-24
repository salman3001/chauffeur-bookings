import { UserType } from '../utils/enums/userType';
import { AuthUserType } from 'src/utils/types/common';

export const BookedSlotsPolicy = {
  findAllByMonth(user: AuthUserType) {
    return user?.userType === UserType.ADMIN;
  },

  findAllByMonthForChauffeur(user: AuthUserType, requestedChauffeurId: number) {
    return (
      user?.userType === UserType.CHAUFFEUR && user.id === requestedChauffeurId
    );
  },

  findChauffeurBookedSlotsByDate(user: AuthUserType) {
    return user ? true : false;
  },
};

export type IBookedSlotsPolicy = typeof BookedSlotsPolicy;
