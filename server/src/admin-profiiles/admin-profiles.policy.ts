import { AuthUserType } from 'src/core/utils/types/common';
import { UserType } from 'src/core/utils/enums/userType';
import { AdminProfile } from './entities/admin-profiile.entity';

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
