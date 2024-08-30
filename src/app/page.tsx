import Mustache from "mustache";

const renderJsonTree = (json: object): string => {
  const template = `
    {
      "name": "{{name}}",
      "age": "{{age}}",
      "other_data": "{{data.second.test}}"
    }
  `;

  return Mustache.render(template, json);
};

export default function Home() {
  const jsonData = {
    name: "John",
    age: 30,
    data: {
      second: {
        test: "example"
      }
    }
  };

  const jsonTreeHtml = renderJsonTree(jsonData);

  return (
    <main className="p-4">
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">JSON Tree Viewer</h1>
      <div className="bg-gray-100 p-4 rounded-lg">
        <pre className="whitespace-pre-wrap">{jsonTreeHtml}</pre>
      </div>
    </div>
  </main>
  );
}