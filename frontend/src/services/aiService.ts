import { AIMessage } from '../types';

// Replace with API call when backend OpenAI / Gemini endpoint is connected (e.g. POST /api/ai/chat)
export const queryAIAssistant = async (userPrompt: string): Promise<AIMessage> => {
  // Simulate intelligent response delay
  await new Promise(res => setTimeout(res, 600));

  const lower = userPrompt.toLowerCase();
  let text = "I've analyzed your workspace state. Everything is running smoothly with 0 deployment errors.";
  let codeSnippet: string | undefined = undefined;

  if (lower.includes('status') || lower.includes('summary') || lower.includes('project')) {
    text = "ConnecT Core Platform is currently at 78% completion. Frontend has been successfully decoupled into a standalone `/frontend` directory. 4 tasks are active and 2 meetings scheduled.";
  } else if (lower.includes('task') || lower.includes('overdue')) {
    text = "You have 1 Urgent task ('Decouple Frontend and Backend Folders') completed, and 1 High priority task ('Implement Dynamic Group Creation Modal') currently In Progress.";
  } else if (lower.includes('code') || lower.includes('docker') || lower.includes('backend')) {
    text = "Here is the recommended Express API controller pattern for fetching workspace channels:";
    codeSnippet = `// GET /api/channels/:id
export const getChannel = async (req, res) => {
  const channel = await ChannelModel.findById(req.params.id).populate('groups');
  res.json({ success: true, channel });
};`;
  }

  return {
    id: `ai-${Date.now()}`,
    sender: 'ai',
    text,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    codeSnippet,
  };
};
