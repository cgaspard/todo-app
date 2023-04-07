const axios = require('axios');

async function fetchChatGptCompletions(inputText) {
  const openaiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.error('Missing OpenAI API Key');
    return [];
  }

  try {
    const response = await axios.post(
      openaiUrl,
      {
        prompt: inputText,
        max_tokens: 50,
        n: 5,
        stop: null,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    if (response.data && response.data.choices) {
      return response.data.choices.map((choice) => choice.text.trim());
    }
  } catch (error) {
    console.error('Error fetching completions from ChatGPT:', error);
  }

  return [];
}

module.exports = { fetchChatGptCompletions };
