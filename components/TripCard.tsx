
import React from 'react';
import { TripOption, Voter } from '../types';

interface TripCardProps {
  trip: TripOption;
  isSelected: boolean;
  voter: Voter;
  onLearnMore: (trip: TripOption) => void;
}

export const TripCard: React.FC<TripCardProps> = ({ trip, isSelected, voter, onLearnMore }) => {
  return (
    <div 
      className={`
        relative group flex flex-col overflow-hidden rounded-3xl transition-all duration-300
        bg-white border
        ${isSelected 
          ? 'border-softblue-500 shadow-xl ring-4 ring-softblue-100 translate-y-[-4px]' 
          : 'border-stone-100 shadow-md hover:shadow-lg hover:border-stone-200 hover:translate-y-[-2px]'
        }
      `}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4 z-10 bg-softblue-500 text-white px-3 py-1 rounded-full shadow-lg animate-bounce font-bold text-sm">
          {voter}'s Pick!
        </div>
      )}

      {/* Image Section */}
      <div 
        className="h-48 sm:h-56 overflow-hidden relative cursor-pointer"
        onClick={() => onLearnMore(trip)}
      >
        <img 
          src={trip.imageUrl} 
          alt={trip.imageAlt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        
        {/* Hover overlay hint */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <span className="bg-white/90 text-warm-900 text-sm font-bold px-4 py-2 rounded-full shadow-sm">
             See Photos
           </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className={`text-2xl font-bold mb-4 ${isSelected ? 'text-softblue-600' : 'text-warm-800'}`}>
          {trip.title}
        </h3>
        
        <ul className="space-y-3 mb-8 flex-1">
          {trip.description.map((item, index) => (
            <li key={index} className="flex items-start text-stone-600 leading-relaxed">
              <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-stone-300"></span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={() => onLearnMore(trip)}
          className={`
            w-full py-4 rounded-xl font-bold text-lg transition-all duration-300
            ${isSelected 
              ? 'bg-softblue-50 text-softblue-700 ring-2 ring-softblue-200 hover:bg-softblue-100' 
              : 'bg-stone-100 text-stone-600 hover:bg-stone-800 hover:text-white'
            }
          `}
        >
          Learn More & Vote
        </button>
      </div>
    </div>
  );
};
