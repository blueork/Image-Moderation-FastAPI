import { useState } from "react";
import { setToken } from "../api/api";
import ImageUploader from "./ImageUploader";

function UserPanel() {
  const [userToken, setUserToken] = useState("");
  const [authorized, setAuthorized] = useState(false);

  const handleLogin = () => {
    if (userToken.trim()) {
      setToken(userToken);
      setAuthorized(true);
    } else {
      alert("Please provide a token");
    }
  };

  return (
    <div>
      <h2>User Image Moderation</h2>
      {!authorized ? (
        <>
          <input
            type="text"
            placeholder="Bearer Token"
            value={userToken}
            onChange={(e) => setUserToken(e.target.value)}
          />
          <button onClick={handleLogin}>Submit Token</button>
        </>
      ) : (
        <ImageUploader />
      )}
    </div>
  );
}

export default UserPanel;
