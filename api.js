const API_BASE = 'https://6860fe2b8e748640844491f8.mockapi.io';

// 🚀 REGISTER USER
async function registerUser(username, password) {
  const res = await fetch(${API_BASE}/users, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (!res.ok) throw new Error('Register failed');
  return res.json();
}

// ✅ LOGIN USER
async function loginUser(username, password) {
  const res = await fetch(${API_BASE}/users);
  const users = await res.json();
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) throw new Error('Login gagal. Cek username/password');
  return user;
}

// 💬 GET ALL CHATS
async function getChats() {
  const res = await fetch(${API_BASE}/messages);
  const data = await res.json();
  return data.sort((a, b) => new Date(a.time) - new Date(b.time)); // urut berdasarkan waktu
}

// ✏ POST NEW CHAT
async function postChat(user, text) {
  const res = await fetch(${API_BASE}/messages, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user,
      text,
      time: new Date().toLocaleString()
    })
  });

  if (!res.ok) throw new Error('Gagal kirim pesan');
  return res.json();
}
