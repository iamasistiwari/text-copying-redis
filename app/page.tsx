
'use client';

import React, { useState } from 'react';

export default function Page() {
  const [text, setText] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [savedKey, setSavedKey] = useState<string | null>(null);

  const handleSave = async () => {
    if (!text.trim()) return;

    setIsSaving(true);

    const res = await fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    setSavedKey(data.key);

    setIsSaving(false);
  };

  return (
    <div className="p-4 max-w-3xl mt-20 mx-auto">
      <textarea
        className="w-full h-40 p-2 border rounded mb-4 border-neutral-600"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something here..."
      />

      <button
        onClick={handleSave}
        className="px-4 py-2 bg-neutral-800 hover:cursor-pointer text-white rounded disabled:opacity-50"
        disabled={isSaving}
      >
        {isSaving ? 'Saving...' : 'Save'}
      </button>

      {savedKey && (
        <p className="mt-2 text-sm text-green-600">
          ✅ Saved as <code>{savedKey}</code>
        </p>
      )}
    </div>
  );
}
