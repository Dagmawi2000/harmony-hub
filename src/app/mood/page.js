'use client';
import MoodInput from '../../components/MoodTracker/MoodInput';
import { useEffect, useState } from 'react';
import { auth, db } from '../../utils/firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';

export default function MoodPage() {
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    const fetchMoods = async () => {
      if (!auth.currentUser) return;

      const q = query(
        collection(db, 'moods'),
        where('userId', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const moodData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMoods(moodData);
    };

    fetchMoods();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Mood Tracker</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <MoodInput />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Your Mood History</h3>
          <div className="space-y-4">
            {moods.map((mood) => (
              <div key={mood.id} className="border-b pb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{mood.mood}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(mood.timestamp).toLocaleDateString()}
                  </span>
                </div>
                {mood.note && (
                  <p className="text-gray-600 text-sm">{mood.note}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}