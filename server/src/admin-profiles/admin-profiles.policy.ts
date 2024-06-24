import { AuthUserType } from 'src/utils/types/common';
import { UserType } from 'src/utils/enums/userType';
import { AdminProfile } from './entities/admin-profile.entity';

export const AdminProfilesPolicy = {
  find(user: AuthUserType, adminProfile: AdminProfile) {
    return (
      user?.userType === UserType.ADMIN && adminProfile?.user?.id === user.id
    );
  },

  update(user: AuthUserType, adminProfile: AdminProfile) {
    return (
      user?.userType === UserType.ADMIN && adminProfile?.user?.id === user.id
    );
  },
};

export type IadminProfilesPolicy = typeof AdminProfilesPolicy;
