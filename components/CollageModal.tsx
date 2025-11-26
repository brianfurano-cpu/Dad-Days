

import React, { useEffect, useState } from 'react';
import { TripOption, Voter } from '../types';

interface CollageModalProps {
  trip: TripOption;
  isSelected: boolean;
  voter: Voter;
  isYayaJoining: boolean;
  onClose: () => void;
  onSelect: (id: string) => void;
}

export const CollageModal: React.FC<CollageModalProps> = ({ trip, isSelected, voter, isYayaJoining, onClose, onSelect }) => {
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxUrl) {
          setLightboxUrl(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose, lightboxUrl]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleVote = () => {
    onSelect(trip.id);
    
    // Construct SMS body
    const yayaText = isYayaJoining ? " (and Yaya should come too!)" : "";
    const body = `Hey Dad! It's ${voter}. I vote for ${trip.title.split(':')[1].trim()}!${yayaText} 💖`;
    
    // Open SMS app
    window.open(`sms:?&body=${encodeURIComponent(body)}`, '_self');
    
    onClose();
  };

  const renderMedia = (url: string, alt: string, isLightbox = false) => {
    const isVideo = url.endsWith('.mp4');
    
    if (isVideo) {
      return (
        <video 
          src={url} 
          controls 
          className={`w-full h-full object-cover ${!isLightbox ? 'cursor-pointer' : ''}`}
          playsInline
          onClick={(e) => {
            if (!isLightbox) {
              e.preventDefault();
              setLightboxUrl(url);
            }
          }}
        />
      );
    }
    
    return (
      <img 
        src={url} 
        alt={alt} 
        className={`w-full h-full object-cover transition-transform duration-700 ${!isLightbox ? 'hover:scale-105 cursor-zoom-in' : ''}`}
        onClick={() => !isLightbox && setLightboxUrl(url)}
      />
    );
  };

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity" 
          onClick={onClose}
        />

        {/* Modal Content */}
        <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-[fadeIn_0.3s_ease-out]">
          
          {/* Header */}
          <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-white z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-warm-800">
              {trip.title}
            </h2>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-stone-100 transition-colors text-stone-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <p className="text-lg text-stone-600 mb-8 max-w-2xl leading-relaxed">
              Here's a little peek at what this trip might look like...
            </p>

            {/* Mosaic Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
               {/* Main large image */}
               <div className="col-span-2 row-span-2 aspect-square md:aspect-auto rounded-2xl overflow-hidden shadow-sm group relative">
                  {renderMedia(trip.imageUrl, trip.imageAlt)}
                  <div className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
               </div>
               
               {/* Gallery images */}
               {trip.galleryUrls.map((url, idx) => (
                  <div key={idx} className={`rounded-xl overflow-hidden shadow-sm aspect-square relative group ${idx === 0 ? 'md:col-span-2' : ''}`}>
                    {renderMedia(url, `Gallery ${idx}`)}
                    <div className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
               ))}
            </div>

            <div className="bg-stone-50 rounded-2xl p-6 mb-4">
              <h3 className="font-bold text-warm-800 mb-3">Highlights</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {trip.description.map((item, i) => (
                  <li key={i} className="flex items-start text-stone-600">
                     <span className="text-softblue-500 mr-2">✦</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-stone-100 bg-white flex flex-col sm:flex-row gap-4 items-center justify-between">
             <p className="text-stone-500 text-sm hidden sm:block">
               Signed in as <strong className="text-softblue-600">{voter}</strong>
             </p>
             <div className="flex w-full sm:w-auto gap-3">
               <button 
                 onClick={onClose}
                 className="flex-1 sm:flex-none px-6 py-3 rounded-xl border border-stone-200 text-stone-600 font-bold hover:bg-stone-50 transition-colors"
               >
                 Close
               </button>
               <button 
                 onClick={handleVote}
                 className={`
                   flex-1 sm:flex-none px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all transform hover:-translate-y-1
                   bg-softblue-500 hover:bg-softblue-600 flex items-center justify-center gap-2
                 `}
               >
                 <span>Text Dad my Vote!</span>
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                  </svg>
               </button>
             </div>
          </div>
        </div>
      </div>

      {/* Lightbox Overlay */}
      {lightboxUrl && (
        <div 
          className="fixed inset-0 z-[150] bg-black/95 flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]"
          onClick={() => setLightboxUrl(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            onClick={() => setLightboxUrl(null)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div 
            className="w-full h-full flex items-center justify-center" 
            onClick={(e) => e.stopPropagation()} // Allow clicking image/video controls without closing
          >
             {renderMedia(lightboxUrl, "Enlarged view", true)}
          </div>
        </div>
      )}
    </>
  );
};