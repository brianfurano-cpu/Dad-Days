
import React from 'react';
import { Voter } from '../types';

interface VoterToggleProps {
  currentVoter: Voter;
  onToggle: (voter: Voter) => void;
}

export const VoterToggle: React.FC<VoterToggleProps> = ({ currentVoter, onToggle }) => {
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <span className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-3">Who is voting?</span>
      <div className="flex bg-white p-1 rounded-full border border-stone-200 shadow-sm relative">
        {/* Sliding Background */}
        <div 
          className={`absolute top-1 bottom-1 w-[50%] rounded-full bg-softblue-500 transition-all duration-300 ease-in-out shadow-md
            ${currentVoter === 'Lennon' ? 'left-[48%] translate-x-0' : 'left-1 translate-x-0'}
          `}
        ></div>

        <button
          onClick={() => onToggle('Mayla')}
          className={`
            relative z-10 px-8 py-2 rounded-full font-bold text-lg transition-colors duration-300 w-32
            ${currentVoter === 'Mayla' ? 'text-white' : 'text-stone-500 hover:text-stone-700'}
          `}
        >
          Mayla
        </button>
        <button
          onClick={() => onToggle('Lennon')}
          className={`
            relative z-10 px-8 py-2 rounded-full font-bold text-lg transition-colors duration-300 w-32
            ${currentVoter === 'Lennon' ? 'text-white' : 'text-stone-500 hover:text-stone-700'}
          `}
        >
          Lennon
        </button>
      </div>
    </div>
  );
};
