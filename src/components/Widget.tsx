import React from 'react';
import { X } from 'lucide-react';
import { ChartWidget } from './widgets/ChartWidget';
import { TextWidget } from './widgets/TextWidget';
import { TodoWidget } from './widgets/TodoWidget';
import { ImageWidget } from './widgets/ImageWidget';
import { Widget as WidgetType } from '../types';

interface WidgetProps {
  widget: WidgetType;
  onRemove: () => void;
  onUpdate: (content: any) => void;
}

export const Widget: React.FC<WidgetProps> = ({ widget, onRemove, onUpdate }) => {
  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof onRemove === 'function') {
      onRemove();
    }
  };

  const renderContent = () => {
    switch (widget.type) {
      case 'chart':
        return <ChartWidget data={widget.content} />;
      case 'text':
        return <TextWidget content={widget.content} onUpdate={onUpdate} />;
      case 'todo':
        return <TodoWidget items={widget.content} onUpdate={onUpdate} />;
      case 'image':
        return <ImageWidget src={widget.content} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full bg-white rounded-lg shadow-md overflow-hidden">
      <div className="widget-header p-2 bg-gray-50 border-b flex justify-between items-center cursor-move">
        <div className="text-sm font-medium text-gray-600">
          {widget.type.charAt(0).toUpperCase() + widget.type.slice(1)} Widget
        </div>
        <button
          type="button"
          onClick={handleRemove}
          className="p-1 hover:bg-gray-200 rounded-full text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
          aria-label="Remove widget"
        >
          <X size={16} />
        </button>
      </div>
      <div className="h-[calc(100%-40px)] overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
};