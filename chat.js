(function () {
  const messagesEl = document.getElementById("chatMessages");
  const inputEl = document.getElementById("chatInput");
  const sendEl = document.getElementById("sendButton");
  const titleEl = document.getElementById("ChatChannelTitle");

  if (!messagesEl || !inputEl || !sendEl || !titleEl) return;

  const title = titleEl.textContent.trim();
  const community = title.replace(/^#\s*General\s*-\s*/i, "").trim() || "General";
  const storageKey = "questsafe_chat_" + community.toLowerCase();

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

  function renderMessages() {
    const messages = getMessages();
    messagesEl.replaceChildren();

    messages.forEach(function (message) {
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
  }

  function sendMessage() {
    const text = inputEl.value.trim();
    if (!text) return;

    const messages = getMessages();
    messages.push({
      author: localStorage.getItem("questsafe_username") || "You",
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
    if (event.key === storageKey) renderMessages();
  });

  renderMessages();
})();
