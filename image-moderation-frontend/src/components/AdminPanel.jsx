import { useEffect, useState } from "react";
import { createToken, getTokens, deleteToken, setToken } from "../api/api";

function AdminPanel() {
  const [adminToken, setAdminToken] = useState("");
  const [tokens, setTokens] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchTokens = async () => {
    try {
      setToken(adminToken);
      const res = await getTokens();
      setTokens(res.data);
    } catch (err) {
      alert("Invalid Admin Token");
    }
  };

  const handleCreateToken = async () => {
    try {
      const res = await createToken(isAdmin);
      alert("Token created: " + res.data.token);
      fetchTokens();
    } catch {
      alert("Token creation failed");
    }
  };

  const handleDelete = async (token) => {
    await deleteToken(token);
    fetchTokens();
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <input
        type="text"
        placeholder="Admin Bearer Token"
        value={adminToken}
        onChange={(e) => setAdminToken(e.target.value)}
      />
      <button onClick={fetchTokens}>Login</button>
      <div>
        <label>
          <input type="checkbox" checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} />
          Create Admin Token
        </label>
        <button onClick={handleCreateToken}>Create Token</button>
      </div>
      <h3>Token List</h3>
      <ul>
        {tokens.map((tokenObj) => (
          <li key={tokenObj.token}>
            {tokenObj.token} - {tokenObj.isAdmin ? "Admin" : "User"} - {tokenObj.createdAt}
            <button onClick={() => handleDelete(tokenObj.token)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;
