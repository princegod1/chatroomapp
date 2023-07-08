// Get DOM elements
const joinScreen = document.querySelector('.join-screen');
const chatScreen = document.querySelector('.chat-screen');
const usernameInput = document.querySelector('#username');
const joinButton = document.querySelector('#join-user');
const exitButton = document.querySelector('#exit-chat');
const messageInput = document.querySelector('#message-input');
const sendMessageButton = document.querySelector('#send-message');
const messagesContainer = document.querySelector('.messages');

let username = '';
let isUser1 = false;

// Join chatroom
joinButton.addEventListener('click', () => {
  username = usernameInput.value.trim();
  if (username !== '') {
    joinScreen.classList.remove('active');
    chatScreen.classList.add('active');
    isUser1 = true;
    sendMessage({ type: 'join', username });
  }
});

// Exit chatroom
exitButton.addEventListener('click', () => {
  chatScreen.classList.remove('active');
  joinScreen.classList.add('active');
  sendMessage({ type: 'exit', username });
});

// Send message
sendMessageButton.addEventListener('click', () => {
  const message = messageInput.value.trim();
  if (message !== '') {
    sendMessage({ type: 'message', username, message });
    messageInput.value = '';
  }
});

// Receive message
function receiveMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  if (message.type === 'join' || message.type === 'exit') {
    messageElement.innerHTML = `
      <div class="update">${message.username} ${message.type === 'join' ? 'joined' : 'left'} the chatroom</div>
    `;
  } else {
    messageElement.innerHTML = `
      <div>
        <div class="name">${message.username}:</div>
        <div class="text">${message.message}</div>
      </div>
    `;
  }
  messagesContainer.appendChild(messageElement);
}

// Send message
function sendMessage(message) {
  // Simulate receiving the message
  receiveMessage(message);

  // Simulate the other user sending a message
  if (message.type === 'message') {
    const simulatedMessage = {
      type: 'message',
      username: isUser1 ? 'User2' : 'User1',
      message: 'This is a simulated message from the other user',
    };
    setTimeout(() => receiveMessage(simulatedMessage), 2000);
  }
}
