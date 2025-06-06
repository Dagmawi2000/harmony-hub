'use client';
import { useState } from 'react';
import { db } from '../../utils/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function GroupCard({ group }) {
  const [message, setMessage] = useState('');

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await addDoc(collection(db, `groups/${group.id}/messages`), {
        text: message,
        userId: auth.currentUser.uid,
        timestamp: new Date().toISOString()
      });
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">{group?.name || 'Wellness Group'}</h3>
        <span className="text-sm text-gray-500">{group?.members?.length || 0} members</span>
      </div>
      <div className="border-t border-gray-200 pt-4">
        <div className="space-y-4 max-h-60 overflow-y-auto mb-4">
          {group?.messages?.map((msg, index) => (
            <div key={index} className="flex space-x-3">
              <div className="flex-1 bg-gray-100 rounded-lg p-3">
                <p className="text-sm text-gray-800">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="mt-4 flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Send a message..."
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
          <button
            type="submit"
            className="btn-primary"
            disabled={!message.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}