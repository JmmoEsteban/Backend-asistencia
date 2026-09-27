import type { Repository } from "typeorm";
import type { Subjects as SubjectsDomain } from "../../domain/Subjects";
import { Subjects as SubjectsEntity } from "../entities/Subjects";
import type { SubjectsPort } from "../../domain/SubjectsPort";
import { AppDataSource } from "../../../../shared/config/data-base";
import { string } from "joi";
//import { object } from "joi";

export class SubjectsAdapter implements SubjectsPort{

    private subjectsRepository: Repository<SubjectsEntity>

    constructor(){
        this.subjectsRepository = AppDataSource.getRepository(SubjectsEntity);
    }

    private toDomain(subjects: SubjectsEntity): SubjectsDomain{
        return{
            id: subjects.id_subjects,
            name: subjects.name_subjects,
            status: subjects.status_subjects
        }
    }

    private toEntity(subjects: Omit<SubjectsDomain, "id">): SubjectsEntity{
        const subjectsEntity = new SubjectsEntity();
        subjectsEntity.name_subjects = subjects.name;
        subjectsEntity.status_subjects = subjects.status;
        return subjectsEntity;
    }

    async createSubjects(subjects: Omit<SubjectsDomain, "id">): Promise<number> {
        try {
            const newSubjects = this.toEntity(subjects);
            const savedSubjects = await this.subjectsRepository.save(newSubjects);
            return savedSubjects.id_subjects;
        } catch (error) {
            console.error("Error creando materia", error);
            throw new Error("Error al crear materia");
        }
    }
    async updateSubjects(id: number, subjects: Partial<SubjectsDomain>): Promise<boolean> {
        try {
            const existSubjects = await this.subjectsRepository.findOne({ where: { id_subjects: id }});
            if (!existSubjects) return false;

            Object.assign(existSubjects, {
                name_subjects: subjects.name ?? existSubjects.name_subjects,
                status_subjects: subjects.status ?? existSubjects.status_subjects
            });

            await this.subjectsRepository.save(existSubjects);
            return true;

        } catch (error) {
            console.error("Error actualizando la materia");
            throw new Error("Error al actualizar la materia");
        }
    }
    async deleteSubjects(id: number): Promise<boolean> {
        try {
            const existSubjects = await this.subjectsRepository.findOne({where: {id_subjects: id}});
            if (!existSubjects) return false;
            Object.assign(existSubjects, {
                status_subjects: 0
            })
            await this.subjectsRepository.save(existSubjects);
            return true;
        } catch (error) {
            console.error("Error al dar de baja el registro de materia");
            throw new Error("Error al dar de baja la materia");
        }
    }
    async getSubjectsById(id: number): Promise<SubjectsDomain | null> {
        try {
            const subjects = await this.subjectsRepository.findOne({where: {id_subjects: id}});
            return subjects ? this.toDomain(subjects) : null;
        } catch (error) {
            console.error("Error obteniendo materia por ID");
            throw new Error("Error al obtener materia por ID");
        }
    }
    async getSubjectsByName(name: string): Promise<SubjectsDomain[] | null> {
        try {
            const subjects = await this.subjectsRepository.find({where: {name_subjects: name}});
            return subjects ? subjects.map(this.toDomain) : null;
        } catch (error) {
            console.error("Error obteniendo materias por nombre");
            throw new Error("Error al obtener materia por nombre");
        }
    }
    async getAllSubjects(): Promise<SubjectsDomain[]> {
        try {
            const subjects = await this.subjectsRepository.find({where: {status_subjects: 1}});
            return subjects.map(this.toDomain);
        } catch (error) {
            console.error("Error obteniendo todos las materias");
            throw new Error("Error al obtener todos las materias");
        }
    }

}