export enum UserRole {
  ADMIN = 'ADMIN',
  BASIC = 'BASIC',
  LEAD = 'LEAD',
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  status?: 'online' | 'idle' | 'offline';
}

export interface Message {
  id: number;
  groupId: number;
  senderId: number;
  senderName: string;
  senderAvatar?: string;
  content: string;
  createdAt: string;
  reactions?: { emoji: string; count: number; users: number[] }[];
}

export interface Group {
  id: number;
  channelId: number;
  name: string;
  description?: string;
  users: User[];
  messages: Message[];
  createdAt: string;
}

export interface Channel {
  id: number;
  projectId: number;
  name: string;
  description?: string;
  groups: Group[];
}

export interface Project {
  id: number;
  name: string;
  description: string;
  createdBy: number;
  createdAt: string;
  members: User[];
  channels: Channel[];
  progress: number;
  status: 'Active' | 'Completed' | 'In Review' | 'Planning';
}

export interface Task {
  id: number;
  projectId: number;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Completed';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  assigneeId: number;
  assigneeName: string;
  assigneeAvatar?: string;
  dueDate: string;
  createdAt: string;
}

export interface DocItem {
  id: number;
  projectId: number;
  title: string;
  fileType: string;
  fileSize: string;
  uploadedBy: string;
  updatedAt: string;
  url?: string;
}

export interface CalendarEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  attendees: User[];
  location?: string;
  type: 'Meeting' | 'Review' | 'Sprint' | 'Deadline';
}

export interface GitHubCommit {
  id: string;
  message: string;
  author: string;
  avatar: string;
  timestamp: string;
  sha: string;
  branch: string;
}

export interface GitHubRepo {
  name: string;
  url: string;
  stars: number;
  forks: number;
  openIssues: number;
  branches: string[];
  recentCommits: GitHubCommit[];
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  codeSnippet?: string;
}
