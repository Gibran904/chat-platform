const chatBox = document.getElementById('chatBox');
const chatInput = document.getElementById('chatInput');
const usernameModal = document.getElementById('usernameModal');
const usernameInput = document.getElementById('usernameInput');
let theme = localStorage.getItem('chat_theme') || 'light';

let username = localStorage.getItem('chat_username');
let messages = JSON.parse(localStorage.getItem('chat_messages') || '[]');

document.body.dataset.theme = theme;

if (!username) {
  usernameModal.style.display = 'flex';
} else {
  renderMessages();
}

function setUsername() {
  const input = usernameInput.value.trim();
  if (input) {
    username = input;
    localStorage.setItem('chat_username', username);
    usernameModal.style.display = 'none';
    renderMessages();
  }
}

function sendMessage() {
  const content = chatInput.value.trim();
  if (content) {
    const msg = {
      user: username,
      content,
      time: new Date().toLocaleTimeString()
    };
    messages.push(msg);
    localStorage.setItem('chat_messages', JSON.stringify(messages));
    chatInput.value = '';
    renderMessages();
    setTimeout(autoReply, 500);
  }
}

function autoReply() {
  const msg = {
    user: 'AI-Bot',
    content: getRandomReply(),
    time: new Date().toLocaleTimeString()
  };
  messages.push(msg);
  localStorage.setItem('chat_messages', JSON.stringify(messages));
  renderMessages();
}

function getRandomReply() {
  const replies = [
    'Oke noted!',
    'Seriusan? 😲',
    'Gua ngerti kok 👍',
    'Wkwkwk 😆',
    'Lanjut gan~',
    'Betul sekali!',
    'Hmm menarik...'
  ];
  return replies[Math.floor(Math.random() * replies.length)];
}

function renderMessages() {
  chatBox.innerHTML = '';
  messages.forEach(msg => {
    const div = document.createElement('div');
    div.className = 'chat-message' + (msg.user === username ? ' self' : '');
    div.innerHTML = <strong>${msg.user}</strong>: ${msg.content}<br><small>${msg.time}</small>;
    chatBox.appendChild(div);
  });
  chatBox.scrollTop = chatBox.scrollHeight;
}

function clearChat() {
  if (confirm('Yakin mau hapus semua pesan?')) {
    messages = [];
    localStorage.removeItem('chat_messages');
    renderMessages();
  }
}

function toggleTheme() {
  theme = theme === 'light' ? 'dark' : 'light';
  document.body.dataset.theme = theme;
  localStorage.setItem('chat_theme', theme);
}
