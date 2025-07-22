import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import playlists from "../../public/playlists.json";
import Image from "next/image";
import Navbar from "../components/layout/Navbar";
import Head from "next/head";

export default function Home() {
  const [link, setLink] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const router = useRouter();

  // Placeholder URLs for typing animation
  const placeholderUrls = [
    "https://youtube.com/watch?v=dQw4",
    "https://youtu.be/abc123def456",
    "https://youtube.com/watch?v=js",
    "https://youtu.be/python_course"
  ];

  // Typing animation effect
  useEffect(() => {
    const currentUrl = placeholderUrls[placeholderIndex];
    let timeout;

    if (isTyping) {
      if (currentText.length < currentUrl.length) {
        timeout = setTimeout(() => {
          setCurrentText(currentUrl.slice(0, currentText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000); // Pause before deleting
      }
    } else {
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, 50);
      } else {
        setPlaceholderIndex((prev) => (prev + 1) % placeholderUrls.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentText, isTyping, placeholderIndex]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!link.trim()) return;
    router.push(`/watch?video=${encodeURIComponent(link)}`);
  };

  const handlePlaylistClick = (slug, topic) => {
    router.push(`/watch/${slug}?topic=${encodeURIComponent(topic)}`);
  };

  return (
    <>
    <Head>
      <title>Code Along - Learn Coding with YouTube</title>
      <meta name="description" content="Transform your learning experience. Paste any YouTube tutorial and code along with a powerful multi-language editor in real-time." />
    </Head>
      <Navbar />
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 md:pt-16">
        {/* Top Half - Hero + Input */}
        <section className="flex flex-col items-center justify-center h-[55vh] text-center p-6 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-red-500/10"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            {/* Logo-inspired Title */}
            <div className="mb-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-wider flex items-center justify-center gap-2">
                <span className="text-white drop-shadow-lg">CODE</span>
                <div className="relative">
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-red-500 blur-md opacity-25 rounded transform -skew-x-6 scale-105"></div>
                  
                  <div className="relative bg-gradient-to-r from-red-600 via-red-500 to-red-600 px-3 md:px-4 py-1.5 md:py-2 rounded transform -skew-x-6 shadow-md">
                    <span className="text-white font-black flex items-center gap-1 drop-shadow-md">
                      AL
                      <div className="w-0 h-0 border-l-[12px] md:border-l-[16px] border-l-white border-t-[10px] md:border-t-[14px] border-t-transparent border-b-[10px] md:border-b-[14px] border-b-transparent drop-shadow-sm"></div>
                      NG
                    </span>
                  </div>
                </div>
              </h1>
            </div>

            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed px-4" style={{ lineHeight: '1.7' }}>
              Transform your learning experience. Paste any{' '}
              <span className="text-red-400 font-semibold bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                YouTube tutorial
              </span>{' '}
              and code along with a powerful{' '}
              <span className="text-blue-400 font-semibold bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                multi-language editor
              </span>{' '}
              in real-time.
            </p>

            {/* Enhanced Input Form */}
            <form onSubmit={handleSubmit} className="w-full max-w-2xl px-4">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-red-600 to-red-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative flex flex-col sm:flex-row gap-3 bg-slate-800/70 backdrop-blur-xl p-3 rounded-xl border border-slate-700/50">
                  <div className="flex-1 relative">
                    <input
                      type="url"
                      placeholder=""
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      className="w-full text-white px-4 md:px-6 py-3 md:py-4 rounded-lg bg-slate-700/50 border border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all text-base md:text-lg"
                      required
                    />
                    {!link && (
                      <div className="absolute inset-0 flex items-center px-4 md:px-6 pointer-events-none">
                        <span className="text-gray-400 text-base md:text-lg">
                          {currentText}
                          <span className="animate-pulse text-red-400">|</span>
                        </span>
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="sm:w-auto w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold text-base md:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
                  >
                    Start Coding →
                  </button>
                </div>
              </div>
            </form>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-3 mt-8 px-4">
              <span className="px-3 md:px-4 py-1.5 md:py-2 bg-slate-800/50 border border-slate-700/50 rounded-full text-xs md:text-sm text-gray-300 backdrop-blur-xl">
                JavaScript
              </span>
              <span className="px-3 md:px-4 py-1.5 md:py-2 bg-slate-800/50 border border-slate-700/50 rounded-full text-xs md:text-sm text-gray-300 backdrop-blur-xl">
                Python
              </span>
              <span className="px-3 md:px-4 py-1.5 md:py-2 bg-slate-800/50 border border-slate-700/50 rounded-full text-xs md:text-sm text-gray-300 backdrop-blur-xl">
                Java
              </span>
              <span className="px-3 md:px-4 py-1.5 md:py-2 bg-slate-800/50 border border-slate-700/50 rounded-full text-xs md:text-sm text-gray-300 backdrop-blur-xl">
                C++
              </span>
              <span className="px-3 md:px-4 py-1.5 md:py-2 bg-slate-800/50 border border-slate-700/50 rounded-full text-xs md:text-sm text-gray-300 backdrop-blur-xl">
                Real-time
              </span>
            </div>
          </div>
        </section>

        {/* Bottom Half - Playlist Cards */}
        <section className="bg-slate-800/30 backdrop-blur-xl px-6 py-12 border-t border-slate-700/30 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Curated Learning Playlists
              </h2>
              <p className="text-gray-400 text-base md:text-lg">
                Start your coding journey with these hand-picked tutorials
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {playlists.slice(0, 8).map((playlist, index) => (
                <div
                  key={playlist.slug}
                  onClick={() => handlePlaylistClick(playlist.slug, playlist.topic)}
                  className="group cursor-pointer relative overflow-hidden rounded-xl transition-all duration-300 transform hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Card Glow Effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/50 to-blue-500/50 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-300"></div>

                  <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                    <div className="relative overflow-hidden">
                      <Image
                        src={playlist.thumbnail}
                        alt={playlist.creator}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center justify-center w-12 h-12 bg-red-600 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-400 transition-colors duration-200">
                        {playlist.topic}
                      </h3>
                      <p className="text-sm text-gray-400 mb-3">{playlist.creator}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {playlist.videos?.length || 0} videos
                        </span>
                        <span className="text-xs text-red-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          Watch Now →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-12">
              <button
                onClick={() => router.push("/playlists")}
                className="inline-flex items-center gap-2 px-6 md:px-8 py-3 bg-slate-700/50 hover:bg-slate-700/70 border border-slate-600/50 hover:border-slate-500/50 text-white rounded-lg transition-all duration-300 backdrop-blur-xl"
              >
                View All Playlists
                <span className="transform group-hover:translate-x-1 transition-transform duration-200">
                  →
                </span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}