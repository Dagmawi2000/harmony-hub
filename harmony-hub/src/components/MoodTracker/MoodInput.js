'use client';
import { useState } from 'react';
import { auth, db } from '../../utils/firebase';
import { addDoc, collection } from 'firebase/firestore';

export default function MoodInput() {
  const [mood, setMood] = useState('');
  const [note, setNote] = useState('');

  const moods = [
    { emoji: '😊', label: 'Happy' },
    { emoji: '😌', label: 'Calm' },
    { emoji: '😔', label: 'Sad' },
    { emoji: '😤', label: 'Frustrated' },
    { emoji: '😴', label: 'Tired' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mood) return;

    try {
      await addDoc(collection(db, 'moods'), {
        userId: auth.currentUser.uid,
        mood,
        note,
        timestamp: new Date().toISOString()
      });
      setMood('');
      setNote('');
    } catch (error) {
      console.error('Error saving mood:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">How are you feeling?</h3>
      <div className="grid grid-cols-5 gap-2 mb-4">
        {moods.map(({ emoji, label }) => (
          <button
            key={label}
            onClick={() => setMood(label)}
            className={`p-2 rounded-lg text-center ${
              mood === label ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <div className="text-2xl mb-1">{emoji}</div>
            <div className="text-xs">{label}</div>
          </button>
        ))}
      </div>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Add a note about how you're feeling..."
        className="w-full p-2 border rounded-md mb-4"
        rows="3"
      />
      <button
        onClick={handleSubmit}
        className="w-full btn-primary"
        disabled={!mood}
      >
        Save Mood
      </button>
    </div>
  );
}