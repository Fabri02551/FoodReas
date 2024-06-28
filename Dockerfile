# Usar una imagen base de node
FROM node:14-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Listar los archivos para verificar que fueron copiados
RUN ls -al

# Instalar dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Compilar la aplicación de React
RUN npm run build

# Instalar el servidor estático para servir la aplicación
RUN npm install -g serve

# Exponer el puerto en el que correrá la aplicación
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["serve", "-s", "build", "-l", "5000"]