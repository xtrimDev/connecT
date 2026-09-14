import { Project, Task, DocItem, CalendarEvent } from '../types';
import { INITIAL_PROJECTS, INITIAL_TASKS, INITIAL_DOCUMENTS, INITIAL_EVENTS } from '../data/mockData';

const KEYS = {
  PROJECTS: 'connect_projects_v1',
  TASKS: 'connect_tasks_v1',
  DOCS: 'connect_docs_v1',
  EVENTS: 'connect_events_v1',
};

export const loadProjects = (): Project[] => {
  try {
    const data = localStorage.getItem(KEYS.PROJECTS);
    return data ? JSON.parse(data) : INITIAL_PROJECTS;
  } catch (err) {
    console.error('Failed to load projects from localStorage:', err);
    return INITIAL_PROJECTS;
  }
};

export const saveProjects = (projects: Project[]) => {
  try {
    localStorage.setItem(KEYS.PROJECTS, JSON.stringify(projects));
  } catch (err) {
    console.error('Failed to save projects to localStorage:', err);
  }
};

export const loadTasks = (): Task[] => {
  try {
    const data = localStorage.getItem(KEYS.TASKS);
    return data ? JSON.parse(data) : INITIAL_TASKS;
  } catch (err) {
    console.error('Failed to load tasks from localStorage:', err);
    return INITIAL_TASKS;
  }
};

export const saveTasks = (tasks: Task[]) => {
  try {
    localStorage.setItem(KEYS.TASKS, JSON.stringify(tasks));
  } catch (err) {
    console.error('Failed to save tasks to localStorage:', err);
  }
};

export const loadDocs = (): DocItem[] => {
  try {
    const data = localStorage.getItem(KEYS.DOCS);
    return data ? JSON.parse(data) : INITIAL_DOCUMENTS;
  } catch (err) {
    console.error('Failed to load docs from localStorage:', err);
    return INITIAL_DOCUMENTS;
  }
};

export const saveDocs = (docs: DocItem[]) => {
  try {
    localStorage.setItem(KEYS.DOCS, JSON.stringify(docs));
  } catch (err) {
    console.error('Failed to save docs to localStorage:', err);
  }
};

export const loadEvents = (): CalendarEvent[] => {
  try {
    const data = localStorage.getItem(KEYS.EVENTS);
    return data ? JSON.parse(data) : INITIAL_EVENTS;
  } catch (err) {
    console.error('Failed to load events from localStorage:', err);
    return INITIAL_EVENTS;
  }
};

export const saveEvents = (events: CalendarEvent[]) => {
  try {
    localStorage.setItem(KEYS.EVENTS, JSON.stringify(events));
  } catch (err) {
    console.error('Failed to save events to localStorage:', err);
  }
};
