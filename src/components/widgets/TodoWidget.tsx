import React, { useState } from 'react';
import { Plus, Check, X } from 'lucide-react';
import { TodoItem } from '../../types';

interface TodoWidgetProps {
  items: TodoItem[];
  onUpdate: (items: TodoItem[]) => void;
}

export const TodoWidget: React.FC<TodoWidgetProps> = ({ items, onUpdate }) => {
  const [newTask, setNewTask] = useState('');

  const addItem = () => {
    if (!newTask.trim()) return;
    onUpdate([...items, { id: Date.now().toString(), text: newTask, completed: false }]);
    setNewTask('');
  };

  const toggleItem = (id: string) => {
    onUpdate(
      items.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const removeItem = (id: string) => {
    onUpdate(items.filter(item => item.id !== id));
  };

  return (
    <div className="w-full h-full p-4 flex flex-col">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addItem()}
          className="flex-1 px-3 py-2 border rounded"
          placeholder="Add new task..."
        />
        <button
          onClick={addItem}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <Plus size={20} />
        </button>
      </div>
      <ul className="flex-1 overflow-auto">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-2 py-2 border-b last:border-b-0"
          >
            <button
              onClick={() => toggleItem(item.id)}
              className={`p-1 rounded ${
                item.completed ? 'bg-green-500' : 'bg-gray-200'
              }`}
            >
              <Check size={16} className={item.completed ? 'text-white' : 'text-transparent'} />
            </button>
            <span className={item.completed ? 'line-through text-gray-500' : ''}>
              {item.text}
            </span>
            <button
              onClick={() => removeItem(item.id)}
              className="ml-auto p-1 text-gray-500 hover:text-red-500"
            >
              <X size={16} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};