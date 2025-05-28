import { useState, useEffect } from "react";
import DeleteTokenButton from "./DeleteTokenButton";

const TokenList = () => {
  const [tokens, setTokens] = useState([]);
  const [adminToken, setAdminToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTokens = async () => {
    if (!adminToken) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/tokens", {
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      if (!response.ok) {
        const err = await response.json();
        setError(err.detail || "Failed to fetch tokens.");
        setTokens([]);
      } else {
        const data = await response.json();
        setTokens(data);
      }
    } catch (err) {
      setError("Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Refetch tokens when adminToken changes
    fetchTokens();
  }, [adminToken]);

  const handleDelete = (deletedToken) => {
    setTokens(tokens.filter((t) => t.token !== deletedToken));
  };

  return (
    <div className="max-w-2xl bg-gray-50 p-4 rounded shadow">
      <label className="block mb-2 font-semibold">
        Enter Admin Bearer Token to Load Tokens:
        <input
          type="text"
          value={adminToken}
          onChange={(e) => setAdminToken(e.target.value)}
          placeholder="Admin token"
          className="mt-1 w-full p-2 border rounded"
        />
      </label>

      {loading && <p>Loading tokens...</p>}
      {error && <p className="text-red-600 font-semibold">{error}</p>}

      {tokens.length > 0 && (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 text-left">Token</th>
              <th className="border border-gray-300 p-2 text-left">Is Admin</th>
              <th className="border border-gray-300 p-2 text-left">Created At</th>
              <th className="border border-gray-300 p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map(({ token, isAdmin, createdAt }) => (
              <tr key={token}>
                <td className="border border-gray-300 p-2 break-all">{token}</td>
                <td className="border border-gray-300 p-2">{isAdmin ? "Yes" : "No"}</td>
                <td className="border border-gray-300 p-2">{new Date(createdAt).toLocaleString()}</td>
                <td className="border border-gray-300 p-2">
                  <DeleteTokenButton
                    token={token}
                    adminToken={adminToken}
                    onDeleted={() => handleDelete(token)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {tokens.length === 0 && !loading && <p>No tokens to display.</p>}
    </div>
  );
};

export default TokenList;
