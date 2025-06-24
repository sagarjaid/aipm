<!-- @format -->

# ElevenLabs Conversational AI Setup Guide

This guide will help you set up ElevenLabs Conversational AI in your Next.js
application.

## Prerequisites

1. An ElevenLabs account with API access
2. A Conversational AI agent created in the ElevenLabs dashboard

## Setup Steps

### 1. Environment Variables

Add the following environment variables to your `.env.local` file:

```bash
# ElevenLabs API Key (get this from your ElevenLabs dashboard)
ELEVENLABS_API_KEY=your_api_key_here

# Your Conversational AI Agent ID (get this from the ElevenLabs dashboard)
NEXT_PUBLIC_ELEVENLABS_AGENT_ID=your_agent_id_here
```

### 2. Get Your Agent ID

1. Go to
   [ElevenLabs Conversational AI Dashboard](https://elevenlabs.io/app/conversational-ai)
2. Create a new agent or select an existing one
3. Copy the Agent ID from the agent settings

### 3. Get Your API Key

1. Go to [ElevenLabs Profile Settings](https://elevenlabs.io/app/account)
2. Navigate to the API section
3. Copy your API key

### 4. Configure Your Agent

In the ElevenLabs Conversational AI dashboard:

1. **Set up your agent's personality and knowledge**
2. **Configure the voice** (select from available voices)
3. **Set conversation parameters** (language, response style, etc.)
4. **Test the agent** to ensure it works as expected

### 5. Usage

The Conversational AI is now available at `/ai` route in your application. Users
can:

- Start a conversation by clicking "Start Conversation"
- Allow microphone access when prompted
- Speak naturally with the AI agent
- See real-time transcription of the conversation
- End the conversation when finished

## Features

- **Real-time voice conversation** with AI agents
- **Live transcription** of user speech
- **Volume control** for AI responses
- **Connection status** indicators
- **Error handling** and user feedback
- **Responsive design** for mobile and desktop

## API Endpoints

### `/api/elevenlabs/get-signed-url`

Generates signed URLs for secure agent connections.

**Method:** POST  
**Body:** `{ "agentId": "your_agent_id" }`  
**Response:**
`{ "signedUrl": "signed_url", "conversationId": "conversation_id" }`

## Troubleshooting

### Common Issues

1. **"Please configure your ElevenLabs agent ID"**

   - Make sure `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` is set in your environment
     variables

2. **"ElevenLabs API key not configured"**

   - Ensure `ELEVENLABS_API_KEY` is set in your environment variables

3. **Microphone access denied**

   - Make sure users allow microphone access in their browser
   - Check that you're using HTTPS (required for microphone access)

4. **Connection failed**
   - Verify your agent ID is correct
   - Check that your API key has the necessary permissions
   - Ensure your agent is properly configured in the ElevenLabs dashboard

### Debug Mode

Enable debug logging by checking the browser console for detailed error messages
and connection status.

## Security Notes

- Never expose your `ELEVENLABS_API_KEY` in client-side code
- The API key is only used server-side in the `/api/elevenlabs/get-signed-url`
  route
- Signed URLs are generated server-side for secure agent connections

## Customization

You can customize the UI by modifying the `app/ai/page.tsx` file:

- Change the styling using Tailwind CSS classes
- Modify the conversation flow
- Add additional features like conversation history
- Customize the agent's behavior through the ElevenLabs dashboard

## Support

For issues related to:

- **ElevenLabs API**: Check the
  [ElevenLabs Documentation](https://docs.elevenlabs.io/)
- **Conversational AI**: Visit
  [ElevenLabs Conversational AI Guide](https://docs.elevenlabs.io/conversational-ai)
- **This implementation**: Check the code comments and this setup guide
