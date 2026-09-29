import type { Repository } from "typeorm";
import type { Programs_subjects as Programs_subjectsDomain} from "../../domain/Programs_subjects";
import type { Programs_subjectsPort } from "../../domain/Programs_subjectsPort";
import { Programs_subjects as Programs_subjectsEntity} from "../entities/Programs_subjects"
import { AppDataSource } from "../../../../shared/config/data-base";
import { Subjects } from "../../../subjects/infraestructure/entities/Subjects";
import { Programs } from "../../../programs/infraestructure/entities/Programs";
export class Programs_subjectsAdapter implements Programs_subjectsPort{

    private programs_subjectsRepository: Repository<Programs_subjectsEntity>

    constructor(){
        this.programs_subjectsRepository = AppDataSource.getRepository(Programs_subjectsEntity);
    }

    private toDomain(programs_subjects: Programs_subjectsEntity): Programs_subjectsDomain{
        return{
            id: programs_subjects.id_programs_subjects,
            id_programs: programs_subjects.Programs.id,
            id_subjects: programs_subjects.Subjects.id_subjects,
            programs: programs_subjects.Programs,
            subjects: programs_subjects.Subjects,
            status: programs_subjects.status_programs_subject
        }
    }

    private toEntity(programs_subjects: Omit<Programs_subjectsDomain, "id">):Programs_subjectsEntity{
        const programs_subjectsEntity = new Programs_subjectsEntity();
        programs_subjectsEntity.Programs.id = programs_subjects.id_programs;
        programs_subjectsEntity.Subjects.id_subjects = programs_subjects.id_subjects;
        programs_subjectsEntity.status_programs_subject = programs_subjects.status;
        return programs_subjectsEntity;
    }

    async getPrograms_subjectsById(id: number): Promise<Programs_subjectsDomain | null> {
        try {
            const user = await this.programs_subjectsRepository.findOne({where: {id_programs_subjects : id}, relations: {Programs:true, Subjects:true}});
            return user ? this.toDomain(user) : null;
        } catch (error) {
            console.log("Error obteniendo programas y materias por id", error)
            throw new Error("Error obteniendo programas y materias ")
        }
    }

    async getPrograms_subjectsByPrograms(id_programs: number): Promise<Programs_subjectsDomain[] | null> {
        try {
            const programs_subjects = await this.programs_subjectsRepository.find({ where: { Programs:{id:id_programs}}, relations: {Programs:true}});
            return programs_subjects.map(this.toDomain);
        } catch (error) {
            console.log("Error obteniendo materias por programas", error);
                throw new Error("Error obteniendo materias por programas");
        }
    }

    async getPrograms_subjectsBySubjects(id_subjects: number): Promise<Programs_subjectsDomain[] | null> {
        try {
            const programs_subjects = await this.programs_subjectsRepository.find({ where: {Subjects:{id_subjects:id_subjects}}, relations: {Subjects:true} });
            return programs_subjects.map(this.toDomain);
        } catch (error) {
            console.log("Error obteniendo inscripciones por usuario", error);
                throw new Error("Error obteniendo inscripciones por usuario");
        }
    }

    async getAllPrograms_subjects(): Promise<Programs_subjectsDomain[]> {
        try {
            const programs_subjects = await this.programs_subjectsRepository.find({where: {status_programs_subject: 1}, relations: {Programs:true, Subjects:true}});
            return programs_subjects.map(this.toDomain);
        } catch (error) {
            console.log("Error obteniendo usuarios", error)
            throw new Error("Error obteniendo lista de usuarios")
        }
    }

}