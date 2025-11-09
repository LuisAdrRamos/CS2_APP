import React, { useState } from 'react';
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
} from 'react-native';
import { useAuth } from '@/src/presentation/hooks/useAuth'; // Nuestro Hook
import { useRouter } from 'expo-router';

export default function ForgotPasswordScreen() {
    const [email, setEmail] = useState("");

    // 1. Obtenemos la función 'forgotPassword' del hook
    const { forgotPassword, loading, error } = useAuth();
    const router = useRouter();

    /**
     * Manejador para el botón de reseteo.
     */
    const handlePasswordReset = async () => {
        // 2. Llamamos a la función del hook
        const success = await forgotPassword(email);

        if (success) {
            // 3. Si tiene éxito, mostramos alerta y volvemos al login
            Alert.alert(
                "Email Enviado",
                "Si existe una cuenta con ese email, recibirás un enlace para recuperar tu contraseña.",
                [{ text: "OK", onPress: () => router.back() }] // Vuelve al login
            );
        } else {
            // 4. Si falla, mostramos el error
            Alert.alert("Error", error || "No se pudo enviar el email.");
        }
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
                    <Text style={styles.title}>Recuperar Contraseña</Text>
                    <Text style={styles.subtitle}>Ingresa tu email para recibir un enlace de recuperación.</Text>

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

                    <TouchableOpacity
                        style={[styles.button, loading && styles.buttonDisabled]}
                        onPress={handlePasswordReset}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Enviar Email</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.back()} style={styles.linkButton}>
                        <Text style={[styles.linkText, styles.linkTextBold]}>
                            Volver a Iniciar Sesión
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

// --- Estilos ---
// (Copiados de login.tsx)
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
        fontSize: 32, // Un poco más pequeño
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
        color: '#FFFFFF',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 40,
        textAlign: "center",
        color: "#BBBBBB",
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
        backgroundColor: "#007AFF",
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
        color: "#007AFF",
        fontWeight: 'bold',
    },
});