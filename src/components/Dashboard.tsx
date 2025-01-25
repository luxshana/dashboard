import React, { useState, useEffect } from "react";
import GridLayout from "react-grid-layout";
import { PlusCircle, BarChart, Type, ListTodo, Image } from "lucide-react";
import { Widget } from "./Widget";
import { useDashboard } from "../context/DashboardContext";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const Dashboard: React.FC = () => {
  const { state, addWidget, removeWidget, updateWidget, updateLayouts } =
    useDashboard();
  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getGridColumns = () => {
    if (width < 768) return 2; // Mobile
    if (width < 1024) return 6; // Tablet
    return 12; // Desktop
  };

  const getContainerWidth = () => {
    const padding = 32; 
    return Math.min(width - padding, 1280) - padding; 
  };

  const handleAddWidget = (type: "chart" | "text" | "todo" | "image") => {
    addWidget(type);
  };

  const handleRemoveWidget = (id: string) => {
    removeWidget(id);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => handleAddWidget("chart")}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          <BarChart size={20} />
          <span className="hidden sm:inline">Add Chart</span>
        </button>
        <button
          onClick={() => handleAddWidget("text")}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
          <Type size={20} />
          <span className="hidden sm:inline">Add Text</span>
        </button>
        <button
          onClick={() => handleAddWidget("todo")}
          className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors">
          <ListTodo size={20} />
          <span className="hidden sm:inline">Add Todo</span>
        </button>
        <button
          onClick={() => handleAddWidget("image")}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors">
          <Image size={20} />
          <span className="hidden sm:inline">Add Image</span>
        </button>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg min-h-[calc(100vh-120px)]">
        <GridLayout
          className="layout"
          layout={state.layouts}
          onLayoutChange={updateLayouts}
          cols={getGridColumns()}
          rowHeight={30}
          width={getContainerWidth()}
          compactType="vertical"
          preventCollision={false}
          isResizable={true}
          isDraggable={true}
          margin={[16, 16]}
          draggableHandle=".widget-header">
          {state.widgets.map((widget) => (
            <div
              key={widget.id}
              className="widget-container"
              style={{ zIndex: 1000 }}>
              <Widget
                widget={widget}
                onRemove={() => handleRemoveWidget(widget.id)}
                onUpdate={(content) => updateWidget(widget.id, content)}
              />
            </div>
          ))}
        </GridLayout>
      </div>
    </div>
  );
};

export default Dashboard;
