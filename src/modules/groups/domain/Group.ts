import type { Program } from "../../programs/infraestructure/entities/Program";
import type { Programs } from "../../programs/infraestructure/entities/Programs";
import type { Promotion } from "../../promotions/infraestructure/entities/Promotion";
import type { Subjects } from "../../subjects/infraestructure/entities/Subjects";

export interface Group {
    id_group: number;
    access_code_group: string;
    id_subjects: number;
    id_promotion: number;
    id_programs: number;
    status_group: number;
    subjects: Subjects;
    promotion: Promotion;
    programs: Programs;


}
