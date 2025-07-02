import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export default function CodeEditor({ code, onChange, language }) {
  const map = {
    javascript: "javascript",
    python: "python",
    cpp: "cpp",
    java: "java"
  };

  return (
    <div className="flex-1">
      <Editor
        height="300px"
        language={map[language]}
        value={code}
        onChange={onChange}
        theme="vs-dark"
      />
    </div>
  );
}
