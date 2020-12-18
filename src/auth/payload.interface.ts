import { Role } from "src/utilisateurs/enums/role.enum";

export interface Payload {
    id : string;
    email: string;
    username: string;
    firstname: string;
    lastname: string;
    role: Role;
}