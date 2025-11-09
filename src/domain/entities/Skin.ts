// Importamos la interface Rarity
import { Rarity } from "./Collectible";

/**
 * Entidad de Dominio: Skin
 * Representa un item (skin, sticker, etc.) que se encuentra
 * DENTRO de una colección.
 */
export interface Skin {
    id: string;
    name: string;
    description: string;

    /**
     * CORRECIÓN:
     * Antes: rarity: string;
     * Ahora: rarity: Rarity | null;
     * Usamos la misma interface que Collectible y Agent.
     */
    rarity: Rarity | null;

    image: string;

    // Propiedades específicas de skins
    weapon?: string;
    pattern?: string;
    min_float?: number;
    max_float?: number;
}