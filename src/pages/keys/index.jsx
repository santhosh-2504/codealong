// import { useState, useEffect } from "react";
// import {
//   getKeys,
//   addKey,
//   deleteKey,
//   selectKey,
//   getSelectedKey,
// } from "@/lib/keyManager";

// export default function KeysPage() {
//   const [keys, setKeys] = useState([]);
//   const [form, setForm] = useState({ key: "", label: "" });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     setKeys(getKeys());
//   }, []);

//   const handleAddKey = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const newKey = await addKey(form);
//       setKeys(getKeys());
//       setForm({ key: "", label: "" });
//       alert("Key added successfully!");
//     } catch (err) {
//       setError("Invalid API key. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = (id) => {
//     if (confirm("Are you sure you want to delete this key?")) {
//       deleteKey(id);
//       setKeys(getKeys());
//     }
//   };

//   const handleSelect = (id) => {
//     selectKey(id);
//     setKeys(getKeys());
//   };

//   const selected = getSelectedKey();

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">🔐 Manage API Keys</h1>

//       {/* 🎥 Instructional GIF and Steps */}
//       <div className="bg-slate-50 border rounded-md p-4 mb-6">
//         <h2 className="text-lg font-semibold mb-2">🧪 How to Get Your RapidAPI Key</h2>
//         <p className="text-sm text-slate-600 mb-3">
//           Follow these steps to get your free API key for Judge0:
//         </p>
//         <ol className="list-decimal list-inside text-sm text-slate-700 mb-4 space-y-1">
//           <li>Go to <a className="text-blue-600 underline" href="https://rapidapi.com/judge0-official/api/judge0-ce/" target="_blank">RapidAPI - Judge0 CE</a></li>
//           <li>Sign in and subscribe to the <strong>Basic (Free)</strong> plan</li>
          
//           <li>Copy your <strong>X-RapidAPI-Key</strong></li>
//           <li>Paste it below with a label, click <strong>Verify & Add</strong></li>
//         </ol>
//         <img
//           src="/apikey_demo.gif"
//           alt="How to get API key"
//           className="w-full rounded-md border"
//         />
//       </div>

//       {/* 🧾 Add Key Form */}
//       <div className="mb-6 space-y-2">
//         <input
//           type="text"
//           placeholder="Enter API key"
//           className="border p-2 w-full"
//           value={form.key}
//           onChange={(e) => setForm({ ...form, key: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Enter label (optional)"
//           className="border p-2 w-full"
//           value={form.label}
//           onChange={(e) => setForm({ ...form, label: e.target.value })}
//         />
//         <button
//           onClick={handleAddKey}
//           disabled={loading}
//           className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
//         >
//           {loading ? "Verifying..." : "Verify & Add Key"}
//         </button>
//         {error && <p className="text-red-600">{error}</p>}
//       </div>

//       {/* 📋 List of Keys */}
//       <h2 className="text-xl font-semibold mb-2">Saved Keys</h2>

