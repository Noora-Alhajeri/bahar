// pages/api/messages.js

export default async function handler(req, res) {
    try {
      // Your logic to fetch and return messages as JSON
      const messages = await fetchMessagesFromDatabase();
      res.status(200).json(messages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
