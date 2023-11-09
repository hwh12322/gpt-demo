document.getElementById('send-btn').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value;
    const chatBox = document.getElementById('chat-box');

    if(userInput.trim() === '') return; // Don't send empty messages

    // Create user message element
    const userMessage = document.createElement('div');
    userMessage.textContent = userInput;
    userMessage.className = 'user-message'; // Add class for potential styling
    chatBox.appendChild(userMessage);

    // Prepare data to send to the server
    const dataToSend = {
        message: userInput
    };

    // Send the user input to the Node.js backend using fetch API
    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
    })
    .then(response => response.json())
    .then(data => {
        // Create bot response element
        const botResponse = document.createElement('div');
        botResponse.textContent = data.reply;
        botResponse.className = 'bot-message'; // Add class for potential styling
        chatBox.appendChild(botResponse);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    // Clear the input box
    document.getElementById('user-input').value = '';
});

// To handle enter key event on input field
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if(e.key === 'Enter') {
        document.getElementById('send-btn').click();
    }
});
