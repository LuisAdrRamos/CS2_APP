import { auth, db } from "@/firebaseConfig"; // Importamos nuestra config
import { User } from "@/src/domain/entities/User";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged as firebaseOnAuthStateChanged,
    User as FirebaseUser,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

/**
 * Esta clase habla directamente con Firebase (Auth y Firestore).
 * Es la implementación concreta de la obtención de datos.
 */
export class FirebaseAuthDataSource {

    /**
     * Mapea un objeto FirebaseUser (de la librería) a nuestra entidad User (del dominio).
     * Esto es clave para mantener el Dominio puro.
     */
    private mapFirebaseUserToUser(firebaseUser: FirebaseUser): User {
        return {
            id: firebaseUser.uid,
            email: firebaseUser.email || "",
            displayName: firebaseUser.displayName || "Usuario",
            createdAt: new Date(firebaseUser.metadata.creationTime || Date.now()),
        };
    }

    // ===== REGISTRO DE USUARIO =====
    async register(
        email: string,
        password: string,
        displayName: string
    ): Promise<User> {
        try {
            // 1. Crear usuario en Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const firebaseUser = userCredential.user;

            // 2. Actualizar perfil en Auth (displayName)
            await updateProfile(firebaseUser, {
                displayName,
            });

            // 3. Guardar datos adicionales en Firestore (colección 'users')
            await setDoc(doc(db, "users", firebaseUser.uid), {
                email,
                displayName,
                createdAt: new Date(),
            });

            // 4. Retornar nuestro User del dominio
            return {
                id: firebaseUser.uid,
                email,
                displayName,
                createdAt: new Date(),
            };
        } catch (error: any) {
            // Manejo de errores de Firebase
            if (error.code === "auth/email-already-in-use") {
                throw new Error("Este email ya está registrado");
            } else if (error.code === "auth/invalid-email") {
                throw new Error("Email inválido");
            } else if (error.code === "auth/weak-password") {
                throw new Error("La contraseña es muy débil");
            }
            throw new Error(error.message || "Error al registrar usuario");
        }
    }

    // ===== ACTUALIZAR PERFIL =====
    async updateProfile(id: string, displayName: string): Promise<User> {
        try {
            const firebaseUser = auth.currentUser;
            if (!firebaseUser) throw new Error("Usuario no autenticado");

            // 1. Actualizar en Firebase Auth
            await updateProfile(firebaseUser, { displayName });

            // 2. Actualizar en Firestore
            await updateDoc(doc(db, "users", id), { displayName });

            // 3. Devolver el usuario actualizado (mapeado)
            return this.mapFirebaseUserToUser(auth.currentUser!);

        } catch (error: any) {
            throw new Error(error.message || "Error al actualizar perfil");
        }
    }

    // ===== LOGIN =====
    async login(email: string, password: string): Promise<User> {
        try {
            // 1. Autenticar con Firebase Auth
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const firebaseUser = userCredential.user;

            // 2. Obtener datos adicionales de Firestore
            const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
            const userData = userDoc.data();

            // 3. Retornar usuario completo (combinando Auth y Firestore)
            return {
                id: firebaseUser.uid,
                email: firebaseUser.email || "",
                displayName: userData?.displayName || firebaseUser.displayName || "Usuario",
                createdAt: userData?.createdAt?.toDate() || new Date(firebaseUser.metadata.creationTime || Date.now()),
            };
        } catch (error: any) {
            if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
                throw new Error("Credenciales inválidas");
            }
            throw new Error(error.message || "Error al iniciar sesión");
        }
    }

    // ===== LOGOUT =====
    async logout(): Promise<void> {
        try {
            await signOut(auth);
        } catch (error: any) {
            throw new Error(error.message || "Error al cerrar sesión");
        }
    }

    // ===== OBTENER USUARIO ACTUAL =====
    async getCurrentUser(): Promise<User | null> {
        try {
            const firebaseUser = auth.currentUser;
            if (!firebaseUser) return null;
            return this.mapFirebaseUserToUser(firebaseUser);
        } catch (error) {
            console.error("Error getting current user:", error);
            return null;
        }
    }

    // ===== OBSERVAR CAMBIOS DE AUTENTICACIÓN =====
    onAuthStateChanged(callback: (user: User | null) => void): () => void {
        // Retorna la función de desuscripción
        return firebaseOnAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                // Si el usuario existe, lo mapeamos y lo enviamos al callback
                callback(this.mapFirebaseUserToUser(firebaseUser));
            } else {
                // Si no, enviamos null
                callback(null);
            }
        });
    }

    // ===== RECUPERAR CONTRASEÑA =====
    async forgotPassword(email: string): Promise<void> {
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (error: any) {
            if (error.code === "auth/user-not-found") {
                throw new Error("No existe un usuario registrado con ese email.");
            }
            throw new Error(error.message || "Error al enviar email de recuperación");
        }
    }
}