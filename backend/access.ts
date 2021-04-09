import { Permission, permissionsList } from './schemas/fields';
import { ListAccessArgs } from './types';

export function isSignedIn({ session }: ListAccessArgs): boolean {
  return !!session;
}

const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission: Permission) => [
    permission,
    function ({ session }: ListAccessArgs): boolean {
      return !!session?.data.role?.[permission];
    },
  ])
);

export const permissions = {
  ...generatedPermissions,
};

export const rules = {
  canManageProducts({ session }: ListAccessArgs) {
    // Does the current user have this permission?
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    // If not, do they own this item?
    return { user: { id: session.itemId } };
  },
  canReadProducts({ session }: ListAccessArgs) {
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    return { status: 'AVAILABLE' };
  },
};
