'use client';
import { useEffect, useState } from 'react';
import { auth, db } from '../../utils/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import GroupCard from '../../components/Community/GroupCard';

export default function CommunityPage() {
  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');

  useEffect(() => {
    const fetchGroups = async () => {
      if (!auth.currentUser) return;
      
      const querySnapshot = await getDocs(collection(db, 'groups'));
      const groupsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setGroups(groupsData);
    };

    fetchGroups();
  }, []);

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;

    try {
      await addDoc(collection(db, 'groups'), {
        name: newGroupName,
        createdBy: auth.currentUser.uid,
        createdAt: new Date().toISOString(),
        members: [auth.currentUser.uid]
      });
      setNewGroupName('');
      // Refresh groups
      const querySnapshot = await getDocs(collection(db, 'groups'));
      const groupsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setGroups(groupsData);
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Community</h1>
        <form onSubmit={handleCreateGroup} className="flex gap-2">
          <input
            type="text"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            placeholder="New group name..."
            className="rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
          <button type="submit" className="btn-primary">
            Create Group
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
        {groups.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            No groups yet. Create one to get started!
          </div>
        )}
      </div>
    </div>
  );
}