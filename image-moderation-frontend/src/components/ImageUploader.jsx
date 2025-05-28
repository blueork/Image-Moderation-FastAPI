import { useState } from "react";
import { moderateImage } from "../api/api";

function ImageUploader() {
  const [file, setFile] = useState(null);
  const [report, setReport] = useState(null);

  const handleUpload = async () => {
    try {
      const res = await moderateImage(file);
      setReport(res.data);
    } catch {
      alert("Moderation failed. Invalid token?");
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
      <button disabled={!file} onClick={handleUpload}>Moderate</button>

      {report && (
        <div>
          <h3>Moderation Report</h3>
          <p><strong>Summary:</strong> {report.summary}</p>
          <ul>
            {report.issues.map((issue, i) => <li key={i}>{issue}</li>)}
          </ul>
          <pre>{JSON.stringify(report.details, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
