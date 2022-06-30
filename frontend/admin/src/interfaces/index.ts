export interface PolicyType {
  ID: string;
  Name: string;
  Kind: string;
  Permissions?: PermissionType[];
}

export interface UserType {
  _id: string;
  name: string;
  roles : string[];
  email: string;
}

export interface PermissionType {
  ID: string;
  Resource: string;
  Action: string;
  Policies?: PolicyType[];
}

export interface PermissionPolicyType {
  ID: string;
  PermissionId: string;
  PolicyId: string;
}

export interface RolePolicyType {
  ID: string;
  RoleId: string;
  PolcyId: string;
}

export interface RoleType {
  ID: string;
  Name: string;
  Policies?: PolicyType[];
}

export interface errorInterface {
  error: boolean;
  helperText: string;
  name: string;
}
