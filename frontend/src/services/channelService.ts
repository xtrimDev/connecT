import { Channel, Group } from '../types';

// Replace with API call when backend is available (e.g., GET /api/channels/:id)
export const fetchChannelById = async (channels: Channel[], channelId: number): Promise<Channel | undefined> => {
  return channels.find(c => c.id === channelId);
};

// Replace with API call when backend is available (e.g., POST /api/channels/:id/groups)
export const createGroupInChannel = (
  channels: Channel[],
  channelId: number,
  newGroupData: Omit<Group, 'id' | 'createdAt' | 'messages'>
): Channel[] => {
  const newGroup: Group = {
    ...newGroupData,
    id: Date.now(),
    createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    messages: [],
  };

  return channels.map(channel => {
    if (channel.id === channelId) {
      return {
        ...channel,
        groups: [...channel.groups, newGroup],
      };
    }
    return channel;
  });
};
