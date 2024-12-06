import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { getMoodList } from 'wasp/client/operations';

const MoodPage = () => {
  const { data: moods, isLoading, error } = useQuery(getMoodList);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Mood List</h1>
      <ul>
        {moods.map((mood) => (
          <li key={mood.id} className="mb-2 p-2 border-b border-gray-300">
            {mood.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoodPage;
