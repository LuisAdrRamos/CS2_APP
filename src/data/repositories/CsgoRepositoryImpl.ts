// ARCHIVO: src/data/repositories/CsgoRepositoryImpl.ts
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

    // Volvemos a implementar el método de detalle
    async getCollectibleById(id: string): Promise<Skin[]> {
        return this.dataSource.getCollectibleById(id);
    }
}