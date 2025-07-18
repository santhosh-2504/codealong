import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export default function CodeEditor({ code, onChange, language }) {
  const map = {
    javascript: "javascript",
    python: "python",
    cpp: "cpp",
    java: "java",
    c: "c"
  };

  return (
    <div className="h-full w-full">
      <Editor
        height="100%"
        width="100%"
        language={map[language]}
        value={code}
        onChange={onChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          lineNumbers: 'on',
          automaticLayout: true
        }}
      />
    </div>
  );
}
