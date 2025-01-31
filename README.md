# WhatsApp Alert API  

Essa API permite o envio de mensagens personalizadas para contatos individuais ou grupos no WhatsApp usando a biblioteca `whatsapp-web.js`. Ela também inclui a funcionalidade de reconhecimento de eventos gerados por ferramentas como o Zabbix.  

---

## 📋 Funcionalidades  

- Enviar mensagens para um grupo do WhatsApp.  
- Enviar mensagens para um número de telefone individual.  
- Reconhecer eventos de monitoramento por meio de links enviados com as mensagens.  

---

## 🚀 Tecnologias Utilizadas  

- **Node.js**  
- **Express.js**  
- **whatsapp-web.js**  
- **Puppeteer**  
- **axios**  

---

## 📦 Instalação  

### Pré-requisitos  
- **Node.js** versão 14 ou superior.  
- **npm** ou **yarn** instalado.  
- Conta no WhatsApp para autenticação.  

### Passos  

1. Clone este repositório:  

   ```bash  
   git clone https://github.com/olavooferreira/api-zabbix-whats  
   cd api-zabbix-whats  
   ```  

2. Instale as dependências:  

   ```bash  
   npm install  
   ```  

3. Inicie o servidor:  

   ```bash  
   node index.js  
   ```  

4. Escaneie o QR code gerado no terminal com o aplicativo do WhatsApp.  

5. A API estará disponível em `http://localhost:3000`.  

---

## 🛠️ Endpoints  

### 1. Enviar Mensagem  

**POST** `/send-alert`  

**Descrição:** Envia uma mensagem para um grupo ou contato individual.  

**Parâmetros do corpo da requisição:**  
```json  
{  
  "message": "Mensagem de alerta",  
  "groupName": "Nome do grupo no WhatsApp",  
  "phoneNumber": "Número de telefone com DDI e DDD (opcional caso use o groupName)"  
}  
```  

**Resposta de sucesso:**  
```json  
{  
  "success": "Alert sent to group: Nome do Grupo"  
}  
```  

**Exemplo:**  
```bash  
curl -X POST http://localhost:3000/send-alert \  
-H "Content-Type: application/json" \  
-d '{  
    "message": "Alerta: CPU alta no servidor!",  
    "groupName": "Alertas Zabbix"  
}'  
```  
<!--
Ainda em fase de testes

### 2. Reconhecer Evento  

**GET** `/recognize-event/:eventId`  

**Descrição:** Marca um evento do Zabbix como reconhecido.  

**Parâmetros:**  
- `eventId`: ID do evento a ser reconhecido.  

**Resposta de sucesso:**  
```json  
{  
  "success": "Event ID 12345 recognized successfully."  
}  
```  
-->
---

## ⚙️ Configuração para o Zabbix  

### Tipo de Mídia  

1. No Zabbix, crie ou edite um tipo de mídia.  
2. Configure o URL do webhook como:  
   ```  
   http://<IP_DO_SERVIDOR>:3000/send-alert  
   ```  

### Parâmetros de Mensagem  

Use os seguintes parâmetros no template de mensagem do tipo de mídia:  
```text  
Mensagem:  
Trigger: {TRIGGER.NAME}  
Severidade: {TRIGGER.SEVERITY}  
Host: {HOST.NAME}  
ID do Evento: {EVENT.ID}  
Status: {TRIGGER.STATUS}  
```

**Link para reconhecimento:**  
```text  
http://<IP_DO_SERVIDOR>:3000/recognize-event/{EVENT.ID}  
```  

---

## 🛡️ Segurança  

- Mantenha o QR Code seguro durante a inicialização.  
- Considere usar HTTPS para proteger as solicitações.  
- Implemente autenticação para endpoints críticos.  

---

## 📝 Licença  

Este projeto está sob a licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.  

---

## 📧 Contato  

Desenvolvido por [Olavo Ferreira].  
- **E-mail:** olavooferreiras@gmail.com  
- **LinkedIn:** [Olavo Ferreira](https://www.linkedin.com/in/olavooferreira/)  
