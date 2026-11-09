import type { Repository } from "typeorm";
import type { Programs as ProgramsDomain } from "../../domain/Programs";
import { Programs as ProgramsEntity } from "../entities/Programs";
import type { ProgramsPort } from "../../domain/ProgramsPort";
import { AppDataSource } from "../../../../shared/config/data-base";

export class ProgramsAdapter implements ProgramsPort{

    private programsRepository: Repository<ProgramsEntity>

    constructor(){
        this.programsRepository = AppDataSource.getRepository(ProgramsEntity);
    }

    private toDomain(programs: ProgramsEntity): ProgramsDomain{
        return{
            id: programs.id,
            name: programs.name,
        }
    }

    private toEntity(programs: Omit<ProgramsDomain, "id">): ProgramsEntity{
        const programsEntity = new ProgramsEntity();
        programsEntity.name = programs.name;
        return programsEntity;
    }

    async createPrograms(programs: Omit<ProgramsDomain, "id">): Promise<number> {
        try {
            const newPrograms = this.toEntity(programs);
            const savedPrograms = await this.programsRepository.save(newPrograms);
            return savedPrograms.id;
        } catch (error) {
            console.error("Error creando programa", error);
            throw new Error("Error al crear programa");
        }
    }
    async updatePrograms(id: number, programs: Partial<ProgramsDomain>): Promise<boolean> {
        try {
            const existPrograms = await this.programsRepository.findOne({ where: { id: id }});
            if (!existPrograms) return false;

            Object.assign(existPrograms, {
                name: programs.name ?? existPrograms.name,
            });

            await this.programsRepository.save(existPrograms);
            return true;

        } catch (error) {
            console.error("Error actualizando el programa");
            throw new Error("Error al actualizar el programa");
        }
    }
    // async deletePrograms(id: number): Promise<boolean> {
    //     try {
    //         const existPrograms = await this.programsRepository.findOne({where: {id: id}});
    //         if (!existPrograms) return false;
    //         Object.assign(existPrograms, {
    //             status_programs: 0
    //         })
    //         await this.programsRepository.save(existPrograms);
    //         return true;
    //     } catch (error) {
    //         console.error("Error al dar de baja el registro de programa");
    //         throw new Error("Error al dar de baja el programa");
    //     }
    // }
    async getProgramsById(id: number): Promise<ProgramsDomain | null> {
        try {
            const programs = await this.programsRepository.findOne({where: {id: id}});
            return programs ? this.toDomain(programs) : null;
        } catch (error) {
            console.error("Error obteniendo programa por ID");
            throw new Error("Error al obtener programa por ID");
        }
    }
    async getProgramsByName(name: string): Promise<ProgramsDomain[] | null> {
        try {
            const programs = await this.programsRepository.find({where: {name: name}});
            return programs ? programs.map(this.toDomain) : null;
        } catch (error) {
            console.error("error al obtener el programa por nombre", error);
            throw new Error("Error al obtener programa por nombre");
        }
    }
    async getAllPrograms(): Promise<ProgramsDomain[]> {
        try {
            const programs = await this.programsRepository.find();
            return programs.map(this.toDomain);
        } catch (error) {
            console.error("Error obteniendo todos los programas");
            throw new Error("Error al obtener todos los programas");
        }
    }

}