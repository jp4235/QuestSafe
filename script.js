//zzs25

const tabButtons = document.querySelectorAll('.tab-btn');
const roleButtons = document.querySelectorAll('.role-btn');
const roleToggleSignin = document.getElementById('role-toggle-signin');
const headerTitle = document.getElementById('header-title');
const headerSubtitle = document.getElementById('header-subtitle');

let currentTab = 'signin';
let currentRole = 'kid';

function render() {
  tabButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === currentTab));
  roleButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.role === currentRole));

  // Sign up is parent-only, so hide the kid/parent toggle there and force parent
  if (currentTab === 'signup') {
    roleToggleSignin.classList.add('hidden');
    currentRole = 'parent';
    roleButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.role === currentRole));
  } else {
    roleToggleSignin.classList.remove('hidden');
  }

  document.querySelectorAll('.panel-form').forEach(p => p.classList.remove('visible'));
  const activePanel = document.getElementById(`panel-${currentTab}-${currentRole}`);
  if (activePanel) activePanel.classList.add('visible');

  if (currentTab === 'signin') {
    headerTitle.textContent = 'Welcome back';
    headerSubtitle.textContent = "Choose how you're signing in";
  } else {
    headerTitle.textContent = 'Create an account';
    headerSubtitle.textContent = 'Parents sign up first, then invite their kid';
  }
}

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    currentTab = btn.dataset.tab;
    render();
  });
});

roleButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    currentRole = btn.dataset.role;
    render();
  });
});

// --- Simple front-end validation stubs --- //

function showError(fieldEl, message) {
  clearError(fieldEl);
  fieldEl.parentElement.classList.add('error');
  const err = document.createElement('div');
  err.className = 'field-error';
  err.textContent = message;
  fieldEl.parentElement.appendChild(err);
}

function clearError(fieldEl) {
  fieldEl.parentElement.classList.remove('error');
  const existing = fieldEl.parentElement.querySelector('.field-error');
  if (existing) existing.remove();
}

document.getElementById('panel-signin-kid').addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('si-kid-username');
  const code = document.getElementById('si-kid-code');
  clearError(username);
  clearError(code);

  let valid = true;
  if (!username.value.trim()) { showError(username, 'Enter your username.'); valid = false; }
  if (!/^\d{4}$/.test(code.value.trim())) { showError(code, 'Enter the 4-digit code from your parent.'); valid = false; }
  if (!valid) return;

  
  console.log('Kid sign in:', { username: username.value, code: code.value });
  window.location.href = 'communities.html';
});

document.getElementById('panel-signin-parent').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('si-parent-email');
  const password = document.getElementById('si-parent-password');
  clearError(email);
  clearError(password);

  let valid = true;
  if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) { showError(email, 'Enter a valid email address.'); valid = false; }
  if (!password.value) {
    showError(password, 'Enter your password.');
    valid = false;
  } else if (password.value.length < 8) {
    showError(password, 'Password must be at least 8 characters.');
    valid = false;
  }
  if (!valid) return;

  // TODO: replace with a real API call, redirecting only once the server confirms success
  console.log('Parent sign in:', { email: email.value });
  window.location.href = 'home.html';
});

document.getElementById('panel-signup-parent').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('su-parent-email');
  const password = document.getElementById('su-parent-password');
  clearError(email);
  clearError(password);

  let valid = true;
  if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) { showError(email, 'Enter a valid email address.'); valid = false; }
  if (password.value.length < 8) { showError(password, 'Password must be at least 8 characters.'); valid = false; }
  if (!valid) return;

  console.log('Parent sign up:', { email: email.value });
  window.location.href = 'home.html';
});

render();