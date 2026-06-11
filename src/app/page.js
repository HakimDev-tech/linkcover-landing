'use client';

import { useState } from 'react';

const WORKER_URL = 'https://linkcover-worker.linkcover.workers.dev';
const LEMON_SQUEEZY_URL = 'https://linkcover.lemonsqueezy.com/checkout/buy/ec760cbe-a2a4-4e76-81f4-df41a6dc0ec2';

export default function Home() {
  const [title, setTitle] = useState('');
  const [siteUrl, setSiteUrl] = useState('');
  const [template, setTemplate] = useState('dark');
  const [copied, setCopied] = useState(false);

  const imageUrl = title.trim()
    ? `${WORKER_URL}/?title=${encodeURIComponent(title)}&template=${template}&url=${encodeURIComponent(siteUrl || 'yoursite.com/blog')}`
    : '';

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
        Type your title. Get a social preview image. In 3 seconds.
      </p>

      {/* Template selector */}
      <div className="flex gap-3 justify-center mb-6">
        {['dark', 'light', 'brand'].map((t) => (
          <button
            key={t}
            onClick={() => setTemplate(t)}
            className={`px-4 py-1 rounded-full text-sm capitalize font-medium transition ${
              template === t
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Title input */}
      <div className="w-full max-w-lg mb-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. How I Built a SaaS in 7 Days"
          className="w-full px-5 py-4 rounded-xl bg-gray-800 border border-gray-700 text-white text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* URL input */}
      <div className="w-full max-w-lg mb-4">
        <input
          type="text"
          value={siteUrl}
          onChange={(e) => setSiteUrl(e.target.value)}
          placeholder="yourwebsite.com/blog (optional)"
          className="w-full px-5 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Live preview */}
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

      {/* Pricing CTA */}
      <div className="w-full max-w-lg border-t border-gray-800 pt-10 mt-4">
        <div className="bg-gray-900 rounded-xl p-6 mb-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">LinkCover Solo</span>
            <span className="text-2xl font-bold">
              $7<span className="text-lg text-gray-400">/mo</span>
            </span>
          </div>
          <ul className="text-gray-400 space-y-2 mb-6 text-sm">
            <li>✓ 500 images/month</li>
            <li>✓ No watermark</li>
            <li>✓ Dark, Light & Brand templates</li>
            <li>✓ Custom URL in preview</li>
            <li>✓ Share analytics (coming soon)</li>
          </ul>
          <a
            href={LEMON_SQUEEZY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-semibold text-center transition"
          >
            Get LinkCover — $7/month
          </a>
          <p className="text-gray-500 text-xs text-center mt-3">
            Cancel anytime. No questions asked.
          </p>
        </div>

        <p className="text-gray-500 text-sm text-center">
          Free preview above. No signup required.
        </p>
      </div>

      {/* Footer */}
      <p className="mt-16 text-gray-600 text-sm">
        © LinkCover.xyz — Built in public
      </p>
    </main>
  );
}
