import type { Programs } from "./Programs";

export interface ProgramsPort{
    createPrograms(programs: Omit<Programs, "id">): Promise<number>;
    updatePrograms(id_program: number, programs: Partial<Programs>): Promise<boolean>;
    //deletePrograms(id_program: number): Promise<boolean>;
    getProgramsById(id_program: number): Promise<Programs | null>;
    getProgramsByName(name_program: string): Promise<Programs[] | null>;
    getAllPrograms(): Promise<Programs[]>;
}