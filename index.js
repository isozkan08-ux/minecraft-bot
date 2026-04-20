const mineflayer = require('mineflayer');
const express = require('express');

const app = express();

// Web server (Render kapanmasın diye)
app.get('/', (req, res) => {
  res.send("Bot çalışıyor!");
});

app.listen(3000, () => {
  console.log("Web server aktif");
});

// Bot fonksiyonu (yeniden bağlanma için)
function createBot() {
  const bot = mineflayer.createBot({
    host: process.env.HOST,
    port: process.env.PORT_MC || 25565,
    username: process.env.USERNAME,
    version: false
  });

  bot.on('login', () => {
    console.log('Bot giriş yaptı!');
  });

  bot.on('spawn', () => {
    console.log('Sunucuda aktif!');
  });

  // AFK hareket
  setInterval(() => {
    bot.setControlState('jump', true);
    setTimeout(() => bot.setControlState('jump', false), 500);
  }, 30000);

  // Bağlantı koparsa yeniden bağlan
  bot.on('end', () => {
    console.log('Yeniden bağlanıyor...');
    setTimeout(createBot, 5000);
  });

  bot.on('error', err => console.log(err));
}

createBot();
