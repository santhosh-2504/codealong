import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import {
  getKeys,
  addKey,
  deleteKey,
  selectKey,
  getSelectedKey,
} from "@/lib/keyManager";
import Head from "next/head";

export default function KeysPage() {
  const [keys, setKeys] = useState([]);
  const [form, setForm] = useState({ key: "", label: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setKeys(getKeys());
  }, []);

  const handleAddKey = async () => {
    setLoading(true);
    setError("");
    try {
      const newKey = await addKey(form);
      setKeys(getKeys());
      setForm({ key: "", label: "" });
      alert("Key added successfully!");
    } catch (err) {
      setError("Invalid API key. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this key?")) {
      deleteKey(id);
      setKeys(getKeys());
    }
  };

  const handleSelect = (id) => {
    selectKey(id);
    setKeys(getKeys());
  };

  const selected = getSelectedKey();

  return (
    <>
    <Head>
      <title>API Key Management - Code Along</title>
    </Head>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-16">
        <div className="max-w-5xl mx-auto py-12 px-6">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
              API Key Management
            </h1>
            <p className="text-gray-300 text-lg">
              Securely manage and configure your Judge0 API keys
            </p>
          </div>

          {/* Instructional Section */}
          <div className="relative group mb-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
            <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                    <svg
                      className="w-6 h-6 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    Getting Started with RapidAPI
                  </h2>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  Follow these simple steps to obtain your free Judge0 API key
                  and start executing code.
                </p>

                <div className="grid gap-4 mb-8">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                      1
                    </div>
                    <div>
                      <p className="text-gray-200">
                        Visit{" "}
                        <a
                          className="text-red-400 hover:text-red-300 font-medium underline decoration-2 underline-offset-2 transition-colors"
                          href="https://rapidapi.com/judge0-official/api/judge0-ce/"
                          target="_blank"
                        >
                          RapidAPI - Judge0 CE
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                      2
                    </div>
                    <div>
                      <p className="text-gray-200">
                        Sign in and subscribe to the{" "}
                        <span className="font-bold text-green-400 bg-green-500/20 px-2 py-1 rounded">
                          Basic (Free)
                        </span>{" "}
                        plan
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                      3
                    </div>
                    <div>
                      <p className="text-gray-200">
                        Copy your{" "}
                        <span className="font-mono bg-slate-700/50 border border-slate-600/50 px-2 py-1 rounded text-sm text-blue-300">
                          X-RapidAPI-Key
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                      4
                    </div>
                    <div>
                      <p className="text-gray-200">
                        Paste it below with a label and click{" "}
                        <span className="font-bold text-red-400">
                          Verify & Add
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-4 border border-slate-700/50">
                  <img
                    src="/apikey_demo.gif"
                    alt="How to get API key"
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Add Key Form */}
          <div className="relative group mb-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-red-600 to-red-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
            <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl">
              <div className="p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add New API Key
                </h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      API Key
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your RapidAPI key"
                      className="w-full text-white px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-200 placeholder-gray-400"
                      value={form.key}
                      onChange={(e) =>
                        setForm({ ...form, key: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Label (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Personal Account, Work Key"
                      className="w-full text-white px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-200 placeholder-gray-400"
                      value={form.label}
                      onChange={(e) =>
                        setForm({ ...form, label: e.target.value })
                      }
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleAddKey}
                      disabled={loading || !form.key.trim()}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      {loading ? (
                        <>
                          <svg
                            className="w-4 h-4 animate-spin"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Verifying...
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Verify & Add Key
                        </>
                      )}
                    </button>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-red-300 bg-red-500/20 border border-red-500/30 px-4 py-3 rounded-lg backdrop-blur-xl">
                      <svg
                        className="w-5 h-5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                      <span className="text-sm">{error}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Keys List */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-slate-600 to-slate-500 rounded-2xl blur opacity-20"></div>
            <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl">
              <div className="p-8 pb-0">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg>
                  Your API Keys
                </h3>
              </div>

              {keys.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-slate-700/50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-600/50">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-300 text-lg font-medium">
                    No API keys added yet
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    Add your first key above to get started
                  </p>
                </div>
              ) : (
                <div className="overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-t border-slate-700/50">
                          <th className="text-left py-4 px-8 text-sm font-medium text-gray-300 bg-slate-800/50">
                            Label
                          </th>
                          <th className="text-left py-4 px-8 text-sm font-medium text-gray-300 bg-slate-800/50">
                            Usage Today
                          </th>
                          <th className="text-left py-4 px-8 text-sm font-medium text-gray-300 bg-slate-800/50">
                            Status
                          </th>
                          <th className="text-left py-4 px-8 text-sm font-medium text-gray-300 bg-slate-800/50">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-700/50">
                        {keys.map((k) => (
                          <tr
                            key={k.id}
                            className={`hover:bg-slate-700/30 transition-colors duration-200 ${
                              selected?.id === k.id
                                ? "bg-red-500/10 border-l-4 border-red-500"
                                : ""
                            }`}
                          >
                            <td className="py-4 px-8">
                              <div className="font-medium text-white">
                                {k.label || "Unlabeled Key"}
                              </div>
                            </td>
                            <td className="py-4 px-8">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full shadow-sm"></div>
                                <span className="text-gray-300">
                                  {k.usage || 0} requests
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-8">
                              {selected?.id === k.id ? (
                                <span className="inline-flex items-center gap-1.5 bg-red-500/20 text-red-300 border border-red-500/30 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-xl">
                                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                                  Active
                                </span>
                              ) : (
                                <button
                                  onClick={() => handleSelect(k.id)}
                                  className="inline-flex items-center gap-1.5 text-gray-400 hover:text-blue-400 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-500/20 border border-transparent hover:border-blue-500/30 transition-all duration-200"
                                >
                                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                  Select
                                </button>
                              )}
                            </td>
                            <td className="py-4 px-8">
                              <button
                                onClick={() => handleDelete(k.id)}
                                className="inline-flex items-center gap-1.5 text-gray-400 hover:text-red-400 px-3 py-1 rounded-lg text-sm font-medium hover:bg-red-500/20 border border-transparent hover:border-red-500/30 transition-all duration-200"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}