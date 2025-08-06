// app/notes/page.tsx
"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

type Note = {
  time: string;
  text: string;
};

export default function NotesPage() {
  const [data, setData] = useState<Record<string, Note[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/notes")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4">Loading notes...</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
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
        width={250}
        height={250}
        className="absolute top-72 left-4 -z-20"
      />
      <img
              src="https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXJsfGVufDB8fDB8fHww"
        alt="Logo"
        width={250}
        height={250}
        className="absolute top-[470px] left-4 -z-20"
      />
          <img
              src="https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?cs=srgb&dl=pexels-pixabay-275033.jpg&fm=jpg"
              alt="Logo"
              width={330}
              height={330}
              className="absolute top-96 right-4 -z-20"
          />
          <img
              src="https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXJsfGVufDB8fDB8fHww"
              alt="Logo"
              width={330}
              height={330}
              className="absolute top-4 right-4 -z-20"
          />

      {Object.entries(data).map(([date, notes]) => (
        <div key={date} className="mb-6 z-50 ">
          <h2 className="text-lg font-semibold mb-2">{date}</h2>
          <ul className="space-y-2">
            {notes.map((note, idx) => (
              <li
                key={idx}
                className="p-3 border border-neutral-600 rounded shadow-sm "
              >
                <p className="text-sm text-gray-500">{note.time}</p>
                <p>{note.text}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
