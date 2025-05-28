import { useState } from "react";

const ImageUploadForm = () => {
  const [file, setFile] = useState(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setReport(null);
    setError("");
  };

  const handleTokenChange = (e) => {
    setToken(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select an image file.");
      return;
    }
    if (!token) {
      setError("Please enter your bearer token.");
      return;
    }

    setLoading(true);
    setError("");
    setReport(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/moderate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json();
        setError(err.detail || "Failed to get moderation report.");
      } else {
        const data = await response.json();
        setReport(data);
      }
    } catch (err) {
      setError("Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-6 rounded shadow">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label className="block font-medium text-gray-700">
          Upload Image:
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full"
          />
        </label>

        <label className="block font-medium text-gray-700">
          Bearer Token:
          <input
            type="text"
            value={token}
            onChange={handleTokenChange}
            placeholder="Enter your token here"
            className="mt-1 block w-full rounded border border-gray-300 p-2"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Moderating..." : "Moderate Image"}
        </button>
      </form>

      {error && (
        <p className="mt-4 text-red-600 font-semibold" role="alert">
          {error}
        </p>
      )}

      {report && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-semibold mb-2">Moderation Report</h2>
          <p>
            <strong>Summary:</strong> {report.summary}
          </p>

          {report.issues && report.issues.length > 0 && (
            <>
              <h3 className="mt-3 font-semibold">Issues Detected:</h3>
              <ul className="list-disc list-inside">
                {report.issues.map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            </>
          )}

          {report.details && (
            <pre className="mt-3 overflow-x-auto text-sm bg-white p-3 rounded border border-gray-300">
              {JSON.stringify(report.details, null, 2)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploadForm;
