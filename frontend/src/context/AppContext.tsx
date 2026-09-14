import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Project, Task, DocItem, CalendarEvent, GitHubRepo, AIMessage } from '../types';
import { INITIAL_USERS, INITIAL_GITHUB_REPO } from '../data/mockData';
import { loadProjects, saveProjects, loadTasks, saveTasks, loadDocs, saveDocs, loadEvents, saveEvents } from '../utils/storage';
import { createGroupInChannel } from '../services/channelService';
import { sendMessageToGroup } from '../services/messageService';
import { queryAIAssistant } from '../services/aiService';

interface AppContextType {
  currentUser: User;
  users: User[];
  projects: Project[];
  activeProject: Project;
  tasks: Task[];
  docs: DocItem[];
  events: CalendarEvent[];
  githubRepo: GitHubRepo;
  aiMessages: AIMessage[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setActiveProjectById: (id: number) => void;
  createNewGroup: (channelId: number, groupName: string, description: string, userIds: number[]) => void;
  postMessage: (groupId: number, content: string) => void;
  createNewTask: (title: string, description: string, priority: Task['priority'], assigneeId: number, dueDate: string) => void;
  updateTaskState: (taskId: number, status: Task['status']) => void;
  uploadDoc: (title: string, fileType: string, fileSize: string) => void;
  scheduleEvent: (title: string, description: string, date: string, time: string, duration: string, type: CalendarEvent['type']) => void;
  sendAiQuery: (prompt: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users] = useState<User[]>(INITIAL_USERS);
  const [currentUser] = useState<User>(INITIAL_USERS[0]); // Default: Aman Kukreti
  const [projects, setProjects] = useState<Project[]>(loadProjects);
  const [activeProjectId, setActiveProjectId] = useState<number>(projects[0]?.id || 2001);
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [docs, setDocs] = useState<DocItem[]>(loadDocs);
  const [events, setEvents] = useState<CalendarEvent[]>(loadEvents);
  const [githubRepo] = useState<GitHubRepo>(INITIAL_GITHUB_REPO);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [aiMessages, setAiMessages] = useState<AIMessage[]>([
    {
      id: 'ai-welcome',
      sender: 'ai',
      text: 'Hello Aman! I am your ConnecT AI assistant. How can I assist with your workspace, tasks, or dynamic groups today?',
      timestamp: '09:00 AM',
    },
  ]);

  const activeProject = projects.find(p => p.id === activeProjectId) || projects[0];

  // Sync to local storage
  useEffect(() => {
    saveProjects(projects);
  }, [projects]);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    saveDocs(docs);
  }, [docs]);

  useEffect(() => {
    saveEvents(events);
  }, [events]);

  const setActiveProjectById = (id: number) => {
    setActiveProjectId(id);
  };

  const createNewGroup = (channelId: number, groupName: string, description: string, userIds: number[]) => {
    const selectedUsers = users.filter(u => userIds.includes(u.id));
    setProjects(prevProjects => {
      return prevProjects.map(project => {
        if (project.channels.some(c => c.id === channelId)) {
          const updatedChannels = createGroupInChannel(project.channels, channelId, {
            channelId,
            name: groupName,
            description,
            users: selectedUsers.length > 0 ? selectedUsers : [currentUser],
          });
          return { ...project, channels: updatedChannels };
        }
        return project;
      });
    });
  };

  const postMessage = (groupId: number, content: string) => {
    setProjects(prevProjects => {
      return prevProjects.map(project => {
        const hasGroup = project.channels.some(c => c.groups.some(g => g.id === groupId));
        if (hasGroup) {
          const updatedChannels = sendMessageToGroup(project.channels, groupId, currentUser, content);
          return { ...project, channels: updatedChannels };
        }
        return project;
      });
    });
  };

  const createNewTask = (title: string, description: string, priority: Task['priority'], assigneeId: number, dueDate: string) => {
    const assignee = users.find(u => u.id === assigneeId) || currentUser;
    const newTask: Task = {
      id: Date.now(),
      projectId: activeProject.id,
      title,
      description,
      status: 'To Do',
      priority,
      assigneeId: assignee.id,
      assigneeName: assignee.name,
      assigneeAvatar: assignee.avatarUrl,
      dueDate,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const updateTaskState = (taskId: number, status: Task['status']) => {
    setTasks(prev => prev.map(t => (t.id === taskId ? { ...t, status } : t)));
  };

  const uploadDoc = (title: string, fileType: string, fileSize: string) => {
    const newDoc: DocItem = {
      id: Date.now(),
      projectId: activeProject.id,
      title,
      fileType,
      fileSize,
      uploadedBy: currentUser.name,
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setDocs(prev => [newDoc, ...prev]);
  };

  const scheduleEvent = (title: string, description: string, date: string, time: string, duration: string, type: CalendarEvent['type']) => {
    const newEvt: CalendarEvent = {
      id: Date.now(),
      title,
      description,
      date,
      time,
      duration,
      attendees: [currentUser, users[1]],
      type,
    };
    setEvents(prev => [...prev, newEvt]);
  };

  const sendAiQuery = async (prompt: string) => {
    const userMsg: AIMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setAiMessages(prev => [...prev, userMsg]);

    const resp = await queryAIAssistant(prompt);
    setAiMessages(prev => [...prev, resp]);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        projects,
        activeProject,
        tasks,
        docs,
        events,
        githubRepo,
        aiMessages,
        searchQuery,
        setSearchQuery,
        setActiveProjectById,
        createNewGroup,
        postMessage,
        createNewTask,
        updateTaskState,
        uploadDoc,
        scheduleEvent,
        sendAiQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
