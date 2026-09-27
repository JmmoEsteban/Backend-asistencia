import type { Program } from "../../programs/infraestructure/entities/Program";

export interface Promotion {
    id_promotion: number;
    name_promotion: string;
    id_programs: number;
    status_promotions: number;
    program?: Program;
}
