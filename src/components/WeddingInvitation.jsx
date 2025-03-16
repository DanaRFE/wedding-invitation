import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Church, Utensils, Map, Volume2, VolumeX } from 'lucide-react';

// Extracted reusable components
const Page = ({ children, className = "" }) => (
  <div className={`min-h-screen w-full flex items-center justify-center p-4 sm:p-8 relative bg-white ${className}`}>
    <div className="w-full max-w-md">
      {children}
    </div>
  </div>
);

const PageContent = ({ children, title, background }) => (
  <div className={`bg-white rounded-3xl overflow-hidden shadow-lg h-[700px] p-8 flex flex-col ${background ? 'relative' : ''}`}>
    {background && (
      <div className="absolute inset-0 z-0">
        <img src={background} alt="Background" className="w-full h-full object-cover" />
      </div>
    )}
    <div className="relative z-10 flex flex-col h-full pb-10">
      {title && <h2 className="text-2xl sm:text-3xl tracking-[0.2em] text-center mb-8 text-white">{title}</h2>}
      <div className="flex-grow overflow-y-auto">
        {children}
      </div>
    </div>
  </div>
);

// CountdownTimer component
const CountdownTimer = ({ weddingDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date(weddingDate);
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, [weddingDate]);

  return (
    <div className="bg-white rounded-lg shadow-lg px-6 py-4 mb-6 grid grid-cols-4 gap-4">
      <div className="text-center">
        <div className="text-3xl font-bold">{timeLeft.days}</div>
        <div className="text-sm">zile</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold">{timeLeft.hours}</div>
        <div className="text-sm">ore</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold">{timeLeft.minutes}</div>
        <div className="text-sm">minute</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold">{timeLeft.seconds}</div>
        <div className="text-sm">secunde</div>
      </div>
    </div>
  );
};

