# Usar a imagem oficial do Node.js
FROM node:18

# Criar o diretório de trabalho dentro do container
WORKDIR /app

# Copiar o package.json e package-lock.json (se existir)
COPY package*.json ./

# Instalar dependências do projeto, incluindo pm2 globalmente
RUN npm install
RUN npm install pm2 -g
RUN npm install qrcode-terminal

# Instalar as dependências necessárias para o Puppeteer
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    ca-certificates \
    libnss3 \
    libatk-bridge2.0-0 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \
    libpango-1.0-0 \
    libcups2 \
    libxshmfence1 \
    libasound2 \
    libxtst6 \
    libnss3 \
    libgdk-pixbuf2.0-0 \
    libpangocairo-1.0-0 \
    libgtk-3-0 \
    libgconf-2-4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \
    libpango-1.0-0 \
    libcups2 \
    libxshmfence1 \
    libasound2 \
    libxtst6 \
    libgdk-pixbuf2.0-0 \
    libpangocairo-1.0-0 \
    libgtk-3-0 \
    libgconf-2-4


# Copiar o restante dos arquivos do projeto
COPY . .

# Expor a porta que a API usará
EXPOSE 3000

# Comando para iniciar o servidor com pm2
CMD ["pm2-runtime", "start", "whatsappweb.js"]
