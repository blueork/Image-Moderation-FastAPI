// import { useEffect, useState } from "react";
// import { createToken, getTokens, deleteToken, setToken } from "../api/api";

// function AdminPanel() {
//   const [adminToken, setAdminToken] = useState("");
//   const [tokens, setTokens] = useState([]);
//   const [isAdmin, setIsAdmin] = useState(false);

//   const fetchTokens = async () => {
//     try {
//       setToken(adminToken);
//       const res = await getTokens();
//       setTokens(res.data);
//     } catch (err) {
//       alert("Invalid Admin Token");
//     }
//   };

//   const handleCreateToken = async () => {
//     try {
//       const res = await createToken(isAdmin);
//       alert("Token created: " + res.data.token);
//       fetchTokens();
//     } catch {
//       alert("Token creation failed");
//     }
//   };

//   const handleDelete = async (token) => {
//     await deleteToken(token);
//     fetchTokens();
//   };

//   return (
//     <div>
//       <h2>Admin Panel</h2>
//       <input
//         type="text"
//         placeholder="Admin Bearer Token"
//         value={adminToken}
//         onChange={(e) => setAdminToken(e.target.value)}
//       />
//       <button onClick={fetchTokens}>Login</button>
//       <div>
//         <label>
//           <input type="checkbox" checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} />
//           Create Admin Token
//         </label>
//         <button onClick={handleCreateToken}>Create Token</button>
//       </div>
//       <h3>Token List</h3>
//       <ul>
//         {tokens.map((tokenObj) => (
//           <li key={tokenObj.token}>
//             {tokenObj.token} - {tokenObj.isAdmin ? "Admin" : "User"} - {tokenObj.createdAt}
//             <button onClick={() => handleDelete(tokenObj.token)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default AdminPanel;
import { useState } from "react";
import CreateTokenForm from "./CreateTokenForm";
import TokenList from "./TokenList";

const AdminPanel = () => {
  const [adminToken, setAdminToken] = useState("");
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLoadTokens = async () => {
    setLoading(true);
    setError("");
    setTokens([]);

    try {
      const res = await fetch("http://127.0.0.1:8000/auth/tokens", {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "Failed to fetch tokens");
      }

      const data = await res.json();
      setTokens(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Admin Panel</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Enter Admin Bearer Token</label>
        <input
          type="text"
          value={adminToken}
          onChange={(e) => setAdminToken(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Paste your admin token here"
        />
        <button
          onClick={handleLoadTokens}
          disabled={!adminToken || loading}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Load Tokens"}
        </button>

        {error && <p className="text-red-600 mt-2">{error}</p>}
      </div>

      {/* Show create token form and token list only after admin token is provided */}
      {adminToken && (
        <>
          <CreateTokenForm adminToken={adminToken} />
          <TokenList tokens={tokens} adminToken={adminToken} onDeleteSuccess={(deletedToken) => {
            // Remove the deleted token from the tokens list
            setTokens(tokens.filter(t => t.token !== deletedToken));
          }} />
        </>
      )}
    </div>
  );
};

export default AdminPanel;

