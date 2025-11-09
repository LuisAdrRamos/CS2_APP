// ARCHIVO: src/data/repositories/CsgoRepositoryImpl.ts
// MODIFICADO: Se implementa la nueva interfaz
import { Agent } from "@/src/domain/entities/Agent";
import { Collectible } from "@/src/domain/entities/Collectible";
import { Skin } from "@/src/domain/entities/Skin";
import { CsgoRepository } from "@/src/domain/repositories/CsgoRepository";
import { CsgoApiDataSource } from "../datasources/CsgoApiDataSource";

export class CsgoRepositoryImpl implements CsgoRepository {

    constructor(private dataSource: CsgoApiDataSource) { }

    async getAgents(): Promise<Agent[]> {
        return this.dataSource.getAgents();
    }

    async getCollectibles(): Promise<Collectible[]> {
        return this.dataSource.getCollectibles();
    }

    // NUEVO: Implementa el 3er endpoint
    async getSkins(): Promise<Skin[]> {
        return this.dataSource.getSkins();
    }

    // ELIMINADO
    // async getCollectibleById(id: string): Promise<Skin[]> { ... }
}