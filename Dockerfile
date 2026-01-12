# 1) Imagen base con Node (elige una LTS)
FROM node:20

# 2) Carpeta de trabajo dentro del contenedor
WORKDIR /app

# 3) Copiamos primero los package*.json para aprovechar cache
COPY package*.json ./

# 4) Instalamos dependencias
RUN npm install

# 5) Copiamos el resto del código
COPY . .

# 6) Build (si usas Nest con TypeScript)
RUN npm run build

# 7) Exponemos el puerto donde corre Nest
EXPOSE 3000

# 8) Comando para arrancar
CMD ["npm", "run", "start:prod"]

