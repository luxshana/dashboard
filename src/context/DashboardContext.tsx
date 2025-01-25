import React, { createContext, useContext, useEffect, useState } from 'react';
import { Layout } from 'react-grid-layout';
import { DashboardState, Widget } from '../types';

interface DashboardContextType {
  state: DashboardState;
  addWidget: (type: Widget['type']) => void;
  removeWidget: (id: string) => void;
  updateWidget: (id: string, content: any) => void;
  updateLayouts: (layouts: Layout[]) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

const initialState: DashboardState = {
  widgets: [],
  layouts: [],
};

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<DashboardState>(() => {
    try {
      const saved = localStorage.getItem('dashboardState');
      return saved ? JSON.parse(saved) : initialState;
    } catch (error) {
      console.error('Error loading dashboard state:', error);
      return initialState;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('dashboardState', JSON.stringify(state));
    } catch (error) {
      console.error('Error saving dashboard state:', error);
    }
  }, [state]);

  const addWidget = (type: Widget['type']) => {
    const id = `widget-${Date.now()}`;
    const newWidget: Widget = {
      id,
      type,
      content: getInitialContent(type),
    };

    setState(prev => {
      const newLayout: Layout = {
        i: id,
        x: (prev.widgets.length * 2) % (prev.layouts.length > 0 ? 12 : 0),
        y: Infinity,
        w: 6,
        h: 4,
        minW: 3,
        minH: 3,
      };

      return {
        widgets: [...prev.widgets, newWidget],
        layouts: [...prev.layouts, newLayout],
      };
    });
  };

  const removeWidget = (id: string) => {

    setState(prev => {
      const newWidgets = prev.widgets.filter(w => w.id !== id);
      const newLayouts = prev.layouts.filter(l => l.i !== id);
      return {
        widgets: newWidgets,
        layouts: newLayouts,
      };
    });
  };

  const updateWidget = (id: string, content: any) => {
    setState(prev => ({
      ...prev,
      widgets: prev.widgets.map(w => 
        w.id === id ? { ...w, content } : w
      ),
    }));
  };

  const updateLayouts = (layouts: Layout[]) => {
    setState(prev => ({
      ...prev,
      layouts,
    }));
  };

  const value = {
    state,
    addWidget,
    removeWidget,
    updateWidget,
    updateLayouts,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

const getInitialContent = (type: Widget['type']) => {
  switch (type) {
    case 'chart':
      return Array.from({ length: 7 }, (_, i) => ({
        name: `Day ${i + 1}`,
        value: Math.floor(Math.random() * 100),
      }));
    case 'text':
      return 'Click to edit this text';
    case 'todo':
      return [];
    case 'image':
      return 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809';
    default:
      return null;
  }
};