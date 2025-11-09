// ARCHIVO: src/presentation/hooks/useCollectibleDetail.ts
import { useState, useEffect, useCallback } from 'react';
import { Skin } from '@/src/domain/entities/Skin';
import { container } from '@/src/di/container';

export const useCollectibleDetail = (collectibleId: string) => {
    const [skins, setSkins] = useState<Skin[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadDetail = useCallback(async () => {
        if (!collectibleId) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            // Llama al caso de uso del contenedor
            const result = await container.getCollectibleById.execute(collectibleId);
            setSkins(result);
        } catch (err: any) {
            setError(err.message || 'Error al cargar el detalle');
        } finally {
            setLoading(false);
        }
    }, [collectibleId]);

    useEffect(() => {
        loadDetail();
    }, [loadDetail]);

    return {
        skins,
        loading,
        error,
        refreshDetail: loadDetail,
    };
};