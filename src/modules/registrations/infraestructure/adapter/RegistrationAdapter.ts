import type { Repository } from "typeorm";
import type { Registration as RegistrationDomain} from "../../domain/Registration";
import type { RegistrationPort } from "../../domain/RegistrationPort";
import {Registration as RegistrationEntity} from "../entities/Registration"
import { AppDataSource } from "../../../../shared/config/data-base";
import { Group } from "../../../groups/infraestructure/entities/Group";

export class RegistrationAdapter implements RegistrationPort{

    private registrationRepository: Repository<RegistrationEntity>

    constructor(){
        this.registrationRepository = AppDataSource.getRepository(RegistrationEntity);
    }

    private toDomain(registration: RegistrationEntity): RegistrationDomain{
        return{
            id: registration.id_registrations,
            id_users: registration.User.id,
            id_groups: registration.Group.id_group,
            status: registration.status_registrations,
            Group: registration.Group,
            User: registration.User
        }
    }

    private toEntity(registration: Omit<RegistrationDomain, "id">):RegistrationEntity{
        const registrationEntity = new RegistrationEntity();
        registrationEntity.Group.id_group = registration.Group.id_group;
        registrationEntity.User.id = registration.User.id;
        registrationEntity.status_registrations = registration.status;
        registrationEntity.Group = registration.Group;
        registrationEntity.User = registration.User
        return registrationEntity;
    }

    async getRegistrationById(id: number): Promise<RegistrationDomain | null> {
        try {
            const user = await this.registrationRepository.findOne({where: {id_registrations : id}, relations: {Group:true, User:true} });
            return user ? this.toDomain(user) : null;
        } catch (error) {
            console.log("Error obteniendo inscripción por id", error)
            throw new Error("Error obteniendo inscripción ")
        }
    }

    async getRegistrationsByGroups(idGroups: number): Promise<RegistrationDomain[] | null> {
        try {
            const registration = await this.registrationRepository.find({ where: { Group:{id_group: idGroups}}, relations: {Group:true, User:true} });
            return registration.map(this.toDomain);
        } catch (error) {
            console.log("Error obteniendo inscripciones por grupos", error);
                throw new Error("Error obteniendo inscripciones por grupos");
        }
    }

    async getRegistrationsByUser(idUser: number): Promise<RegistrationDomain[] | null> {
        try {
            const registration = await this.registrationRepository.find({ where: {User:{id: idUser}}, relations: {Group:true, User:true} });
            return registration.map(this.toDomain);
        } catch (error) {
            console.log("Error obteniendo inscripciones por usuario", error);
                throw new Error("Error obteniendo inscripciones por usuario");
        }
    }

    async getAllRegistrations(): Promise<RegistrationDomain[]> {
        try {
            const registration = await this.registrationRepository.find({where : {status_registrations:1}, relations: {Group:true, User:true}});
            return registration.map(this.toDomain);
        } catch (error) {
            console.log("Error obteniendo usuarios", error)
            throw new Error("Error obteniendo lista de usuarios")
        }
    }

}