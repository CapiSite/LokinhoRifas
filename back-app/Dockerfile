FROM node:20.11

# Define o diretório de trabalho dentro do contêiner
WORKDIR /src/usr/LokinhoRifas

# Copia todos os arquivos para dentro do contêiner
COPY . .

# Exponha a porta 5000
EXPOSE 5000

# Instala as dependências do projeto
RUN npm install

# Constrói a aplicação
RUN npm run build

# Cria o diretório uploads dentro de dist
RUN mkdir -p dist/uploads

# Comando para iniciar a aplicação
CMD ["npm", "start"]
