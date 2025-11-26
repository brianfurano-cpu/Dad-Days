
import React, { useState, useEffect } from 'react';
import { TRIPS, STORAGE_KEY } from './constants';
import { AppState, TripId, TripOption, Voter } from './types';
import { YayaToggle } from './components/YayaToggle';
import { TripCard } from './components/TripCard';
import { CollageModal } from './components/CollageModal';
import { VoterToggle } from './components/VoterToggle';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    selectedTripId: null,
    isYayaJoining: false,
    voter: 'Mayla' // Default
  });

  const [viewingTrip, setViewingTrip] = useState<TripOption | null>(null);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure voter exists in old saved data
        if (!parsed.voter) parsed.voter = 'Mayla';
        setState(parsed);
      } catch (e) {
        console.error("Failed to parse saved preferences", e);
      }
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const handleTripSelect = (id: string) => {
    setState(prev => ({ ...prev, selectedTripId: id as TripId }));
  };

  const handleYayaToggle = (isJoining: boolean) => {
    setState(prev => ({ ...prev, isYayaJoining: isJoining }));
  };
  
  const handleVoterToggle = (voter: Voter) => {
    setState(prev => ({ ...prev, voter: voter }));
  };

  const selectedTrip = TRIPS.find(t => t.id === state.selectedTripId);

  return (
    <div className="min-h-screen pb-32">
      {/* Header / Intro */}
      <header className="px-6 pt-12 pb-8 max-w-4xl mx-auto text-center">
        
        {/* Personal Photos */}
        <div className="flex flex-wrap justify-center items-center mb-10 -space-x-4 sm:space-x-0 sm:gap-4">
           {/* 1. Dad and Daughters */}
           <div className="relative transform -rotate-6 hover:rotate-0 transition-transform duration-300 z-10 hover:z-20">
             <img 
               src="https://i.imgur.com/LB3hV1A.jpeg" 
               alt="Dad and Daughters" 
               className="w-28 h-28 sm:w-40 sm:h-40 object-cover rounded-xl shadow-xl border-[5px] border-white"
             />
           </div>
           
           {/* 2. Travelin Girls */}
           <div className="relative transform rotate-3 hover:rotate-0 transition-transform duration-300 z-10 hover:z-20">
             <img 
               src="https://i.imgur.com/NIeIhOE.jpeg" 
               alt="Travelin Girls" 
               className="w-28 h-28 sm:w-40 sm:h-40 object-cover rounded-xl shadow-xl border-[5px] border-white"
             />
           </div>

           {/* 3. Len Bri and May (New) */}
           <div className="relative transform -rotate-2 hover:rotate-0 transition-transform duration-300 z-10 hover:z-20">
             <img 
               src="https://i.imgur.com/g3qfen7.jpeg" 
               alt="Len Bri and May" 
               className="w-28 h-28 sm:w-40 sm:h-40 object-cover rounded-xl shadow-xl border-[5px] border-white"
             />
           </div>

           {/* 4. The Girls Len and May */}
           <div className="relative transform rotate-6 hover:rotate-0 transition-transform duration-300 z-10 hover:z-20">
             <img 
               src="https://i.imgur.com/nTfGa8s.jpeg" 
               alt="The Girls" 
               className="w-28 h-28 sm:w-40 sm:h-40 object-cover rounded-xl shadow-xl border-[5px] border-white"
             />
           </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-warm-800 mb-6 tracking-tight">
          A Little Adventure for Mayla & Lennon?
        </h1>
        <div className="space-y-4 text-lg md:text-xl text-stone-600 leading-relaxed">
          <p>
            I’d love to spend 2–3 days with you both between <strong className="text-warm-800">December 31st</strong> and <strong className="text-warm-800">January 4th</strong>.
          </p>
          <p>Here are three ideas we can choose from together.</p>
          <p className="text-sm md:text-base text-stone-500 italic mt-2">
            (Yaya can join ANY of these if that would make it more fun)
          </p>
          <p className="font-handwriting text-3xl text-softblue-600 mt-6 pt-4">
            Love, Dad
          </p>
        </div>
      </header>

      {/* Toggles Section */}
      <section className="max-w-xl mx-auto mb-10 px-4 space-y-6">
        {/* Voter Toggle */}
        <VoterToggle 
          currentVoter={state.voter} 
          onToggle={handleVoterToggle} 
        />
        
        {/* Yaya Toggle */}
        <YayaToggle 
          isJoined={state.isYayaJoining} 
          onToggle={handleYayaToggle} 
        />
      </section>

      {/* Cards Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TRIPS.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
              isSelected={state.selectedTripId === trip.id}
              voter={state.voter}
              onLearnMore={setViewingTrip}
            />
          ))}
        </div>
      </main>

      {/* Collage Modal */}
      {viewingTrip && (
        <CollageModal
          trip={viewingTrip}
          isSelected={state.selectedTripId === viewingTrip.id}
          voter={state.voter}
          isYayaJoining={state.isYayaJoining}
          onClose={() => setViewingTrip(null)}
          onSelect={handleTripSelect}
        />
      )}

      {/* Sticky Summary Footer */}
      <div 
        className={`
          fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-stone-200 p-6 shadow-[0_-8px_30px_rgba(0,0,0,0.05)] transition-transform duration-500 ease-in-out z-50
          ${state.selectedTripId ? 'translate-y-0' : 'translate-y-full'}
        `}
      >
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-stone-500 text-sm font-semibold uppercase tracking-wider mb-2">
            Current Vote
          </h3>
          <p className="text-2xl md:text-3xl text-warm-800 font-bold mb-2">
            {state.voter} is leaning toward: {selectedTrip ? selectedTrip.title.split(':')[1] || selectedTrip.title : '...'}
          </p>
          <div className="flex items-center justify-center gap-2 text-stone-600 mb-2">
             <span className={`px-3 py-1 rounded-full text-sm font-medium ${state.isYayaJoining ? 'bg-softblue-100 text-softblue-700' : 'bg-stone-100 text-stone-500'}`}>
               {state.isYayaJoining ? 'With Yaya' : 'Just Us'}
             </span>
          </div>
          <p className="text-stone-400 text-sm mt-2">
            Click "Learn More & Vote" to text Dad!
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
