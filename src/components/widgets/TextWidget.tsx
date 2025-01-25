import React, { useState } from 'react';
import { Pencil } from 'lucide-react';

interface TextWidgetProps {
  content: string;
  onUpdate: (content: string) => void;
}

export const TextWidget: React.FC<TextWidgetProps> = ({ content, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(content);

  const handleSave = () => {
    onUpdate(text);
    setIsEditing(false);
  };

  return (
    <div className="w-full h-full p-4">
      {isEditing ? (
        <div className="h-full flex flex-col gap-2">
          <textarea
            className="flex-1 p-2 border rounded"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="relative h-full">
          <button
            onClick={() => setIsEditing(true)}
            className="absolute top-0 right-0 p-1 text-gray-500 hover:text-gray-700"
          >
            <Pencil size={16} />
          </button>
          <p className="whitespace-pre-wrap">{text}</p>
        </div>
      )}
    </div>
  );
};