// Location component
const Location = ({ title, venue, time, mapQuery }) => (
  <div>
    <p className="font-semibold text-lg mb-0">{title}</p>
    <p className="mb-0">
      {typeof venue === 'string' 
        ? venue.split('"').map((text, i) => 
            i % 2 === 1 ? <em key={i}>{text}</em> : text
          )
        : venue}
    </p>
    <p className="italic mb-1">{time}</p>
    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`} 
       target="_blank" 
       rel="noopener noreferrer" 
       className="inline-block mt-0">
      <Map className="w-6 h-6 text-blue-600 hover:text-blue-800" />
    </a>
  </div>
);

// SaveTheDatePage component
const SaveTheDatePage = () => (
  <div className="bg-black rounded-3xl overflow-hidden shadow-lg h-[700px] relative">
    <div className="absolute inset-0 z-0">
      <img src="/prima.png" alt="Background" className="w-full h-full object-cover" />
    </div>
    <div className="relative z-10 p-8 h-full flex flex-col justify-between items-center text-center">
      <h1 className="font-script text-5xl text-black">Adina & Mihai</h1>
      <div className="font-script text-2xl text-black">
        <h1 className="font-script text-4xl text-black mb-6">Vom deveni o familie în</h1>
        <CountdownTimer weddingDate="2025-06-01T15:00:00" />
      </div>
    </div>
  </div>
);

// InvitationDetailsPage component
const InvitationDetailsPage = () => (
  <PageContent background="/frunze.png">
    <div className="text-center text-black">
      <h1 className="font-script text-5xl mb-2">A&M</h1>
      <div className="ring-container mb-6">
        <div className="rings-connected">
          <div className="ring ring-left ring-sparkle">
            <div className="diamond"></div>
          </div>
          <div className="ring ring-right ring-sparkle"></div>
        </div>
      </div>
      
      <p className="italic mb-4">Ne vom uni destinele alături de părinții noștri,</p>
      
      <div className="flex justify-between mb-6">
        <p className="font-bold">Gabriela și Sorin Puha</p>
        <p className="font-bold">Lăcrimioara și Dan Sposub</p>
      </div>
      
      <p className="italic mb-1">Și împreună cu nașii,</p>
      
      <div className="mb-8 flex justify-center">
        <div className="w-5/12 text-left">
          <p className="font-bold italic mb-3">Bianca și Ovidiu Prutean</p>
          <p className="font-bold italic">Adina și Bogdan Siminiuc</p>
        </div>
        <div className="w-5/12 text-right">
          <p className="font-bold italic mb-3">Daniela și Victor Romaniuc</p>
          <p className="font-bold italic">Victorița și Lucian Dumitriu</p>
        </div>
      </div>
      
      <p>Vă invităm să ne fiți alături în ziua nunții noastre,</p>
      
      <p className="font-script text-2xl mt-6">Duminică, 1 iunie 2025</p>
    </div>
  </PageContent>
);

// CouplePhotoPage component
const CouplePhotoPage = () => (
  <div className="bg-white rounded-3xl overflow-hidden shadow-lg h-[700px] relative">
    <div className="absolute inset-0 z-0">
      <img src="/couple-photo.png" alt="Couple Photo" className="w-full h-full object-cover" />
    </div>
    <div className="absolute bottom-10 w-full text-center z-10">
    </div>
  </div>
);

// LocationsAndConfirmationPage component
const LocationsAndConfirmationPage = () => (
  <PageContent background="/last.png">
    <div className="text-center space-y-3 text-black text-sm sm:text-base">
      <div>
        <h2 className="font-script text-3xl sm:text-4xl mb-3">Locații</h2>
        <div className="space-y-4">
          <Location 
            title="Ceremonia religioasă" 
            venue="Biserica `Nașterea Maicii Domnului` - Frătăuții Noi" 
            time="Ora 15:00" 
            mapQuery="Biserica Nașterea Maicii Domnului Frătăuții Noi" 
          />
          <Location 
            title="Petrecerea" 
            venue="Restaurant `Golden Forest` - Sucevița" 
            time="Ora 18:00" 
            mapQuery="Restaurant Golden Forest Sucevița" 
          />
        </div>
      </div>

      <div>
        <h2 className="font-script text-3xl sm:text-4xl mb-2">Confirmare</h2>
        <p className="mb-0">Vă rugăm să ne confirmați prezența până la data de</p>
        <p className="italic text-amber-800 mb-3 font-medium">10 mai 2025</p>
        <p className="font-bold mb-0">Adina: 0743 378 074</p>
        <p className="font-bold mb-3">Mihai: 0752 557 033</p>
        <p className="font-script text-2xl sm:text-3xl mb-2">Vă așteptăm cu drag!</p>
      </div>
    </div>
  </PageContent>
);

// Main component
const WeddingInvitation = () => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => {
          console.error('Auto-play prevented by browser:', e);
        });
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  return (
    <div className="font-['Raleway'] min-h-screen flex flex-col">
      {/* Background music */}
      <audio ref={audioRef} loop>
        <source src="/wedding-song.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      
      {/* Music control button */}
      <button 
        onClick={toggleMusic}
        className="fixed bottom-4 right-4 z-50 bg-white bg-opacity-70 rounded-full p-3 shadow-md focus:outline-none hover:bg-opacity-100 transition-colors"
        aria-label={isMusicPlaying ? "Pause music" : "Play music"}
      >
        {isMusicPlaying ? (
          <Volume2 size={20} className="text-black" />
        ) : (
          <VolumeX size={20} className="text-black" />
        )}
      </button>
      
      <Page>
        <SaveTheDatePage />
      </Page>

      <Page>
        <CouplePhotoPage />
      </Page>

      <Page>
        <InvitationDetailsPage />
      </Page>

      <Page>
        <LocationsAndConfirmationPage />
      </Page>
    </div>
  );
};

// Custom CSS styles
const CustomStyles = () => {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Alex+Brush&display=swap');
      
      .font-script {
        font-family: 'Alex Brush', cursive;
      }
      
      @keyframes sparkle {
        0%, 100% { opacity: 0.2; }
        50% { opacity: 1; }
      }
      
      .ring-sparkle {
        animation: sparkle 2s ease-in-out infinite;
      }
      
      .ring-container {
        position: relative;
        display: inline-block;
      }
      
      .rings-connected {
        position: relative;
        width: 120px;
        height: 60px;
        margin: 0 auto;
      }
      
      .ring {
        position: absolute;
        width: 50px;
        height: 50px;
        border: 3px solid #D4AF37;
        border-radius: 50%;
      }
      
      .ring-left {
        left: 10px;
        top: 5px;
      }
      
      .ring-right {
        right: 10px;
        top: 5px;
      }
      
      .diamond {
        position: absolute;
        width: 16px;
        height: 16px;
        background-color: #FFFFFF;
        border: 1px solid #D4AF37;
        transform: rotate(45deg);
        top: -8px;
        left: 17px;
        box-shadow: 0 0 8px rgba(255, 215, 0, 0.8);
        animation: sparkle 1.5s ease-in-out infinite;
      }
    `}</style>
  );
};

// Wrapper component
const WeddingInvitationWithStyles = () => (
  <div className="bg-gray-100 min-h-screen flex items-center justify-center">
    <div className="w-full max-w-[1000px] mx-auto relative z-10">
      <CustomStyles />
      <WeddingInvitation />
    </div>
  </div>
);

export default WeddingInvitationWithStyles;