import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { useAuth } from "@/src/presentation/hooks/useAuth"; // Nuestro Hook
import { useRouter } from "expo-router";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // 1. Obtenemos todo lo que necesitamos de nuestro hook de autenticación
    const { login, loading, error } = useAuth();
    const router = useRouter();

    /**
     * Manejador para el botón de Login.
     */
    const handleLogin = async () => {
        // 2. Llamamos a la función 'login' del hook
        const success = await login(email, password);

        if (success) {
            // 3. Si tiene éxito, Expo Router nos redirigirá (manejado en _layout.tsx)
            // Pero por si acaso, forzamos el reemplazo a la pantalla principal.
            // (Cambiaremos 'todos' por 'collectibles' o 'agents' luego)
            router.replace("/(tabs)/collectibles");
        } else {
            // 4. Si falla, mostramos el error que nos da el hook
            Alert.alert("Error de Login", error || "No se pudo iniciar sesión");
        }
    };

    // Navegadores
    const goToRegister = () => {
        // Usamos 'push' para que el usuario pueda volver
        router.push("/(tabs)/register");
    };

    const goToForgotPassword = () => {
        router.push("/(tabs)/forgotPassword");
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.content}>
                    <Text style={styles.title}>CS2 App</Text>
                    <Text style={styles.subtitle}>Iniciar Sesión</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholderTextColor="#999"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        placeholderTextColor="#999"
                    />

                    <TouchableOpacity
                        style={[styles.button, loading && styles.buttonDisabled]}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Entrar</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={goToForgotPassword} style={styles.linkButton}>
                        <Text style={styles.linkTextForgot}>
                            ¿Olvidaste tu contraseña?
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={goToRegister} style={styles.linkButton}>
                        <Text style={styles.linkText}>
                            ¿No tienes cuenta? <Text style={styles.linkTextBold}>Regístrate</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

// --- Estilos ---
// (Adaptados de tu todo-app para un look limpio y oscuro)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212", // Fondo oscuro
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 48,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
        color: "#FFFFFF", // Texto blanco
    },
    subtitle: {
        fontSize: 24,
        fontWeight: "600",
        marginBottom: 40,
        textAlign: "center",
        color: "#BBBBBB", // Texto gris claro
    },
    input: {
        backgroundColor: "#1E1E1E", // Input oscuro
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#333333", // Borde sutil
        color: "#FFFFFF", // Texto de input blanco
    },
    button: {
        backgroundColor: "#007AFF", // Azul brillante
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    buttonDisabled: {
        backgroundColor: "#555555", // Botón deshabilitado
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    linkButton: {
        marginTop: 20,
        padding: 10,
    },
    linkText: {
        color: "#AAAAAA", // Texto de link gris
        textAlign: "center",
        fontSize: 16,
    },
    linkTextBold: {
        color: "#007AFF", // Link en azul
        fontWeight: "bold",
    },
    linkTextForgot: {
        color: "#007AFF", // Link en azul
        textAlign: "center",
        fontSize: 15,
        fontWeight: '500',
    },
});