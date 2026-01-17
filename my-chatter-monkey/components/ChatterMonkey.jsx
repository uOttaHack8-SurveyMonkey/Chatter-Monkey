'use client';

import { useState } from 'react';
import styles from './ChatterMonkey.module.css';

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

  const speakIntro = () => {
    const utter = new SpeechSynthesisUtterance(introText);
    
    utter.onstart = () => {
      setIsSpeaking(true);
      setIsListening(false);
    };
    
    utter.onend = () => {
      setIsSpeaking(false);
      setIsListening(true);
    };
    
    speechSynthesis.speak(utter);
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