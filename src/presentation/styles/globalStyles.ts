import { StyleSheet } from 'react-native';

// 1. Definimos la paleta de colores para el tema oscuro
export const theme = {
    background: '#1c1c1c', // Fondo principal (casi negro)
    card: '#161B22',       // Fondo de las tarjetas
    text: '#C9D1D9',       // Texto principal (blanco-gris)
    textSecondary: '#8B949E', // Texto secundario (gris)
    primary: '#58A6FF',    // Azul primario (para botones, links)
    border: '#30363D',       // Color de bordes
    error: '#F85149',      // Rojo para errores
    success: '#34C759',    // Verde para éxito
};

// 2. Creamos los estilos globales
export const styles = StyleSheet.create({
    // --- Contenedores ---
    container: {
        flex: 1,
        backgroundColor: theme.background,
        padding: 10,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.background,
    },
    loadingText: {
        color: theme.textSecondary,
        marginTop: 10,
        fontSize: 16,
    },
    errorText: {
        color: theme.error,
        fontSize: 16,
        textAlign: 'center',
    },

    // --- Títulos ---
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: theme.text,
        marginBottom: 20,
        paddingHorizontal: 10,
    },

    // --- Estilos para Listas (FlatList) ---
    listContent: {
        paddingBottom: 20,
    },

    // --- Estilos para Tarjetas (Agentes, Coleccionables) ---
    card: {
        backgroundColor: theme.card,
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    cardImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        backgroundColor: theme.border,
        marginRight: 15,
    },
    cardContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.text,
        marginBottom: 5,
    },
    cardSubtitle: {
        fontSize: 14,
        color: theme.textSecondary,
    },
    cardRarity: {
        fontSize: 14,
        fontWeight: '600',
        marginTop: 5,
    },

    // Estilo para el input de perfil
    input: {
        backgroundColor: theme.card,
        color: theme.text,
        padding: 15,
        borderRadius: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: theme.border,
        marginBottom: 20,
    },
    // Input deshabilitado (para el email)
    disabledInput: {
        backgroundColor: '#22272E', // Un poco más oscuro
        color: theme.textSecondary,
    },
    // Etiqueta para los inputs
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.textSecondary,
        marginBottom: 10,
        paddingLeft: 5,
    },
    // Botón genérico
    button: {
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 15,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    // Botón de Guardar (verde)
    saveButton: {
        backgroundColor: theme.success,
    },
    // Botón de Logout (rojo)
    logoutButton: {
        backgroundColor: theme.error,
    },
    // Botón deshabilitado
    buttonDisabled: {
        backgroundColor: theme.border,
    },
});