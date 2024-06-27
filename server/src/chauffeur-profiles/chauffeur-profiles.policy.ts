import { AuthUserType } from 'src/utils/types/common';
import { ChauffeurProfile } from './entities/chauffeur-profile.entity';
import { UserType } from 'src/utils/enums/userType';

export const ChauffeurProfilesPolicy = {
  find(user: AuthUserType, chauffeurProfile: ChauffeurProfile) {
    return (
      user?.userType === UserType.CHAUFFEUR &&
      chauffeurProfile?.user?.id === user.id
    );
  },

  update(user: AuthUserType, chauffeurProfile: ChauffeurProfile) {
    if (user?.userType === UserType.ADMIN) {
      return true;
    }
    if (user?.userType === UserType.CHAUFFEUR && chauffeurProfile?.user?.id) {
      return true;
    }
    return false;
  },

  availableSlots(user: AuthUserType) {
    return user ? true : false;
  },
};

export type IChauffeurProfilesPolicy = typeof ChauffeurProfilesPolicy;
