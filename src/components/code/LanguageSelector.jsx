export default function LanguageSelector({ language, setLanguage }) {
  const languages = [
    { value: 'javascript', label: 'JavaScript', note: 'Browser execution' },
    { value: 'python', label: 'Python', note: 'Judge0 API' },
    { value: 'java', label: 'Java', note: 'Judge0 API' },
    { value: 'cpp', label: 'C++', note: 'Judge0 API' },
    { value: 'c', label: 'C', note: 'Judge0 API' }
  ];

  const selectedLang = languages.find(lang => lang.value === language);

  return (
    <div className="flex flex-col gap-2">
      {/* <label className="text-sm font-medium text-gray-300">
        Language
      </label> */}
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="bg-slate-700/50 border border-slate-600/50 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm min-w-[120px] max-w-[150px]"
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value} className="bg-slate-800 text-white">
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}