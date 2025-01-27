const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Slack Webhook URL (You already provided this)
const slackWebhookURL = 'https://hooks.slack.com/services/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';

// Endpoint to send data to Slack
app.post('/sendToSlack', async (req, res) => {
  const { customerData } = req.body;

  if (!customerData) {
    return res.status(400).send({ error: 'Customer data is required' });
  }

  const slackMessage = {
    text: `New Customer Data Received:\nName: ${customerData.customerName}\nEmail: ${customerData.email}\nPhone: ${customerData.phone}\nAddress: ${customerData.address}`,
  };

  try {
    // Send the message to Slack
    await axios.post(slackWebhookURL, slackMessage);
    res.status(200).send({ success: 'Message sent to Slack successfully' });
  } catch (error) {
    console.error('Error sending message to Slack:', error);
    res.status(500).send({ error: 'Failed to send message to Slack' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
