import type { Repository } from "typeorm";
import { Group as GroupEntity } from "../entities/Group";
import type { Group as GroupDomain } from "../../domain/Group";
import type { GroupPort } from "../../domain/GroupPort";
import { AppDataSource } from "../../../../shared/config/data-base";

export class GroupAdapter implements GroupPort {

    private groupRepository: Repository<GroupEntity>;

    constructor(){
        this.groupRepository = AppDataSource.getRepository(GroupEntity);
    }

    // Cambia el tipo de la entidad infraestuctura al modelo de dominio
    private toDomain(group: GroupEntity): GroupDomain {
        return {
            group_id: group.group_id,
            group_acces_code: group.group_acces_code,
            id_subjects: group.id_subjects,
            id_promotion: group.id_promotion,
            id_programs: group.id_programs,
        };
    }

    // Cambia el tipo de modelo de dominio a entidad para la base de datos
    private toEntity(group: Omit<GroupDomain, "group_id">): GroupEntity {
        const groupEntity = new GroupEntity();
        groupEntity.group_acces_code = group.group_acces_code;
        groupEntity.id_subjects = group.id_subjects;
        groupEntity.id_promotion = group.id_promotion;
        groupEntity.id_programs = group.id_programs;
        return groupEntity;
    }

    async createGroup(group: Omit<GroupDomain, "group_id">): Promise<number> {
        try {
            const newGroup = this.toEntity(group);
            const savedGroup = await this.groupRepository.save(newGroup);
            return savedGroup.group_id;
        } catch (error) {
            console.error("Error creando grupo", error);
            throw new Error("Error al crear grupo");
        }
    }

    async updateGroup(id: number, group: Partial<GroupDomain>): Promise<boolean> {
        try {
            const groupExists = await this.groupRepository.findOne({ where: { group_id: id } });
            if (!groupExists) return false;

            Object.assign(groupExists, {
                group_acces_code: group.group_acces_code ?? groupExists.group_acces_code,
                id_subjects: group.id_subjects ?? groupExists.id_subjects,
                id_promotion: group.id_promotion ?? groupExists.id_promotion,
                id_programs: group.id_programs ?? groupExists.id_programs,
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
            const groupExists = await this.groupRepository.findOne({ where: { group_id: id } });
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
            const group = await this.groupRepository.findOne({ where: { group_id: id } });
            return group ? this.toDomain(group) : null;
        } catch (error) {
            console.error("Error obteniendo grupo por ID", error);
            throw new Error("Error al obtener grupo por ID");
        }
    }

    async getAllGroups(): Promise<GroupDomain[]> {
        try {
            const groups = await this.groupRepository.find();
            return groups.map((g) => this.toDomain(g));
        } catch (error) {
            console.error("Error obteniendo todos los grupos", error);
            throw new Error("Error al obtener todos los grupos");
        }
    }
}
