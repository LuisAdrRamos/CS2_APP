// Importamos la interface Rarity que definimos en el otro archivo
import { Rarity } from "./Collectible";

/**
 * Entidad de Dominio: Agent
 * Representa a un agente del juego.
 */
export interface Agent {
    id: string;
    name: string;
    description: string;
    
    /**
     * CORRECIÓN:
     * Antes: rarity: string;
     * Ahora: rarity: Rarity | null;
     * Usamos la misma interface que Collectible.
     */
    rarity: Rarity | null;
    
    image: string;
}