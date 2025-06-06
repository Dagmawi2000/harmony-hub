'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../providers';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
