(function () {
  const messagesEl = document.getElementById("chatMessages");
  const inputEl = document.getElementById("chatInput");
  const sendEl = document.getElementById("sendButton");
  const titleEl = document.getElementById("ChatChannelTitle");

  if (!messagesEl || !inputEl || !sendEl || !titleEl) return;

  const title = titleEl.textContent.trim();
  const community = title.replace(/^#\s*General\s*-\s*/i, "").trim() || "General";
  const storageKey = "questsafe_chat_" + community.toLowerCase();
  const mutedUsersKey = "questsafe_muted_users";
  const blockedUsersKey = "questsafe_blocked_users";

  function getMessages() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
      return Array.isArray(saved) ? saved : [];
    } catch (e) {
      return [];
    }
  }

  function saveMessages(messages) {
    localStorage.setItem(storageKey, JSON.stringify(messages.slice(-200)));
  }

  function getMutedUsers() {
    try {
      const saved = JSON.parse(localStorage.getItem(mutedUsersKey) || "[]");
      return Array.isArray(saved)
        ? saved.map(function (name) { return String(name).trim().toLowerCase(); }).filter(Boolean)
        : [];
    } catch (e) {
      return [];
    }
  }

  function isUserMuted(username) {
    return getMutedUsers().indexOf(String(username || "").trim().toLowerCase()) !== -1;
  }

  function getBlockedUsers() {
    try {
      const saved = JSON.parse(localStorage.getItem(blockedUsersKey) || "[]");
      return Array.isArray(saved)
        ? saved.map(function (name) { return String(name).trim().toLowerCase(); }).filter(Boolean)
        : [];
    } catch (e) {
      return [];
    }
  }

  function isUserBlocked(username) {
    return getBlockedUsers().indexOf(String(username || "").trim().toLowerCase()) !== -1;
  }

  function blockUser(username) {
    const cleanName = String(username || "").trim();
    if (!cleanName) return;
    const blocked = getBlockedUsers();
    if (blocked.indexOf(cleanName.toLowerCase()) === -1) {
      blocked.push(cleanName.toLowerCase());
      localStorage.setItem(blockedUsersKey, JSON.stringify(blocked));
    }
    renderMessages();
  }

  function unblockUser(username) {
    const cleanName = String(username || "").trim().toLowerCase();
    const blocked = getBlockedUsers().filter(function (name) { return name !== cleanName; });
    localStorage.setItem(blockedUsersKey, JSON.stringify(blocked));
    renderMessages();
  }

  function muteUser(username) {
    const cleanName = String(username || "").trim();
    if (!cleanName) return;

    const muted = getMutedUsers();
    if (muted.indexOf(cleanName.toLowerCase()) === -1) {
      muted.push(cleanName.toLowerCase());
      localStorage.setItem(mutedUsersKey, JSON.stringify(muted));
    }

    updateMuteState();
  }

  function unmuteUser(username) {
    const cleanName = String(username || "").trim().toLowerCase();
    const muted = getMutedUsers().filter(function (name) {
      return name !== cleanName;
    });
    localStorage.setItem(mutedUsersKey, JSON.stringify(muted));
    updateMuteState();
  }

  function updateMuteState() {
    const username = localStorage.getItem("questsafe_username") || "You";
    const muted = isUserMuted(username);

    inputEl.disabled = muted;
    sendEl.disabled = muted;

    if (muted) {
      inputEl.placeholder = "You have been muted by a parent/admin.";
      inputEl.setAttribute("aria-disabled", "true");
    } else {
      inputEl.placeholder = "Type a message...";
      inputEl.removeAttribute("aria-disabled");
    }
  }

  function renderMessages() {
    const messages = getMessages();
    messagesEl.replaceChildren();

    messages.forEach(function (message) {
      if (isUserBlocked(message.author)) return;

      const row = document.createElement("div");
      row.className = "message-row";

      const avatar = document.createElement("div");
      avatar.className = "msg-avatar";
      avatar.textContent = (message.author || "You").charAt(0).toUpperCase();

      const content = document.createElement("div");
      content.className = "msg-content";

      const meta = document.createElement("div");
      meta.className = "msg-meta";

      const author = document.createElement("span");
      author.className = "msg-author";
      author.textContent = message.author || "You";

      const time = document.createElement("span");
      time.className = "msg-time";
      time.textContent = message.time || "";

      const text = document.createElement("p");
      text.className = "msg-text";
      text.textContent = message.text || "";

      meta.append(author, time);
      content.append(meta, text);
      row.append(avatar, content);
      messagesEl.appendChild(row);
    });

    messagesEl.scrollTop = messagesEl.scrollHeight;
    updateMuteState();
  }

  function sendMessage() {
    const author = localStorage.getItem("questsafe_username") || "You";

    if (isUserMuted(author)) {
      updateMuteState();
      return;
    }

    const text = inputEl.value.trim();
    if (!text) return;

    const messages = getMessages();
    messages.push({
      author: author,
      text: text,
      time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    });

    saveMessages(messages);
    inputEl.value = "";
    renderMessages();
    inputEl.focus();
  }

  sendEl.addEventListener("click", sendMessage);

  inputEl.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  });

  window.addEventListener("storage", function (event) {
    if (event.key === storageKey || event.key === mutedUsersKey || event.key === blockedUsersKey || event.key === "questsafe_username") {
      renderMessages();
    }
  });

  // Expose moderation helpers to the existing parent/admin controls.
  window.questsafeMuteUser = muteUser;
  window.questsafeUnmuteUser = unmuteUser;
  window.questsafeIsMuted = isUserMuted;
  window.questsafeBlockUser = blockUser;
  window.questsafeUnblockUser = unblockUser;
  window.questsafeIsBlocked = isUserBlocked;

  renderMessages();
})();
