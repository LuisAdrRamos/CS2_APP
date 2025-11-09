// Importa las funciones que necesitas de los SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
    initializeAuth,
    // @ts-ignore 
    getReactNativePersistence
} from 'firebase/auth';
// Importa AsyncStorage para la persistencia de sesión nativa
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Reemplaza esto con la configuración de tu propio proyecto de Firebase
// (Obtenla desde la Consola de Firebase > Configuración del proyecto)
const firebaseConfig = {
    apiKey: "AIzaSyBWf98sBvdSLYUVzfylboVYQxPAE6aEiXI",
    authDomain: "cs2-app-28076.firebaseapp.com",
    projectId: "cs2-app-28076",
    storageBucket: "cs2-app-28076.firebasestorage.app",
    messagingSenderId: "139598380001",
    appId: "1:139598380001:web:12d1369e5a1019f74770a0"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
export const db = getFirestore(app);

// Inicializa Firebase Auth con persistencia nativa (clave para React Native)
// Esto asegura que el usuario siga logueado al cerrar y abrir la app
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { auth };