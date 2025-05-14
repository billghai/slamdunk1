document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');

    if (!chatForm || !userInput || !chatMessages) {
        console.error('Form elements not found');
        return;
    }

    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = userInput.value.trim();
        if (!message) return;

        chatMessages.innerHTML += `<p><strong>You:</strong> ${message}</p>`;
        userInput.value = '';

        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            chatMessages.innerHTML += `<p><strong>Grok:</strong> ${data.grok}</p>`;
            chatMessages.scrollTop = chatMessages.scrollHeight;
        } catch (error) {
            console.error('Error:', error);
            chatMessages.innerHTML += `<p><strong>Grok:</strong> Sorry, something went wrong.</p>`;
        }
    });
});