import React, { useState } from 'react';
import { useQuery, useAction, getJournalEntries, createJournalEntry } from 'wasp/client/operations';
import { useQuery as useMoodsQuery, getMoodList } from 'wasp/client/operations';

const DashboardPage = () => {
  const { data: journalEntries, isLoading, error } = useQuery(getJournalEntries);
  const { data: moods, isLoading: moodsLoading, error: moodsError } = useMoodsQuery(getMoodList);
  const createJournalEntryFn = useAction(createJournalEntry);
  const [newEntryContent, setNewEntryContent] = useState('');
  const [selectedMoodId, setSelectedMoodId] = useState(null);

  if (isLoading || moodsLoading) return 'Loading...';
  if (error || moodsError) return 'Error: ' + (error || moodsError);

  const handleCreateEntry = () => {
    if (newEntryContent && selectedMoodId) {
      createJournalEntryFn({ content: newEntryContent, moodId: selectedMoodId });
      setNewEntryContent('');
      setSelectedMoodId(null);
    }
  };

  return (
    <div className="p-4">
      <div className="flex gap-x-4 py-5">
        <input
          type="text"
          placeholder="New Journal Entry"
          className="px-1 py-2 border rounded text-lg"
          value={newEntryContent}
          onChange={(e) => setNewEntryContent(e.target.value)}
        />
        <select
          value={selectedMoodId || ''}
          onChange={(e) => setSelectedMoodId(e.target.value)}
          className="px-1 py-2 border rounded text-lg"
        >
          <option value="">Select Mood</option>
          {moods && moods.map((mood) => (
            <option key={mood.id} value={mood.id}>{mood.name}</option>
          ))}
        </select>
        <button
          onClick={handleCreateEntry}
          className="bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded"
        >
          Add Entry
        </button>
      </div>
      <div>
        {journalEntries && journalEntries.map((entry) => (
          <div key={entry.id} className='py-2 px-2 flex items-center hover:bg-slate-100 gap-x-2 rounded'>
            <p>{entry.content}</p>
            <span className='ml-2 text-sm text-gray-500'>{entry.mood.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
