const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const puppeteer = require('puppeteer-core');
const axios = require('axios');
const app = express();
app.use(express.json());

// Configurar o Puppeteer com as opções corretas
const puppeteerOptions = {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  };
  
  // Criar uma instância do cliente WhatsApp com a configuração do Puppeteer
  const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: puppeteerOptions,
  });  

//const client = new Client({
//  authStrategy: new LocalAuth(),
//});

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('WhatsApp Client is ready!');
});

// Enviar alertas para contato individual ou grupo
app.post('/send-alert', async (req, res) => {
  const { message, phoneNumber, groupName } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    if (groupName) {
      // Enviar para grupo
      const chats = await client.getChats();
      const group = chats.find(chat => chat.isGroup && chat.name === groupName);

      if (group) {
        await client.sendMessage(group.id._serialized, message);
        res.status(200).json({ success: `Alert sent to group: ${groupName}` });
      } else {
        res.status(404).json({ error: `Group ${groupName} not found` });
      }
    } else if (phoneNumber) {
      // Enviar para contato individual
      await client.sendMessage(`${phoneNumber}@c.us`, message);
      res.status(200).json({ success: `Alert sent to ${phoneNumber}` });
    } else {
      res.status(400).json({ error: 'phoneNumber or groupName is required' });
    }
  } catch (error) {
    console.error('Failed to send alert:', error);
    res.status(500).json({ error: 'Failed to send alert via WhatsApp' });
  }
});

client.initialize();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
