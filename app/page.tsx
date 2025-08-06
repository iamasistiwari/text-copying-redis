"use client";

import React, { useState } from "react";

export default function Page() {
  const [text, setText] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [savedKey, setSavedKey] = useState<string | null>(null);
  const [showm, setIsshowm] = useState(false);

  const handleSave = async () => {
    if (!text.trim()) return;

    setIsSaving(true);

    const res = await fetch("/api/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    setSavedKey(data.key);

    setIsSaving(false);
  };

  return (
    <div className="p-4 max-w-3xl mt-20 mx-auto">
      <img
        src="https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?cs=srgb&dl=pexels-pixabay-275033.jpg&fm=jpg"
        alt="Logo"
        width={250}
        height={250}
        className="absolute top-4 left-4 -z-20"
      />
      <img
        src="https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?cs=srgb&dl=pexels-pixabay-275033.jpg&fm=jpg"
        alt="Logo"
        width={showm ? 330 : 700}
        height={showm ? 330 : 700}
        className="absolute top-72 left-4 -z-20"
      />
      <img
        src="https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXJsfGVufDB8fDB8fHww"
        alt="Logo"
        width={showm ? 330 : 700}
        height={showm ? 330 : 700}
        className="absolute top-[470px] left-4 -z-20"
      />
      <img
        src="https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?cs=srgb&dl=pexels-pixabay-275033.jpg&fm=jpg"
        alt="Logo"
        width={showm ? 330 : 200}
        height={showm ? 330 : 200}
        className="absolute top-96 right-4 -z-20"
      />
      <img
        src="https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXJsfGVufDB8fDB8fHww"
        alt="Logo"
        width={showm ? 330 : 700}
        height={showm ? 330 : 700}
        className="absolute top-4 right-4 -z-20"
      />

      {showm && (
        <>
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
            {isSaving ? "Saving..." : "Save"}
          </button>
        </>
      )}
      <button
        onClick={() => {
          setIsshowm(!showm);
        }}
        className="px-4 py-2 bg-neutral-950 hover:cursor-pointer text-white/5 rounded absolute bottom-0 right-4"
        disabled={isSaving}
      >
        {showm ? "show" : "hide"}
      </button>

      {savedKey && (
        <p className="mt-2 text-sm text-green-600">
          ✅ Saved as <code>{savedKey}</code>
        </p>
      )}
    </div>
  );
}
