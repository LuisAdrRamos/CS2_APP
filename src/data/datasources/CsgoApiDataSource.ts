// ARCHIVO: src/data/datasources/CsgoApiDataSource.ts
// MODIFICADO: Se quitó la función del 404 y se añadió getSkins()
import axios from 'axios';
import { Skin } from '@/src/domain/entities/Skin';
import { Agent } from '@/src/domain/entities/Agent';
import { Collectible, Rarity } from '@/src/domain/entities/Collectible';

/**
 * --- CORRECCIÓN 404 (Definitiva) ---
 * La baseURL correcta es la del repositorio en raw.githubusercontent.com
 */
const apiClient = axios.create({
    baseURL: 'https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/es-ES/',
    timeout: 10000,
});

export class CsgoApiDataSource {

    private mapApiRarityToEntity(apiRarity: any): Rarity | null {
        if (!apiRarity) return null;
        return {
            id: apiRarity.id,
            name: apiRarity.name,
            color: apiRarity.color,
        };
    }

    /**
     * Endpoint 1: agents.json
     */
    async getAgents(): Promise<Agent[]> {
        try {
            const response = await apiClient.get('agents.json');
            if (Array.isArray(response.data)) {
                return response.data.map((agent: any): Agent => ({
                    id: agent.id,
                    name: agent.name,
                    description: agent.description || 'Sin descripción.',
                    rarity: this.mapApiRarityToEntity(agent.rarity),
                    image: agent.image,
                }));
            }
            throw new Error('La respuesta de /agents no fue un array');
        } catch (error: any) {
            console.error('[getAgents Error]', error.message);
            throw new Error('No se pudieron cargar los Agentes.');
        }
    }

    /**
     * Endpoint 2: crates.json (Cajas)
     */
    async getCollectibles(): Promise<Collectible[]> {
        try {
            // Llamamos a 'crates.json' (Cajas)
            const response = await apiClient.get('crates.json');
            if (Array.isArray(response.data)) {
                // Lo mapeamos a nuestra entidad 'Collectible'
                return response.data.map((item: any): Collectible => ({
                    id: item.id,
                    name: item.name,
                    description: item.description || 'Sin descripción.',
                    rarity: this.mapApiRarityToEntity(item.rarity),
                    type: item.type,
                    image: item.image,
                }));
            }
            throw new Error('La respuesta de /crates no fue un array');
        } catch (error: any) {
            console.error('[getCollectibles Error]', error.message);
            throw new Error('No se pudieron cargar las Cajas.');
        }
    }

    /**
     * Endpoint 3: skins.json (NUEVO)
     */
    async getSkins(): Promise<Skin[]> {
        try {
            const response = await apiClient.get('skins.json');
            if (Array.isArray(response.data)) {
                return response.data.map((item: any): Skin => ({
                    id: item.id,
                    name: item.name,
                    description: item.description || 'Sin descripción.',
                    rarity: this.mapApiRarityToEntity(item.rarity),
                    image: item.image,
                    weapon: item.weapon?.name,
                    pattern: item.pattern?.name,
                    min_float: item.min_float,
                    max_float: item.max_float,
                }));
            }
            throw new Error('La respuesta de /skins no fue un array');
        } catch (error: any) {
            console.error('[getSkins Error]', error.message);
            throw new Error('No se pudieron cargar las Skins.');
        }
    }
}