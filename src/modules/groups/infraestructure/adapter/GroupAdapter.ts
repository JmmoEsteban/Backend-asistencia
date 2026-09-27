import type { Repository } from "typeorm";
import { Group as GroupEntity } from "../entities/Group";
import type { Group as GroupDomain } from "../../domain/Group";
import type { GroupPort } from "../../domain/GroupPort";
import { AppDataSource } from "../../../../shared/config/data-base";
import { Promotion } from "../../../promotions/infraestructure/entities/Promotion";

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
            id_subjects: group.Subjects.id_subject,
            id_promotions: group.Promotion.id_promotion,
            id_programs: group.Programs.id,
            status_group: group.status_group,
            subjects: group.Subjects,
            promotion: group.Promotion,
            programs: group.Programs,

        };
    }

    // Cambia el tipo de modelo de dominio a entidad para la base de datos
    private toEntity(group: Omit<GroupDomain, "id_group">): GroupEntity {
        const groupEntity = new GroupEntity();
        groupEntity.access_code_group = group.access_code_group;
        groupEntity.Subjects.id_subject = group.id_subjects;
        groupEntity.Promotion.id_promotion = group.id_promotions;
        groupEntity.Programs.id = group.id_programs;
        groupEntity.status_group = group.status_group;
        return groupEntity;
    }

    async createGroup(group: Omit<GroupDomain, "id_group">): Promise<number> {
        try {
            const newGroup = this.toEntity(group);
            const savedGroup = await this.groupRepository.save(newGroup);
            return savedGroup.id_group;
        } catch (error) {
            console.error("Error creando grupo", error);
            throw new Error("Error al crear grupo");
        }
    }

    async updateGroup(id: number, group: Partial<GroupDomain>): Promise<boolean> {
        try {
            const groupExists = await this.groupRepository.findOne({ where: { id_group: id } });
            if (!groupExists) return false;

            Object.assign(groupExists, {
                access_code_group: group.access_code_group ?? groupExists.access_code_group,
                id_subjects: group.id_subjects ?? groupExists.Subjects.id_subject,
                id_promotions: group.id_promotions ?? groupExists.Promotion.id_promotion,
                id_programs: group.id_programs ?? groupExists.Programs.id,
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
            const groupExists = await this.groupRepository.findOne({ where: { id_group: id } });
            if (!groupExists) return false;

            await this.groupRepository.remove(groupExists);
            return true;
        } catch (error) {
            console.error("Error al eliminar grupo", error);
            throw new Error("Error al eliminar grupo");
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
