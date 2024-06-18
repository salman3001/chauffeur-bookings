import { AuthUserType } from 'src/core/utils/types/common';
import { ChauffeurProfile } from './entities/chauffeur-profile.entity';
import { UserType } from 'src/core/utils/enums/userType';

export const ChauffeurProfilesPolicy = {
  find(user: AuthUserType, chauffeurProfile: ChauffeurProfile) {
    return (
      user?.userType === UserType.CHAUFFEUR &&
      chauffeurProfile?.user?.id === user.id
    );
  },

  update(user: AuthUserType, chauffeurProfile: ChauffeurProfile) {
    return (
      user?.userType === UserType.CHAUFFEUR &&
      chauffeurProfile?.user?.id === user.id
    );
  },
};

export type IChauffeurProfilesPolicy = typeof ChauffeurProfilesPolicy;
