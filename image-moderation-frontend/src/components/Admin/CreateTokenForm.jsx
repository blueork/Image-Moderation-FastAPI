import { useState } from "react";

const CreateTokenForm = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminToken, setAdminToken] = useState("");
  const [createdToken, setCreatedToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!adminToken) {
      setError("Please enter your admin token.");
      return;
    }

    setLoading(true);
    setError("");
    setCreatedToken(null);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/auth/tokens?is_admin=${isAdmin}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      if (!response.ok) {
        const err = await response.json();
        setError(err.detail || "Failed to create token.");
      } else {
        const data = await response.json();
        setCreatedToken(data.token || data);
      }
    } catch (err) {
      setError("Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8 bg-gray-50 p-4 rounded shadow max-w-md">
      <form onSubmit={handleCreate} className="flex flex-col space-y-3">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={() => setIsAdmin(!isAdmin)}
            className="rounded"
          />
          <span>Create Admin Token</span>
        </label>

        <input
          type="text"
          value={adminToken}
          onChange={(e) => setAdminToken(e.target.value)}
          placeholder="Enter your admin bearer token"
          className="border p-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Token"}
        </button>
      </form>

      {error && (
        <p className="mt-2 text-red-600 font-semibold" role="alert">
          {error}
        </p>
      )}

      {createdToken && (
        <p className="mt-2 bg-white p-2 rounded border border-gray-300 break-all">
          Created Token: <code>{createdToken}</code>
        </p>
      )}
    </div>
  );
};

export default CreateTokenForm;
