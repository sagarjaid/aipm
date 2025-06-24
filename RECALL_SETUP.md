<!-- @format -->

# Recall.ai Output Media Setup Guide

This guide will help you set up Recall.ai output media functionality to stream
your AI interface to Google Meet calls.

## Prerequisites

1. A Recall.ai account with API access
2. Google Meet meeting URL
3. Your AI interface running at `https://aipm.so/ai`

## Setup Steps

### 1. Environment Variables

Add the following environment variable to your `.env.local` file:

```bash
# Recall.ai API Key (get this from your Recall.ai dashboard)
RECALL_API_KEY=your_recall_api_key_here
```

### 2. Get Your Recall.ai API Key

1. Go to [Recall.ai Dashboard](https://app.recall.ai/)
2. Navigate to your account settings
3. Copy your API key

### 3. Usage

The output media functionality is available at `/add` route in your application.
Users can:

- Enter a Google Meet URL to join the call
- Configure bot settings (name, webpage URL)
- Start streaming the AI interface to the meeting
- Receive real-time meeting transcripts via WebSocket
- Stop the bot when finished

## Features

- **Real-time webpage streaming** to Google Meet calls
- **Live meeting transcript** reception via WebSocket
- **Meeting audio input** processing for AI responses
- **Bot management** (create, stop, monitor)
- **Error handling** and user feedback
- **Responsive design** for mobile and desktop

## API Endpoints

### `/api/recall/create-bot`

Creates a Recall.ai bot with output media configuration.

**Request:**

```json
{
  "meetingUrl": "https://meet.google.com/xxx-xxxx-xxx",
  "botName": "AI Assistant",
  "webpageUrl": "https://aipm.so/ai"
}
```

**Response:**

```json
{
  "botId": "bot_123456",
  "status": "created",
  "meetingUrl": "https://meet.google.com/xxx-xxxx-xxx",
  "botName": "AI Assistant"
}
```

### `/api/recall/stop-media`

Stops the bot's output media.

**Request:**

```json
{
  "botId": "bot_123456"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Bot media stopped successfully"
}
```

## WebSocket Integration

The application connects to Recall.ai's WebSocket endpoint for real-time
transcripts:

```javascript
const ws = new WebSocket('wss://meeting-data.bot.recall.ai/api/v1/transcript');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // Handle real-time transcript data
};
```

## Meeting Audio Input

The webpage can access meeting audio using the `useMeetingAudio` hook:

```javascript
import { useMeetingAudio } from '@/hooks/useMeetingAudio';

const { isListening, startListening, stopListening } = useMeetingAudio({
  onAudioData: (audioData) => {
    // Process meeting audio data
  },
});
```

## Debugging

Use Recall.ai's remote DevTools to debug your webpage:

1. Send an output media bot to your meeting
2. Log in to your Recall.ai dashboard
3. Select Bot Explorer in the sidebar
4. Search for your bot by ID
5. Open the "Debug Data" tab
6. Click "Open Remote Devtools" under CPU Metrics

## Performance Considerations

- Use 4-core bots for better performance (configured automatically)
- Monitor CPU usage in the Recall.ai dashboard
- Optimize your webpage for 1280x720px dimensions
- WebGL is not supported (no GPU access)

## Browser Support

- Chrome/Chromium-based browsers (recommended)
- Firefox (limited support)
- Safari (limited support)

## Troubleshooting

### Common Issues

1. **"Recall API key not configured"**

   - Ensure `RECALL_API_KEY` is set in your environment variables

2. **"MediaStreamTrackProcessor is not supported"**

   - Use a modern browser with WebCodecs support
   - Chrome/Chromium-based browsers recommended

3. **"Failed to create bot"**

   - Check your Recall.ai API key
   - Verify the Google Meet URL is valid
   - Ensure your webpage URL is accessible

4. **Poor video/audio quality**
   - Use 4-core bots (configured automatically)
   - Optimize your webpage performance
   - Check CPU usage in Recall.ai dashboard

### Getting Help

- Check the [Recall.ai Documentation](https://docs.recall.ai/)
- Review the
  [Stream Media Guide](https://docs.recall.ai/v1.10/docs/stream-media)
- Contact Recall.ai support for API issues
