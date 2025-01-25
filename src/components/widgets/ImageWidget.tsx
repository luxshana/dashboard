import React from 'react';

interface ImageWidgetProps {
  src: string;
}

export const ImageWidget: React.FC<ImageWidgetProps> = ({ src }) => {
  return (
    <div className="w-full h-full">
      <img
        src={src}
        alt="Widget"
        className="w-full h-full object-cover rounded"
      />
    </div>
  );
};