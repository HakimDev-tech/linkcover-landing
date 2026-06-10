'use client';

import { useState } from 'react';

const WORKER_URL = 'https://linkcover-worker.linkcover.workers.dev';

export default function Home() {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const generateImage = (text) => {
    if (!text.trim()) {
      setImageUrl('');
      return;
    }
    const encoded = encodeURIComponent(text);
    setImageUrl(`${WORKER_URL}/?title=${encoded}`);
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    setTitle(val);
    generateImage(val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (data.success) {
        if (data.message === 'already_registered') {
          setError('This email is already on the list.');
        } else {
          setSubmitted(true);
        }
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Network error. Try again.');
    }

    setLoading(false);
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(imageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4 py-16">
      <h1 className="text-5xl font-bold mb-4 text-center">
        Never share a naked link again
      </h1>
      <p className="text-xl text-gray-400 mb-10 text-center max-w-xl">
        Type your title. Get a social preview image. In 3 seconds. No account needed.
      </p>

      {/* Live Preview */}
      <div className="w-full max-w-lg mb-4">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="e.g. How I Built a SaaS in 7 Days"
          className="w-full px-5 py-4 rounded-xl bg-gray-800 border border-gray-700 text-white text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {imageUrl && (
        <div className="w-full max-w-lg mb-8">
          <div className="rounded-xl overflow-hidden border border-gray-700 shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl} alt="OG Preview" className="w-full h-auto" />
          </div>
          <button
            onClick={copyUrl}
            className="mt-3 w-full py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-semibold transition"
          >
            {copied ? '✓ Copied!' : 'Copy Image URL'}
          </button>
        </div>
      )}

      {/* Waitlist form */}
      <div className="w-full max-w-lg border-t border-gray-800 pt-10 mt-4">
        <h2 className="text-2xl font-semibold mb-2 text-center">Get notified at launch</h2>
        {submitted ? (
          <p className="text-green-400 text-center text-lg">You&apos;re on the list ✓</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-semibold transition disabled:opacity-50"
            >
              {loading ? '...' : 'Notify me'}
            </button>
          </form>
        )}
        {error && (
          <p className="text-red-400 text-center mt-3 text-sm">{error}</p>
        )}
      </div>

      <p className="mt-16 text-gray-600 text-sm">
        © LinkCover.xyz — Built in public
      </p>
    </main>
  );
}