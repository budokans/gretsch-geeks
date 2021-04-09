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
