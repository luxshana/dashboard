import { Layout } from 'react-grid-layout';

export interface Widget {
  id: string;
  type: 'chart' | 'text' | 'todo' | 'image';
  content: any;
}

export interface DashboardState {
  widgets: Widget[];
  layouts: Layout[];
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}