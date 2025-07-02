import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import playlists from "../../public/playlists.json";

export default function Home() {
  const [link, setLink] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!link.trim()) return;
    router.push(`/watch?video=${encodeURIComponent(link)}`);
  };

  const handlePlaylistClick = (slug) => {
    router.push(`/watch/${slug}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Half - Hero + Input */}
      <section className="flex flex-col items-center justify-center h-[50vh] text-center p-6">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">CodeAlong.</h1>
        <p className="text-lg text-gray-600 mb-6">
          Paste a YouTube link and code along with it in real time.
        </p>
        <form onSubmit={handleSubmit} className="w-full max-w-xl">
          <input
            type="url"
            placeholder="Paste YouTube video link here..."
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full text-black px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Start Coding
          </button>
        </form>
      </section>

      {/* Bottom Half - Playlist Cards */}
      <section className="bg-white px-6 py-10">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Watch Curated Playlists
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {playlists.slice(0, 8).map((playlist) => (
            <div
              key={playlist.slug}
              onClick={() => handlePlaylistClick(playlist.slug)}
              className="cursor-pointer border rounded overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={playlist.thumbnail}
                alt={playlist.creator}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-md text-black font-bold">{playlist.topic}</h3>
                <p className="text-sm text-gray-600">{playlist.creator}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
