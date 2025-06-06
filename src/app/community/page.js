'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '../../utils/firebase';
import { collection, addDoc, query, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function CommunityPage() {
  const [newGroupName, setNewGroupName] = useState('');
  const [groups, setGroups] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const q = query(collection(db, 'groups'));
      const querySnapshot = await getDocs(q);
      const groupsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setGroups(groupsData);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    if (!newGroupName.trim() || !auth.currentUser) return;

    try {
      await addDoc(collection(db, 'groups'), {
        name: newGroupName,
        createdBy: auth.currentUser.uid,
        createdAt: new Date().toISOString(),
        members: [auth.currentUser.uid]
      });
      setNewGroupName('');
      fetchGroups();
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  const GroupCard = ({ group }) => (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <h3 className="text-lg font-medium text-gray-900">{group.name}</h3>
        <p className="mt-2 text-sm text-gray-600">
          Created {new Date(group.createdAt).toLocaleDateString()}
        </p>
        <button className="mt-4 btn-primary">Join Group</button>
      </div>
    </div>
  );

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
