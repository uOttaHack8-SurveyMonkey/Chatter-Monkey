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

//       return new Promise((resolve) => {
//         audio.onended = () => {
//           setIsSpeaking(false);
//           setIsListening(true);
//           resolve();
//         };
//         audio.play();
//       });
//     } catch (error) {
//       console.error("Error generating speech:", error);
//       console.error("Error response:", error.response?.data);
//       console.error("Error status:", error.response?.status);
//       setIsSpeaking(false);
//       setIsListening(true);
//     }
//   };

//   const speakIntro = () => {
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
//             {isSpeaking ? '🗣️ Speaking...' : isListening ? '🎧 Listening...' : 'Idle'}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }
'use client';

import { useState } from 'react';
import axios from 'axios';
import styles from './ChatterMonkey.module.css';

const ELEVEN_API_KEY = process.env.NEXT_PUBLIC_ELEVEN_API_KEY;
const VOICE_ID = "cDPnVvi9OUoTtLoEBZkr";

export default function ChatterMonkey() {
  const [callStatus, setCallStatus] = useState('incoming');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [subtitle, setSubtitle] = useState('');

  const introText =
    "Hi, this is Chatter Monkey, a dynamic AI calling on behalf of Caffeine Cafe. " +
    "Your voice is not being recorded, only your answers are being transcribed anonymously. " +
    "This conversation can end at any time as per your request.";

  const handleAnswer = () => {
    setCallStatus('active');
    speakIntro();
  };

  const handleDecline = () => {
    setCallStatus('declined');
  };

  const speakWithElevenLabs = async (text) => {
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
          
          // Add a slight pause before switching to listening state
          setTimeout(() => {
            setIsListening(true);
          }, 700); // 500ms pause
          
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

  const speakIntro = () => {
    console.log('speakIntro called');
    console.log('Intro text:', introText);
    speakWithElevenLabs(introText);
  };

  return (
    <div className={styles.container}>
      {callStatus === 'incoming' && (
        <div className={styles.screen}>
          <h2>📞 Incoming Call</h2>
          <p>Chatter Monkey</p>
          <div className={styles.buttons}>
            <button className={styles.answer} onClick={handleAnswer}>
              Answer
            </button>
            <button className={styles.decline} onClick={handleDecline}>
              Decline
            </button>
          </div>
        </div>
      )}

      {callStatus === 'declined' && (
        <div className={styles.screen}>
          <h2>Call Declined</h2>
        </div>
      )}

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
            {isSpeaking ? '🗣️ Speaking...' : isListening ? '🎧 Listening...' : ''}
          </p>
          {subtitle && (
            <div className={styles.subtitle}>
              {subtitle}
            </div>
          )}
        </div>
      )}
    </div>
  );
}