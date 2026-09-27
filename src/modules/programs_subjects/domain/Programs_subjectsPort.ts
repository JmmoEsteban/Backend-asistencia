import type { Programs_subjects } from "./Programs_subjects";

export interface Programs_subjectsPort{
 
    getPrograms_subjectsById(id:number):Promise<Programs_subjects | null>;
    getPrograms_subjectsByPrograms(id:number):Promise<Programs_subjects[] | null>;
    getPrograms_subjectsBySubjects(id:number):Promise<Programs_subjects[] | null>;
    getAllPrograms_subjects(): Promise<Programs_subjects[]>;
}