//       {keys.length === 0 ? (
//         <p className="text-slate-500">No keys added yet.</p>
//       ) : (
//         <table className="w-full border border-slate-300 text-left text-sm">
//           <thead>
//             <tr className="bg-slate-100">
//               <th className="p-2">Label</th>
//               <th className="p-2">Usage (Today)</th>
//               <th className="p-2">Selected</th>
//               <th className="p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {keys.map((k) => (
//               <tr
//                 key={k.id}
//                 className={`border-t ${selected?.id === k.id ? "bg-emerald-50" : ""}`}
//               >
//                 <td className="p-2">{k.label}</td>
//                 <td className="p-2">{k.usage || 0}</td>
//                 <td className="p-2">
//                   {selected?.id === k.id ? (
//                     <span className="text-emerald-600 font-medium">Active</span>
//                   ) : (
//                     <button
//                       onClick={() => handleSelect(k.id)}
//                       className="text-blue-600 hover:underline"
//                     >
//                       Select
//                     </button>
//                   )}
//                 </td>
//                 <td className="p-2">
//                   <button
//                     onClick={() => handleDelete(k.id)}
//                     className="text-red-600 hover:underline"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import {
  getKeys,
  addKey,
  deleteKey,
  selectKey,
  getSelectedKey,
} from "@/lib/keyManager";

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto py-12 px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-light text-gray-900 mb-3">API Key Management</h1>
          <p className="text-gray-600 text-lg">Securely manage and configure your API keys</p>
        </div>

        {/* Instructional Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-medium text-gray-900">Getting Started with RapidAPI</h2>
            </div>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              Follow these simple steps to obtain your free Judge0 API key and start executing code.
            </p>
            
            <div className="grid gap-4 mb-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">1</div>
                <div>
                  <p className="text-gray-800">Visit <a className="text-blue-600 hover:text-blue-700 font-medium underline decoration-2 underline-offset-2" href="https://rapidapi.com/judge0-official/api/judge0-ce/" target="_blank">RapidAPI - Judge0 CE</a></p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">2</div>
                <div>
                  <p className="text-gray-800">Sign in and subscribe to the <span className="font-semibold text-green-700">Basic (Free)</span> plan</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">3</div>
                <div>
                  <p className="text-gray-800">Copy your <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">X-RapidAPI-Key</span></p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">4</div>
                <div>
                  <p className="text-gray-800">Paste it below with a label and click <span className="font-semibold">Verify & Add</span></p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4">
              <img
                src="/apikey_demo.gif"
                alt="How to get API key"
                className="w-full rounded-lg shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Add Key Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="p-8">
            <h3 className="text-xl font-medium text-gray-900 mb-6">Add New API Key</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">API Key</label>
                <input
                  type="text"
                  placeholder="Enter your RapidAPI key"
                  className="w-full text-black px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  value={form.key}
                  onChange={(e) => setForm({ ...form, key: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Label (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g., Personal Account, Work Key"
                  className="w-full text-black px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  value={form.label}
                  onChange={(e) => setForm({ ...form, label: e.target.value })}
                />
              </div>
              
              <div className="pt-2">
                <button
                  onClick={handleAddKey}
                  disabled={loading || !form.key.trim()}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Verify & Add Key
                    </>
                  )}
                </button>
              </div>
              
              {error && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-xl">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span className="text-sm">{error}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Keys List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 pb-0">
            <h3 className="text-xl font-medium text-gray-900 mb-6">Your API Keys</h3>
          </div>

          {keys.length === 0 ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">No API keys added yet</p>
              <p className="text-gray-400 text-sm mt-1">Add your first key above to get started</p>
            </div>
          ) : (
            <div className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-t border-gray-100">
                      <th className="text-left py-4 px-8 text-sm font-medium text-gray-600 bg-gray-50">Label</th>
                      <th className="text-left py-4 px-8 text-sm font-medium text-gray-600 bg-gray-50">Usage Today</th>
                      <th className="text-left py-4 px-8 text-sm font-medium text-gray-600 bg-gray-50">Status</th>
                      <th className="text-left py-4 px-8 text-sm font-medium text-gray-600 bg-gray-50">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {keys.map((k) => (
                      <tr
                        key={k.id}
                        className={`hover:bg-gray-50 transition-colors duration-150 ${
                          selected?.id === k.id ? "bg-blue-50" : ""
                        }`}
                      >
                        <td className="py-4 px-8">
                          <div className="font-medium text-gray-900">{k.label || "Unlabeled Key"}</div>
                        </td>
                        <td className="py-4 px-8">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-gray-600">{k.usage || 0} requests</span>
                          </div>
                        </td>
                        <td className="py-4 px-8">
                          {selected?.id === k.id ? (
                            <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              Active
                            </span>
                          ) : (
                            <button
                              onClick={() => handleSelect(k.id)}
                              className="inline-flex items-center gap-1.5 text-gray-600 hover:text-blue-600 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-50 transition-colors duration-150"
                            >
                              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                              Select
                            </button>
                          )}
                        </td>
                        <td className="py-4 px-8">
                          <button
                            onClick={() => handleDelete(k.id)}
                            className="inline-flex items-center gap-1.5 text-gray-400 hover:text-red-600 px-3 py-1 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors duration-150"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
  );
}