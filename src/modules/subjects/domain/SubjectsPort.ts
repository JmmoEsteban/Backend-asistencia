import type { Subjects } from "./Subjects";


export interface SubjectsPort{
    createSubjects(Programs: Omit<Subjects, "id">): Promise<number>;
    updateSubjects(id: number, programs: Partial<Subjects>): Promise<boolean>;
    deleteSubjects(id: number): Promise<boolean>;
    getSubjectsById(id: number): Promise<Subjects | null>;
    getSubjectsByName(name: string): Promise<Subjects| null>;
    getAllSubjects(): Promise<Subjects[]>;
}