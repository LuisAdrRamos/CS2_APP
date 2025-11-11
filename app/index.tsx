// ARCHIVO: app/index.tsx
import { Redirect } from 'expo-router';

/**
 * Esta es la pantalla de entrada de la app (la ruta raíz "/").
 * * No muestra ninguna UI. Su único trabajo es redirigir
 * al usuario a la primera pantalla dentro de nuestro grupo (tabs).
 * * El layout raíz (app/_layout.tsx) ya tiene la lógica
 * para verificar si el usuario está autenticado o no,
 * así que solo necesitamos "empujarlo" a ese flujo.
 */
export default function Index() {

    // Redirigimos a cualquier pantalla válida dentro del grupo (tabs).
    // 'collectibles' es la que definimos como principal.
    return <Redirect href="/(tabs)/collectibles" />;
}