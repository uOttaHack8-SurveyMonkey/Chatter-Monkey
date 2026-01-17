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

      return new Promise((resolve) => {
        audio.onended = () => {
          setIsSpeaking(false);
          setIsListening(true);
          resolve();
        };
        audio.play();
      });
    } catch (error) {
      console.error("Error generating speech:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
      setIsSpeaking(false);
      setIsListening(true);
    }
  };

  const speakIntro = () => {
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
            {isSpeaking ? '🗣️ Speaking...' : isListening ? '🎧 Listening...' : 'Idle'}
          </p>
        </div>
      )}
    </div>
  );
}


// 'use client';

// import { useState } from 'react';
// import styles from './ChatterMonkey.module.css';

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

//   const speakIntro = () => {
//     const utter = new SpeechSynthesisUtterance(introText);
    
//     utter.onstart = () => {
//       setIsSpeaking(true);
//       setIsListening(false);
//     };
    
//     utter.onend = () => {
//       setIsSpeaking(false);
//       setIsListening(true);
//     };
    
//     speechSynthesis.speak(utter);
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