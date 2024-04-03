const TelegramBot = require('node-telegram-bot-api');
const { exec } = require('child_process');

// Ganti dengan token bot Telegram Anda
const token = 'Done! Congratulations on your new bot. You will find it at t.me/erdisonbot. You can now add a description, about section and profile picture for your bot, see /help for a list of commands. By the way, when you've finished creating your cool bot, ping our Bot Support if you want a better username for it. Just make sure the bot is fully operational before you do this.

Use this token to access the HTTP API:
7069670027:AAGrM4SX8wAyoFmZpKQQo83qS3aANewmleI
Keep your token secure and store it safely, it can be used by anyone to control your bot.

For a description of the Bot API, see this page: https://core.telegram.org/bots/api';

// Inisialisasi bot dengan token
const bot = new TelegramBot(token, { polling: true });

// Fungsi untuk mencatat aktivitas penggunaan bot di console log
function logActivity(msg) {
  const user = msg.from;
  const chat = msg.chat;
  const command = msg.text.toLowerCase();

  console.log(`Aktivitas Penggunaan Bot Telegram`);
  console.log(`• User ID: ${user.id}`);
  console.log(`• Username: ${user.username || 'Tidak ada'}`);
  console.log(`• Chat ID: ${chat.id}`);
  console.log(`• Perintah: ${command}`);
}

// Event listener untuk pesan dari pengguna
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const command = msg.text.toLowerCase();

  // Mencatat aktivitas penggunaan bot di console log
  logActivity(msg);

  // Menanggapi perintah /mix
  if (command.startsWith('/mix')) {
    // Mengekstrak argumen dari pesan
    const args = command.split(' ');
    const url = args[1];
    const time = args[2];
    const thread = args[3];
    const rate = args[4];

    // Memeriksa apakah format pesan benar
    if (args.length === 5 && url && time && thread && rate) {
      // Menjalankan file mix.js dengan argumen yang diberikan
      exec(`node mix.js ${url} ${time} ${thread} ${rate}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          bot.sendMessage(chatId, 'Successful');
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          bot.sendMessage(chatId, 'Successful');
          return;
        }
        // Menampilkan output stdout jika berhasil
        console.log(`stdout: ${stdout}`);
        bot.sendMessage(chatId, 'Proses telah dimulai.');
      });
    } else {
      // Memberi tahu pengguna bahwa format pesan tidak benar
      bot.sendMessage(chatId, 'Format pesan tidak benar. Gunakan format: /mix [url] [time] [thread] [rate]');
    }
  }
});
