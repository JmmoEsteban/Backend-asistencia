import type { Programs } from "../../programs/infraestructure/entities/Programs";
import type { Subjects } from "../../subjects/infraestructure/entities/Subjects";

export interface Programs_subjects{
    id: number;
    id_programs: number;
    id_subjects: number;
    programs: Programs;
    subjects: Subjects;
    status: number;
}