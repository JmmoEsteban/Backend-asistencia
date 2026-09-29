import type { Repository } from "typeorm";
import { Group as GroupEntity } from "../entities/Group";
import type { Group as GroupDomain } from "../../domain/Group";
import type { GroupPort } from "../../domain/GroupPort";
import { AppDataSource } from "../../../../shared/config/data-base";
import { Promotion } from "../../../promotions/infraestructure/entities/Promotion";
import type { Subjects } from "../../../subjects/infraestructure/entities/Subjects";
import type { Programs } from "../../../programs/infraestructure/entities/Programs";

export class GroupAdapter implements GroupPort {

    private groupRepository: Repository<GroupEntity>;

    constructor(){
        this.groupRepository = AppDataSource.getRepository(GroupEntity);
    }

    // Cambia el tipo de la entidad infraestuctura al modelo de dominio
    private toDomain(group: GroupEntity): GroupDomain {
        return {
            id_group: group.id_group,
            access_code_group: group.access_code_group,
            id_subjects: group.Subjects.id_subjects,
            id_promotion: group.Promotion.id_promotion,
            id_programs: group.Programs.id,
            status_group: group.status_group,
            subjects: group.Subjects,
            promotion: group.Promotion,
            programs: group.Programs,

        };
    }

    // Cambia el tipo de modelo de dominio a entidad para la base de datos
    private toEntity(group: Omit<GroupDomain, "id_group" | "subjects" | "programs" | "promotion">): GroupEntity {
        const groupEntity = new GroupEntity();
        groupEntity.access_code_group = group.access_code_group;
        groupEntity.Subjects = {id_subjects:group.id_subjects} as Subjects;
        groupEntity.Promotion = {id_promotion:group.id_promotion} as Promotion;
        groupEntity.Programs = {id:group.id_programs} as Programs;
        groupEntity.status_group = group.status_group;
        return groupEntity;
    }

    async createGroup(group: Omit<GroupDomain, "id_group" | "subjects" | "programs" | "promotion">): Promise<number> {
        try {
            const newGroup = this.toEntity(group);
            const savedGroup = await this.groupRepository.save(newGroup);
            return savedGroup.id_group;
        } catch (error) {
            console.error("Error creando grupo", error);
            throw new Error("Error al crear grupo");
        }
    }

    async updateGroup(id: number, group: Partial<Omit<GroupDomain, "subjects" | "programs" | "promotion">>): Promise<boolean> {
        try {
            const groupExists = await this.groupRepository.findOne({ where: { id_group: id } });
            if (!groupExists) return false;

            Object.assign(groupExists, {
                access_code_group: group.access_code_group ?? groupExists.access_code_group,
                Subjects: group.id_subjects ? {id_subjects: group.id_subjects} as Subjects : groupExists.Subjects,
                Promotion: group.id_promotion ? {id_promotion: group.id_promotion} as Promotion : groupExists.Promotion,
                Programs: group.id_programs ? {id: group.id_programs} as Programs : groupExists.Programs,
                status_group: group.status_group ?? groupExists.status_group,
            });

            await this.groupRepository.save(groupExists);
            return true;
        } catch (error) {
            console.error("Error actualizando grupo", error);
            throw new Error("Error al actualizar grupo");
        }
    }

    async deleteGroup(id: number): Promise<boolean> {
        try {
            const existGroup = await this.groupRepository.findOne({where: {id_group: id}});
            if (!existGroup) return false;
            Object.assign(existGroup, {
                status_group: 0
            })
            await this.groupRepository.save(existGroup);
            return true;
        } catch (error) {
            console.error("Error al dar de baja el registro de asistencia");
            throw new Error("Error al dar de baja la asistencia");
        }
    }

    async getByIdGroup(id: number): Promise<GroupDomain | null> {
        try {
            const group = await this.groupRepository.findOne({ where: { id_group: id }, relations: {Subjects: true, Promotion: true, Programs: true}});
            return group ? this.toDomain(group) : null;
        } catch (error) {
            console.error("Error obteniendo grupo por ID", error);
            throw new Error("Error al obtener grupo por ID");
        }
    }

    async getByIdProgram(ProgramId: number): Promise<GroupDomain[]> {
        try {
            const group = await this.groupRepository.find({ where: { Programs: {id:ProgramId}}, relations: {Subjects: true, Promotion: true, Programs: true}});
            return group.map(group=>this.toDomain(group));
        } catch (error) {
            console.error("Error obteniendo los grupos del programa", error);
            throw new Error("Error al obtener los grupos del programa");
        }
    }

    async getByIdPromotion(PromotionId: number): Promise<GroupDomain[]> {
        try {
            const group = await this.groupRepository.find({ where: { Promotion: {id_promotion:PromotionId}}, relations: {Subjects: true, Promotion: true, Programs: true}});
            return group.map(group=>this.toDomain(group));
        } catch (error) {
            console.error("Error obteniendo grupos por promocion", error);
            throw new Error("Error al obtener grupos por promocion");
        }
    }

    async getByIdSubject(SubjectId: number): Promise<GroupDomain[]> {
        try {
            const group = await this.groupRepository.find({ where: { Subjects: {id_subjects:SubjectId}}, relations: {Subjects: true, Promotion: true, Programs: true}});
            return group.map(group=>this.toDomain(group));
        } catch (error) {
            console.error("Error obteniendo grupos por materias", error);
            throw new Error("Error al obtener grupos por masterias");
        }
    }

    async getAllGroups(): Promise<GroupDomain[]> {
        try {
            const groups = await this.groupRepository.find({where: {status_group : 1}, relations: {Subjects: true, Promotion: true, Programs: true}});
            return groups.map(this.toDomain);
        } catch (error) {
            console.error("Error obteniendo todos los grupos", error);
            throw new Error("Error al obtener todos los grupos");
        }
    }
}
