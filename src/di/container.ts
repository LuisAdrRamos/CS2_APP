// ARCHIVO: src/di/container.ts
// MODIFICADO: Se registra el nuevo caso de uso GetSkins

// --- Importaciones de Autenticación ---
import { FirebaseAuthDataSource } from '../data/datasources/FirebaseAuthDataSource';
import { AuthRepositoryImpl } from '../data/repositories/AuthRepositoryImpl';
import { AuthRepository } from '../domain/repositories/AuthRepository';
import { RegisterUser } from '../domain/usecases/RegisterUser';
import { LoginUser } from '../domain/usecases/LoginUser';
import { LogoutUser } from '../domain/usecases/LogoutUser';
import { GetCurrentUser } from '../domain/usecases/GetCurrentUser';
import { UpdateProfile } from '../domain/usecases/UpdateProfile';
import { ForgotPassword } from '../domain/usecases/ForgotPassword';

// --- Importaciones de CS:GO ---
import { CsgoApiDataSource } from '../data/datasources/CsgoApiDataSource';
import { CsgoRepositoryImpl } from '../data/repositories/CsgoRepositoryImpl';
import { CsgoRepository } from '../domain/repositories/CsgoRepository';
import { GetAgents } from '../domain/usecases/GetAgents';
import { GetCollectibles } from '../domain/usecases/GetCollectibles';
// NUEVO
import { GetSkins } from '../domain/usecases/GetSkins';


class DIContainer {
    private static instance: DIContainer;

    // ... (Instancias de Auth) ...
    private _authDataSource?: FirebaseAuthDataSource;
    private _authRepository?: AuthRepository;
    private _registerUser?: RegisterUser;
    private _loginUser?: LoginUser;
    private _logoutUser?: LogoutUser;
    private _getCurrentUser?: GetCurrentUser;
    private _updateProfile?: UpdateProfile;
    private _forgotPassword?: ForgotPassword;

    // CS:GO
    private _csgoApiDataSource?: CsgoApiDataSource;
    private _csgoRepository?: CsgoRepository;
    private _getAgents?: GetAgents;
    private _getCollectibles?: GetCollectibles;
    private _getSkins?: GetSkins; // <-- NUEVO

    private constructor() { }

    static getInstance(): DIContainer {
        if (!DIContainer.instance) {
            DIContainer.instance = new DIContainer();
        }
        return DIContainer.instance;
    }

    // ... (Getters de Auth) ...
    get authDataSource(): FirebaseAuthDataSource {
        if (!this._authDataSource) { this._authDataSource = new FirebaseAuthDataSource(); }
        return this._authDataSource;
    }
    get authRepository(): AuthRepository {
        if (!this._authRepository) { this._authRepository = new AuthRepositoryImpl(this.authDataSource); }
        return this._authRepository;
    }
    get registerUser(): RegisterUser {
        if (!this._registerUser) { this._registerUser = new RegisterUser(this.authRepository); }
        return this._registerUser;
    }
    get updateProfile(): UpdateProfile {
        if (!this._updateProfile) { this._updateProfile = new UpdateProfile(this.authRepository); }
        return this._updateProfile;
    }
    get forgotPassword(): ForgotPassword {
        if (!this._forgotPassword) { this._forgotPassword = new ForgotPassword(this.authRepository); }
        return this._forgotPassword;
    }
    get loginUser(): LoginUser {
        if (!this._loginUser) { this._loginUser = new LoginUser(this.authRepository); }
        return this._loginUser;
    }
    get logoutUser(): LogoutUser {
        if (!this._logoutUser) { this._logoutUser = new LogoutUser(this.authRepository); }
        return this._logoutUser;
    }
    get getCurrentUser(): GetCurrentUser {
        if (!this._getCurrentUser) { this._getCurrentUser = new GetCurrentUser(this.authRepository); }
        return this._getCurrentUser;
    }

    // --- Getters para CS:GO ---
    get csgoApiDataSource(): CsgoApiDataSource {
        if (!this._csgoApiDataSource) { this._csgoApiDataSource = new CsgoApiDataSource(); }
        return this._csgoApiDataSource;
    }
    get csgoRepository(): CsgoRepository {
        if (!this._csgoRepository) { this._csgoRepository = new CsgoRepositoryImpl(this.csgoApiDataSource); }
        return this._csgoRepository;
    }
    get getAgents(): GetAgents {
        if (!this._getAgents) { this._getAgents = new GetAgents(this.csgoRepository); }
        return this._getAgents;
    }
    get getCollectibles(): GetCollectibles {
        if (!this._getCollectibles) { this._getCollectibles = new GetCollectibles(this.csgoRepository); }
        return this._getCollectibles;
    }
    
    // NUEVO
    get getSkins(): GetSkins {
        if (!this._getSkins) {
            this._getSkins = new GetSkins(this.csgoRepository);
        }
        return this._getSkins;
    }

    // ELIMINADO
    // get getCollectibleById(): GetCollectibleById { ... }
}
export const container = DIContainer.getInstance();