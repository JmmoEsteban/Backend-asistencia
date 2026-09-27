import type { Program } from "../../programs/infraestructure/entities/Program";
import type { Promotion } from "../../promotions/infraestructure/entities/Promotion";

export interface Group {
    id_group: number;
    access_code_group: string;
    id_subjects: number;
    id_promotions: number;
    id_programs: number;
    status_group: number;
    program?: Program;
    promotion?: Promotion;
}
