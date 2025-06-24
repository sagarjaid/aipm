<!-- @format -->

# Recall.ai Output Media Setup Guide

This guide will help you set up Recall.ai output media functionality to stream
your AI interface to Google Meet calls.

## Prerequisites

1. A Recall.ai account with API access (us-west-2 region)
2. Google Meet meeting URL
3. Your AI interface running at `https://aipm.so/ai`

## Setup Steps

### 1. Environment Variables

Add the following environment variable to your `.env.local` file:

```bash
# Recall.ai API Key (get this from your Recall.ai dashboard - us-west-2 region)
RECALL_API_KEY=your_recall_api_key_here
```

### 2. Get Your Recall.ai API Key

1. Go to [Recall.ai Dashboard (us-west-2)](https://us-west-2.recall.ai/)
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
transcripts (us-west-2 region):

```javascript
const ws = new WebSocket(
  'wss://meeting-data.us-west-2.recall.ai/api/v1/transcript'
);

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
2. Log in to your Recall.ai dashboard (us-west-2)
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

2. **"Invalid API token" or "authentication_failed"**

   - Verify your API key is for the us-west-2 region
   - Check that you're using the correct regional endpoints
   - Ensure your API key is valid and not expired

3. **"MediaStreamTrackProcessor is not supported"**

   - Use a modern browser with WebCodecs support
   - Chrome/Chromium-based browsers recommended

4. **"Failed to create bot"**

   - Check your Recall.ai API key
   - Verify the Google Meet URL is valid
   - Ensure your webpage URL is accessible

5. **Poor video/audio quality**
   - Use 4-core bots (configured automatically)
   - Optimize your webpage performance
   - Check CPU usage in Recall.ai dashboard

### Regional Configuration

This implementation uses the **us-west-2** region (Pay-as-you-go plan). If you
need to use a different region:

- **US (Monthly plan)**: `https://us-east-1.recall.ai`
- **EU**: `https://eu-central-1.recall.ai`
- **Japan**: `https://ap-northeast-1.recall.ai`

Update the API endpoints and WebSocket URLs accordingly.

### Getting Help

- Check the [Recall.ai Documentation](https://docs.recall.ai/)
- Review the [Regions Guide](https://docs.recall.ai/v1.10/docs/regions)
- Review the
  [Stream Media Guide](https://docs.recall.ai/v1.10/docs/stream-media)
- Contact Recall.ai support for API issues
