export const UserRoles = {
  ADMIN: "admin",
  USER: "user",
}

export interface UserCreate {
  username: string;
  password: string;
  role: typeof UserRoles[keyof typeof UserRoles];
  name: string;
}

export interface UserInterface extends UserCreate {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}