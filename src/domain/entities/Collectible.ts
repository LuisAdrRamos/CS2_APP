/**
 * Objeto de Dominio: Rarity
 * Define la rareza de un item (Agente, Coleccionable, Skin).
 * (Lo definimos aquí mismo para ser claros)
 */
export interface Rarity {
    id: string;
    name: string;
    color: string;
}

/**
 * Entidad de Dominio: Collectible
 * Representa una "colección" o "caja" de items.
 */
export interface Collectible {
    id: string;
    name: string;
    description: string;
    
    /**
     * CORRECCIÓN:
     * Antes: rarity: string;
     * Ahora: rarity: Rarity | null;
     * La API puede no incluir la rareza, por eso usamos 'null'.
     */
    rarity: Rarity | null;
    
    type: string;
    image: string;
}