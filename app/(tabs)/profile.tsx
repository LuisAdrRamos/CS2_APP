import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
// 1. Importamos el hook de autenticación
import { useAuth } from '@/src/presentation/hooks/useAuth';
// 2. Importamos los estilos globales
import { theme, styles } from '@/src/presentation/styles/globalStyles';

/**
 * Pantalla de Perfil.
 * Permite al usuario ver su email, cambiar su nombre y cerrar sesión.
 */
export default function ProfileScreen() {
    // 3. Obtenemos todo lo necesario del hook useAuth
    const { user, loading, logout, updateProfile, error } = useAuth();
    const router = useRouter();

    // 4. Estado local para el campo de texto del nombre
    const [displayName, setDisplayName] = useState(user?.displayName || '');

    // Sincroniza el estado local si el 'user' del hook cambia
    useEffect(() => {
        if (user?.displayName) {
            setDisplayName(user.displayName);
        }
    }, [user]);

    // 5. Manejador para guardar el perfil
    const handleSave = async () => {
        if (!displayName.trim()) {
            Alert.alert('Error', 'El nombre no puede estar vacío.');
            return;
        }

        // Llamamos a la función del hook
        const success = await updateProfile(displayName.trim());
        if (success) {
            Alert.alert('Éxito', 'Tu nombre ha sido actualizado.');
        } else {
            Alert.alert('Error', error || 'No se pudo actualizar el perfil.');
        }
    };

    // 6. Manejador para cerrar sesión
    const handleLogout = async () => {
        Alert.alert(
            "Cerrar Sesión",
            "¿Estás seguro de que deseas cerrar sesión?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Cerrar Sesión",
                    style: "destructive",
                    onPress: async () => {
                        await logout();
                        // El _layout.tsx se encargará de redirigir al login
                    }
                }
            ]
        );
    };

    // Chequeo de si el botón de guardar debe estar deshabilitado
    const isSaveDisabled = loading || (displayName.trim() === user?.displayName);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: theme.background }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                style={styles.container}
                contentContainerStyle={{ paddingTop: 20 }}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.title}>Mi Perfil</Text>

                {/* Campo de Email (No editable) */}
                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={[styles.input, styles.disabledInput]}
                        value={user?.email || ''}
                        editable={false}
                        selectTextOnFocus={false}
                        placeholderTextColor={theme.textSecondary}
                    />
                </View>

                {/* Campo de Nombre (Editable) */}
                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.label}>Nombre de Usuario</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre de usuario"
                        value={displayName}
                        onChangeText={setDisplayName}
                        placeholderTextColor={theme.textSecondary}
                        autoCapitalize="words"
                    />
                </View>

                {/* Botón Guardar */}
                <TouchableOpacity
                    style={[
                        styles.button,
                        styles.saveButton,
                        isSaveDisabled && styles.buttonDisabled
                    ]}
                    onPress={handleSave}
                    disabled={isSaveDisabled}
                >
                    {loading ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <Text style={styles.buttonText}>Guardar Cambios</Text>
                    )}
                </TouchableOpacity>

                {/* Botón Cerrar Sesión */}
                <TouchableOpacity
                    style={[styles.button, styles.logoutButton]}
                    onPress={handleLogout}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>Cerrar Sesión</Text>
                </TouchableOpacity>

            </ScrollView>
        </KeyboardAvoidingView>
    );
}