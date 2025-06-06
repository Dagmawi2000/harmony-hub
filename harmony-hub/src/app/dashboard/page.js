'use client';
import { useEffect, useState } from 'react';
import { auth, db } from '../../utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        setUser({ ...user, ...userDoc.data() });
      } else {
        router.push('/auth/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Harmony Hub</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => auth.signOut()}
                className="ml-4 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Daily Mindfulness Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-900">Daily Mindfulness</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Take a moment to breathe and center yourself.
                </p>
                <button className="mt-4 btn-primary">Start Exercise</button>
              </div>
            </div>

            {/* Mood Tracker Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-900">Mood Tracker</h3>
                <p className="mt-2 text-sm text-gray-600">
                  How are you feeling today?
                </p>
                <button className="mt-4 btn-secondary">Log Mood</button>
              </div>
            </div>

            {/* Community Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-900">Community</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Connect with your micro-community.
                </p>
                <button className="mt-4 btn-primary">View Community</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}