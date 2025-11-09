#!/bin/bash
#
# Script para inicializar la estructura de carpetas y archivos
# para el Deber 5 (CS:GO App) basado en Clean Architecture.

set -e

echo "🚀 Creando la estructura de carpetas de Clean Architecture..."

# 1. Crear todas las carpetas anidadas
mkdir -p src/domain/entities
mkdir -p src/domain/repositories
mkdir -p src/domain/usecases
mkdir -p src/data/datasources
mkdir -p src/data/repositories
mkdir -p src/di
mkdir -p src/presentation/hooks
mkdir -p app/\(tabs\)
mkdir -p app/collectibles

echo "✨ Creando archivos base..."

# 2. Crear archivos del Dominio (Domain)
touch src/domain/entities/User.ts
touch src/domain/entities/Agent.ts
touch src/domain/entities/Collectible.ts
touch src/domain/entities/Skin.ts

touch src/domain/repositories/AuthRepository.ts
touch src/domain/repositories/CsgoRepository.ts

touch src/domain/usecases/LoginUser.ts
touch src/domain/usecases/RegisterUser.ts
touch src/domain/usecases/LogoutUser.ts
touch src/domain/usecases/ForgotPassword.ts
touch src/domain/usecases/GetCurrentUser.ts
touch src/domain/usecases/UpdateProfile.ts
touch src/domain/usecases/GetAgents.ts
touch src/domain/usecases/GetCollectibles.ts
touch src/domain/usecases/GetCollectibleById.ts

# 3. Crear archivos de Datos (Data)
touch src/data/datasources/FirebaseAuthDataSource.ts
touch src/data/datasources/CsgoApiDataSource.ts

touch src/data/repositories/AuthRepositoryImpl.ts
touch src/data/repositories/CsgoRepositoryImpl.ts

# 4. Crear archivos de Inyección de Dependencias (DI)
touch src/di/container.ts

# 5. Crear archivos de Presentación (Presentation)
touch src/presentation/hooks/useAuth.ts
touch src/presentation/hooks/useAgents.ts
touch src/presentation/hooks/useCollectibles.ts

# 6. Crear archivos de Vistas (app - Expo Router)
touch app/_layout.tsx
touch app/\(tabs\)/_layout.tsx
touch app/\(tabs\)/login.tsx
touch app/\(tabs\)/register.tsx
touch app/\(tabs\)/forgotPassword.tsx
touch app/\(tabs\)/profile.tsx
touch app/\(tabs\)/agents.tsx
touch app/\(tabs\)/collectibles.tsx
touch app/collectibles/\[id\].tsx

echo "✅ ¡Estructura creada con éxito!"