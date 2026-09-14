import { Channel, Message, User } from '../types';

// Replace with API call or WebSocket emit when backend is available (e.g. POST /api/messages or socket.emit('sendMessage'))
export const sendMessageToGroup = (
  channels: Channel[],
  groupId: number,
  sender: User,
  content: string
): Channel[] => {
  const newMessage: Message = {
    id: Date.now(),
    groupId,
    senderId: sender.id,
    senderName: sender.name,
    senderAvatar: sender.avatarUrl,
    content,
    createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };

  return channels.map(channel => ({
    ...channel,
    groups: channel.groups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          messages: [...group.messages, newMessage],
        };
      }
      return group;
    }),
  }));
};
