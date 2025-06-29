const API_BASE = 'https://6860fe2b8e748640844491f8.mockapi.io/chatlite';

async function registerUser(username, password) {
  const res = await fetch(${API_BASE}/users, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (!res.ok) throw new Error('Register gagal');
  return res.json();
}

async function loginUser(username, password) {
  const res = await fetch(${API_BASE}/users);
  const users = await res.json();
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) throw new Error('Login gagal. Cek username/password');
  return user;
}

async function getChats() {
  const res = await fetch(${API_BASE}/messages);
  const data = await res.json();
  return data.sort((a, b) => new Date(a.time) - new Date(b.time));
}

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
