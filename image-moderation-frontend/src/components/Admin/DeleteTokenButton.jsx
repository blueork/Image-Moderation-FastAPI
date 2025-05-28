import { useState } from "react";

const DeleteTokenButton = ({ token, adminToken, onDeleted }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (!adminToken) {
      setError("Please enter admin token above to delete.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this token?")) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`http://127.0.0.1:8000/auth/tokens/${token}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      if (!response.ok) {
        const err = await response.json();
        setError(err.detail || "Failed to delete token.");
      } else {
        onDeleted();
      }
    } catch (err) {
      setError("Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50"
      >
        {loading ? "Deleting..." : "Delete"}
      </button>
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </>
  );
};

export default DeleteTokenButton;
