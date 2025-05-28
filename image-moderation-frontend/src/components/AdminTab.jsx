// AdminTab.jsx
import { useState } from "react";

const AdminTab = () => {
  const [adminToken, setAdminToken] = useState("");
  const [tokens, setTokens] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [tokenToDelete, setTokenToDelete] = useState("");
  const [message, setMessage] = useState("");

  const fetchTokens = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/auth/tokens", {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setTokens(data);
        setMessage("Tokens loaded successfully.");
      } else {
        setMessage(data.detail || "Failed to load tokens");
      }
    } catch (err) {
      setMessage("Error fetching tokens.");
    }
  };

  const createToken = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/auth/tokens?is_admin=${isAdmin}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        setMessage("Token created: " + data.token);
      } else {
        setMessage(data.detail || "Failed to create token");
      }
    } catch (err) {
      setMessage("Error creating token.");
    }
  };

  const deleteToken = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/auth/tokens/${tokenToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        setMessage("Token deleted successfully.");
        setTokenToDelete("");
        fetchTokens();
      } else {
        setMessage(data.detail || "Failed to delete token");
      }
    } catch (err) {
      setMessage("Error deleting token.");
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Admin Panel</h2>
      <input
        type="text"
        placeholder="Enter admin bearer token"
        value={adminToken}
        onChange={(e) => setAdminToken(e.target.value)}
        className="border px-2 py-1 w-full"
      />

      <div className="space-x-2">
        <label>
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
          <span className="ml-1">Create as Admin</span>
        </label>
        <button
          onClick={createToken}
          className="bg-green-600 text-white px-4 py-1 rounded"
        >
          Create Token
        </button>
      </div>

      <div className="space-x-2">
        <input
          type="text"
          placeholder="Token to delete"
          value={tokenToDelete}
          onChange={(e) => setTokenToDelete(e.target.value)}
          className="border px-2 py-1"
        />
        <button
          onClick={deleteToken}
          className="bg-red-600 text-white px-4 py-1 rounded"
        >
          Delete Token
        </button>
      </div>

      <div>
        <button
          onClick={fetchTokens}
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          Load Tokens
        </button>
        <ul className="mt-2">
          {tokens.map((tokenObj, idx) => (
            <li key={idx} className="text-sm">
              {tokenObj.token} — {tokenObj.isAdmin ? "Admin" : "User"}
            </li>
          ))}
        </ul>
      </div>

      {message && <p className="text-sm text-gray-700 mt-2">{message}</p>}
    </div>
  );
};

export default AdminTab;
