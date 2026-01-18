'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ChatterMonkey.module.css';

const ELEVEN_API_KEY = process.env.NEXT_PUBLIC_ELEVEN_API_KEY;
const VOICE_ID = "cDPnVvi9OUoTtLoEBZkr";

export default function ChatterMonkey() {
  const [callStatus, setCallStatus] = useState('start'); // Start with begin button
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [subtitle, setSubtitle] = useState('');
  const [showButtons, setShowButtons] = useState(false);
  const [rating, setRating] = useState(0);
  const [hasPlayedDisclaimer, setHasPlayedDisclaimer] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const disclaimerText =
    "Hi, this is Chatter Monkey, a dynamic AI calling on behalf of Caffeine Cafe. " +
    "Your voice is not being recorded, only your answers are being transcribed anonymously. " +
    "This conversation can end at any time as per your request.";

  const greetingText = "Hey, how's it going?";

  const handleBegin = () => {
    setCallStatus('disclaimer');
  };

  const handleAnswer = () => {
    setCallStatus('active');
    setShowButtons(false);
    speakText(greetingText);
  };

  const handleDecline = () => {
    setCallStatus('rating');
    setShowButtons(false);
  };

  const handleRating = (stars) => {
    setRating(stars);
    console.log('User rated:', stars, 'stars');
  };

  const speakWithElevenLabs = async (text, onComplete) => {
    // Guard against SSR
    if (typeof window === 'undefined') {
      console.log('Skipping audio in SSR');
      return;
    }

    try {
      console.log('Using Voice ID:', VOICE_ID);
      console.log('API Key exists:', !!ELEVEN_API_KEY);
      
      setIsSpeaking(true);
      setIsListening(false);
      setSubtitle('');

      const response = await axios.post(
        `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
        { text },
        {
          responseType: "arraybuffer",
          headers: {
            "xi-api-key": ELEVEN_API_KEY,
            "Content-Type": "application/json",
            Accept: "audio/mpeg",
          },
        }
      );

      console.log('Audio received successfully');

      const audioBlob = new Blob([response.data], { type: "audio/mpeg" });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);

      // Animate subtitles word by word
      const words = text.split(' ').filter(word => word.length > 0);
      let currentIndex = 0;
      let subtitleInterval = null;
      
      audio.play();

      // Calculate timing based on audio duration
      audio.addEventListener('loadedmetadata', () => {
        const duration = audio.duration * 1000;
        const timePerWord = duration / words.length;

        subtitleInterval = setInterval(() => {
          if (currentIndex >= words.length) {
            clearInterval(subtitleInterval);
            return;
          }
          
          const word = words[currentIndex];
          if (word !== undefined) {
            setSubtitle(prev => {
              return prev ? prev + ' ' + word : word;
            });
          }
          currentIndex++;
        }, timePerWord);
      });

      return new Promise((resolve) => {
        audio.onended = () => {
          if (subtitleInterval !== null) {
            clearInterval(subtitleInterval);
          }
          setIsSpeaking(false);
          setSubtitle('');
          
          setTimeout(() => {
            setIsListening(true);
            if (onComplete) {
              onComplete();
            }
          }, 500);
          
          resolve();
        };
      });
    } catch (error) {
      console.error("Error generating speech:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
      setIsSpeaking(false);
      setIsListening(true);
      setSubtitle('');
    }
  };

  const speakText = (text, onComplete) => {
    speakWithElevenLabs(text, onComplete);
  };

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto-play disclaimer on component mount (client-side only)
  useEffect(() => {
    if (isMounted && callStatus === 'disclaimer' && !hasPlayedDisclaimer) {
      setHasPlayedDisclaimer(true);
      
      // Play disclaimer, then show buttons
      speakText(disclaimerText, () => {
        setShowButtons(true);
      });
    }
  }, [isMounted, callStatus, hasPlayedDisclaimer]);

  return (
    <div className={styles.container}>
      {/* Begin Screen - Initial start button */}
      {callStatus === 'start' && (
        <div className={styles.screen}>
          <div className={styles.avatar}>
            <div className={`${styles.ear} ${styles.left}`}></div>
            <div className={`${styles.ear} ${styles.right}`}></div>
            <div className={styles.monkeyHead}></div>
            <div className={styles.faceArea}>
              <div className={`${styles.eye} ${styles.left}`}></div>
              <div className={`${styles.eye} ${styles.right}`}></div>
              <div className={styles.nose}></div>
              <div className={styles.mouth}></div>
            </div>
          </div>
          <div className={styles.buttons}>
            <button className={styles.answer} onClick={handleBegin}>
              Begin Call
            </button>
          </div>
        </div>
      )}

      {/* Disclaimer Screen - Monkey speaks, then buttons appear */}
      {callStatus === 'disclaimer' && (
        <div className={styles.screen}>
          <div className={`${styles.avatar} ${isListening ? styles.listening : ''}`}>
            <div className={`${styles.ear} ${styles.left}`}></div>
            <div className={`${styles.ear} ${styles.right}`}></div>
            <div className={styles.monkeyHead}></div>
            <div className={styles.faceArea}>
              <div className={`${styles.eye} ${styles.left}`}></div>
              <div className={`${styles.eye} ${styles.right}`}></div>
              <div className={styles.nose}></div>
              <div className={`${styles.mouth} ${isSpeaking ? styles.open : ''}`}></div>
            </div>
          </div>
          {subtitle && (
            <div className={styles.subtitle}>
              {subtitle}
            </div>
          )}
          {showButtons && (
            <div className={styles.buttons}>
              <button className={styles.answer} onClick={handleAnswer}>
                Answer
              </button>
              <button className={styles.decline} onClick={handleDecline}>
                Decline
              </button>
            </div>
          )}
        </div>
      )}

      {/* Active Call Screen - Normal conversation */}
      {callStatus === 'active' && (
        <div className={styles.screen}>
          <div className={`${styles.avatar} ${isListening ? styles.listening : ''}`}>
            <div className={`${styles.ear} ${styles.left}`}></div>
            <div className={`${styles.ear} ${styles.right}`}></div>
            <div className={styles.monkeyHead}></div>
            <div className={styles.faceArea}>
              <div className={`${styles.eye} ${styles.left}`}></div>
              <div className={`${styles.eye} ${styles.right}`}></div>
              <div className={styles.nose}></div>
              <div className={`${styles.mouth} ${isSpeaking ? styles.open : ''}`}></div>
            </div>
          </div>
          <p className={styles.status}>
            {isSpeaking ? '🗣️ Speaking...' : isListening ? '🎧 Listening...' : 'Idle'}
          </p>
          {subtitle && (
            <div className={styles.subtitle}>
              {subtitle}
            </div>
          )}
        </div>
      )}

      {/* Rating Screen - 5 star rating */}
      {callStatus === 'rating' && (
        <div className={styles.screen}>
          <h2>Rate Your Experience</h2>
          <div className={styles.starRating}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className={`${styles.star} ${rating >= star ? styles.filled : ''}`}
                onClick={() => handleRating(star)}
              >
                ★
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className={styles.thankYou}>Thank you for your feedback!</p>
          )}
        </div>
      )}
    </div>
  );
}
// 'use client';

// import { useState } from 'react';
// import axios from 'axios';
// import styles from './ChatterMonkey.module.css';

// const ELEVEN_API_KEY = process.env.NEXT_PUBLIC_ELEVEN_API_KEY;
// const VOICE_ID = "cDPnVvi9OUoTtLoEBZkr";

// export default function ChatterMonkey() {
//   const [callStatus, setCallStatus] = useState('incoming');
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [isListening, setIsListening] = useState(false);
//   const [subtitle, setSubtitle] = useState('');

//   const introText =
//     "Hi, this is Chatter Monkey, a dynamic AI calling on behalf of Caffeine Cafe. " +
//     "Your voice is not being recorded, only your answers are being transcribed anonymously. " +
//     "This conversation can end at any time as per your request.";

//   const handleAnswer = () => {
//     setCallStatus('active');
//     speakIntro();
//   };

//   const handleDecline = () => {
//     setCallStatus('declined');
//   };

//   const speakWithElevenLabs = async (text) => {
//     try {
//       console.log('Using Voice ID:', VOICE_ID);
//       console.log('API Key exists:', !!ELEVEN_API_KEY);
      
//       setIsSpeaking(true);
//       setIsListening(false);
//       setSubtitle('');

//       const response = await axios.post(
//         `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
//         { text },
//         {
//           responseType: "arraybuffer",
//           headers: {
//             "xi-api-key": ELEVEN_API_KEY,
//             "Content-Type": "application/json",
//             Accept: "audio/mpeg",
//           },
//         }
//       );

//       console.log('Audio received successfully');

//       const audioBlob = new Blob([response.data], { type: "audio/mpeg" });
//       const audioUrl = URL.createObjectURL(audioBlob);
//       const audio = new Audio(audioUrl);

//       // Animate subtitles word by word
//       const words = text.split(' ').filter(word => word.length > 0);
//       let currentIndex = 0;
//       let subtitleInterval = null;
      
//       audio.play();

//       // Calculate timing based on audio duration
//       audio.addEventListener('loadedmetadata', () => {
//         const duration = audio.duration * 1000;
//         const timePerWord = duration / words.length;

//         subtitleInterval = setInterval(() => {
//           if (currentIndex >= words.length) {
//             clearInterval(subtitleInterval);
//             return;
//           }
          
//           const word = words[currentIndex];
//           if (word !== undefined) {
//             setSubtitle(prev => {
//               return prev ? prev + ' ' + word : word;
//             });
//           }
//           currentIndex++;
//         }, timePerWord);
//       });

//       return new Promise((resolve) => {
//         audio.onended = () => {
//           if (subtitleInterval !== null) {
//             clearInterval(subtitleInterval);
//           }
//           setIsSpeaking(false);
//           setSubtitle('');
          
//           // Add a slight pause before switching to listening state
//           setTimeout(() => {
//             setIsListening(true);
//           }, 700); // 500ms pause
          
//           resolve();
//         };
//       });
//     } catch (error) {
//       console.error("Error generating speech:", error);
//       console.error("Error response:", error.response?.data);
//       console.error("Error status:", error.response?.status);
//       setIsSpeaking(false);
//       setIsListening(true);
//       setSubtitle('');
//     }
//   };

//   const speakIntro = () => {
//     console.log('speakIntro called');
//     console.log('Intro text:', introText);
//     speakWithElevenLabs(introText);
//   };

//   return (
//     <div className={styles.container}>
//       {callStatus === 'incoming' && (
//         <div className={styles.screen}>
//           <h2>📞 Incoming Call</h2>
//           <p>Chatter Monkey</p>
//           <div className={styles.buttons}>
//             <button className={styles.answer} onClick={handleAnswer}>
//               Answer
//             </button>
//             <button className={styles.decline} onClick={handleDecline}>
//               Decline
//             </button>
//           </div>
//         </div>
//       )}

//       {callStatus === 'declined' && (
//         <div className={styles.screen}>
//           <h2>Call Declined</h2>
//         </div>
//       )}

//       {callStatus === 'active' && (
//         <div className={styles.screen}>
//           <div className={`${styles.avatar} ${isListening ? styles.listening : ''}`}>
//             <div className={`${styles.ear} ${styles.left}`}></div>
//             <div className={`${styles.ear} ${styles.right}`}></div>
//             <div className={styles.monkeyHead}></div>
//             <div className={styles.faceArea}>
//               <div className={`${styles.eye} ${styles.left}`}></div>
//               <div className={`${styles.eye} ${styles.right}`}></div>
//               <div className={styles.nose}></div>
//               <div className={`${styles.mouth} ${isSpeaking ? styles.open : ''}`}></div>
//             </div>
//           </div>
//           <p className={styles.status}>
//             {isSpeaking ? '🗣️ Speaking...' : isListening ? '🎧 Listening...' : ''}
//           </p>
//           {subtitle && (
//             <div className={styles.subtitle}>
//               {subtitle}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }