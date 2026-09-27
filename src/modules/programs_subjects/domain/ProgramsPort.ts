import type { Programs } from "./Programs";

export interface ProgramsPort{
    createPrograms(Programs: Omit<Programs, "id">): Promise<number>;
    updatePrograms(id: number, programs: Partial<Programs>): Promise<boolean>;
    deletePrograms(id: number): Promise<boolean>;
    getProgramsById(id: number): Promise<Programs | null>;
    getProgramsByName(name: string): Promise<Programs[] | null>;
    getAllPrograms(): Promise<Programs[]>;
}