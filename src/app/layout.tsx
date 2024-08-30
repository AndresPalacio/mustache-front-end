"use client"
import { useState } from "react";
import Mustache from "mustache";
import "./globals.css";

export default function RootLayout({
}: {
  children: React.ReactNode;
}) {
  const [jsonInput, setJsonInput] = useState<string>('{"name": "John", "age": 30, "data": {"second": {"test": "example"}}}');
  const [templateInput, setTemplateInput] = useState<string>(`
    {
      "name": "{{name}}",
      "age": "{{age}}",
      "other_data": "{{data.second.test}}"
    }
  `);
  const [output, setOutput] = useState<string>("");

  const handleRender = () => {
    try {
      const jsonData = JSON.parse(jsonInput);
      const renderedOutput = Mustache.render(templateInput, jsonData);
      setOutput(renderedOutput);
    } catch (error) {
      setOutput("Invalid JSON input");
    }
  };

  return (
    <html lang="en">
      <body>
        <main className="p-4">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">JSON Tree Viewer</h1>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">JSON Input</label>
              <textarea
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                rows={6}
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Mapper dynamic</label>
              <textarea
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                rows={6}
                value={templateInput}
                onChange={(e) => setTemplateInput(e.target.value)}
              />
            </div>
            <button
              className="mb-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleRender}
            >
              Render
            </button>
            <div className="json-tree bg-gray-100 p-4 rounded-lg">
              <pre className="whitespace-pre-wrap">{output}</pre>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}