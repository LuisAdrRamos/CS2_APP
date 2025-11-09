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

export default function RegisterScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState(""); // Campo adicional

    // 1. Obtenemos la función 'register' de nuestro hook
    const { register, loading, error } = useAuth();
    const router = useRouter();

    /**
     * Manejador para el botón de Registro.
     */
    const handleRegister = async () => {
        // 2. Llamamos a la función 'register' del hook
        const success = await register(email, password, displayName);

        if (success) {
            // 3. Si tiene éxito, mostramos alerta y redirigimos
            Alert.alert(
                "¡Éxito!",
                "Tu cuenta ha sido creada.",
                [
                    { text: "OK", onPress: () => router.replace("/(tabs)/collectibles") } // Redirige a la home
                ]
            );
        } else {
            // 4. Si falla, mostramos el error
            Alert.alert("Error de Registro", error || "No se pudo crear la cuenta");
        }
    };

    // Navegador (para volver al login)
    const goToLogin = () => {
        router.back(); // Vuelve a la pantalla anterior (Login)
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
                    <Text style={styles.title}>Crear Cuenta</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Nombre de Usuario"
                        value={displayName}
                        onChangeText={setDisplayName}
                        placeholderTextColor="#999"
                    />

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
                        placeholder="Contraseña (mín. 6 caracteres)"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        placeholderTextColor="#999"
                    />

                    <TouchableOpacity
                        style={[styles.button, loading && styles.buttonDisabled]}
                        onPress={handleRegister}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Crear Cuenta</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={goToLogin} style={styles.linkButton}>
                        <Text style={styles.linkText}>
                            ¿Ya tienes cuenta? <Text style={styles.linkTextBold}>Inicia sesión</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

// --- Estilos ---
// (Usamos la misma base de login.tsx para consistencia)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 36, // Un poco más pequeño
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center",
        color: "#FFFFFF",
    },
    input: {
        backgroundColor: "#1E1E1E",
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#333333",
        color: "#FFFFFF",
    },
    button: {
        backgroundColor: "#34C759", // Verde para "Crear"
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    buttonDisabled: {
        backgroundColor: "#555555",
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
        color: "#AAAAAA",
        textAlign: "center",
        fontSize: 16,
    },
    linkTextBold: {
        color: "#007AFF", // Azul para el link
        fontWeight: "bold",
    },
});