'use client';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const [idea, setIdea] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!idea) return;
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('https://ask-ai-backend-lfu8.onrender.com/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: `Suggest creative, catchy business names for this idea: ${idea}`,
        }),
      });

      const data = await res.json();
      setResponse(data.answer);
    } catch (err) {
      setResponse('❌ Error fetching response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 text-white flex flex-col items-center px-4 py-10">
      <h1 className="text-4xl font-bold mb-4 text-center">Business Name Generator</h1>
      <p className="mb-6 text-lg text-slate-300 max-w-xl text-center">
        Describe your business idea and let AI suggest catchy, unique, and brandable names.
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-4">
        <input
          type="text"
          placeholder="e.g. AI travel planner app"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          className="w-full p-3 rounded-lg bg-white text-black"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl flex items-center justify-center"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5 mr-2" /> Generating...
            </>
          ) : (
            'Generate Names'
          )}
        </button>
      </form>

      {response && (
        <div className="mt-8 w-full max-w-xl bg-slate-800 border border-slate-600 rounded-xl p-6 text-slate-100 whitespace-pre-line shadow-xl">
          {response}
        </div>
      )}
    </main>
  );
}
