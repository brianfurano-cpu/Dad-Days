import React from 'react';

interface YayaToggleProps {
  isJoined: boolean;
  onToggle: (value: boolean) => void;
}

export const YayaToggle: React.FC<YayaToggleProps> = ({ isJoined, onToggle }) => {
  return (
    <div className="flex items-center justify-center py-6 px-4">
      <label 
        className={`
          relative flex items-center justify-between p-4 rounded-full cursor-pointer transition-all duration-300 shadow-sm border
          ${isJoined ? 'bg-softblue-50 border-softblue-100 ring-2 ring-softblue-100' : 'bg-white border-stone-200'}
          w-full max-w-md
        `}
      >
        <span className="flex-1 text-lg font-medium text-warm-800 select-none px-2">
          Include Yaya (Grandma)?
        </span>
        
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isJoined}
            onChange={(e) => onToggle(e.target.checked)}
          />
          <div className="w-14 h-8 bg-stone-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-softblue-100 rounded-full peer peer-checked:bg-softblue-500 transition-colors"></div>
          <div className="absolute top-[2px] left-[2px] bg-white border border-stone-300 rounded-full h-7 w-7 transition-all peer-checked:translate-x-6 peer-checked:border-white"></div>
        </div>
      </label>
    </div>
  );
};