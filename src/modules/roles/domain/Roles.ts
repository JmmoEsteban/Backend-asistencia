export type RoleName = "administrativo" | "profesor" | "estudiante";

export class Roles {
  constructor(
    public id_role: number,
    public name_role: string
  ) {}
}