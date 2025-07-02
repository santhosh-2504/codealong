export default function LanguageSelector({ language, setLanguage }) {
  const languages = [
    { value: 'javascript', label: 'JavaScript', status: '✅' },
    { value: 'python', label: 'Python', status: '✅' },
    { value: 'cpp', label: 'C++', status: '🚧' },
    { value: 'java', label: 'Java', status: '🚧' }
  ];

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">
        Programming Language
      </label>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.status} {lang.label} {lang.status === '🚧' ? '(Coming Soon)' : ''}
          </option>
        ))}
      </select>
      
      {(language === 'cpp' || language === 'java') && (
        <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded border border-amber-200">
          <strong>Note:</strong> {language === 'cpp' ? 'C++' : 'Java'} execution is not yet implemented. 
          Please use JavaScript or Python for now.
        </div>
      )}
    </div>
  );
}