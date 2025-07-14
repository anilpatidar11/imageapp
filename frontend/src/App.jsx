import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [image, setImage] = useState(null);
  const [allImages, setAllImages] = useState([]);

  const fetchImages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/images");
      setAllImages(res.data);
    } catch (err) {
      console.error("Error fetching images:", err.message);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) return alert("Please select an image");

    const formData = new FormData();
    formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Upload successful!");
      setImage(null);
      fetchImages();
    } catch (err) {
      console.error("Upload failed:", err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/images/${id}`);
      fetchImages();
    } catch (err) {
      console.error("Delete failed:", err.message);
    }
  };

  return (
    <div className="app-container">
      <h1>Cloudinary Image Upload</h1>

      <input type="file" onChange={handleFileChange} accept="image/*" />
      {/*   accept = It helps to prevent users from selecting non-image files (like .pdf, .mp4, .exe, etc.) */}
      <button onClick={handleUpload}>Upload</button>

      <hr />

      <h3>Uploaded Images</h3>
      <div className="image-gallery">
        {allImages.map((img) => (
          <div key={img._id} className="image-card">
            <img src={img.path} alt={img.filename} />
            <br />
            <button onClick={() => handleDelete(img._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
