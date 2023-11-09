require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route to handle chat messages
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;
    try {
        const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
            prompt: userMessage,
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        // Send back the completion result
        res.json({ reply: response.data.choices[0].text.trim() });
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        res.status(500).send('Error processing the message');
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
