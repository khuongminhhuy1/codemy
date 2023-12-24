// src/components/EditLessonComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditLesson = () => {
    const { id } = useParams();
    const [lesson, setLesson] = useState({});
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      uploadedBy: '',
      videoType: 'url',
      videoValue: '',
    });
  
    useEffect(() => {
      // Fetch the lesson data based on the ID
      const fetchLessonData = async () => {
        try {
          const response = await axios.get(`/lessons/${id}`);
          if (response.data) {
            setLesson(response.data);
            setFormData({
              title: response.data.title || '',
              description: response.data.description || '',
              uploadedBy: response.data.uploadedBy || '',
              videoType: response.data.videoUrl ? 'url' : 'file',
              videoValue: response.data.videoUrl || response.data.uploadedVideo,
            });
          } else {
            console.error('Invalid API response:', response);
          }
        } catch (error) {
          console.error('Error fetching lesson data:', error);
        }
      };
  
      fetchLessonData();
    }, [id]);
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleFileChange = (e) => {
      setFormData({
        ...formData,
        videoType: 'file',
        videoValue: e.target.files[0],
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const { title, description, uploadedBy, videoType, videoValue } = formData;
  
        const formDataToSend = new FormData();
        formDataToSend.append('title', title);
        formDataToSend.append('description', description);
        formDataToSend.append('uploadedBy', uploadedBy);
  
        if (videoType === 'url') {
          formDataToSend.append('videoUrl', videoValue);
        } else if (videoType === 'file') {
          formDataToSend.append('uploadedVideo', videoValue);
        }
  
        // Make a PUT request to update the lesson
        await axios.put(`/lessons/${id}`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: storedUser?.role || '', // Use optional chaining to handle null/undefined
          },
        });
  
        console.log('Lesson updated successfully!', formData);
      } catch (error) {
        console.error('Error updating lesson:', error);
      }
    };
  return (
    <div>
      <h2>Edit Lesson</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} />

        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} />

        <label>Uploaded By:</label>
        <input type="text" name="uploadedBy" value={formData.uploadedBy} onChange={handleChange} />

        <label>Video Type:</label>
        <select name="videoType" value={formData.videoType} onChange={handleChange}>
          <option value="url">URL</option>
          <option value="file">File</option>
        </select>

        {formData.videoType === 'url' && (
          <div>
            <label>Video URL:</label>
            <input type="text" name="videoValue" value={formData.videoValue} onChange={handleChange} />
          </div>
        )}

        {formData.videoType === 'file' && (
          <div>
            <label>Upload Video:</label>
            <input type="file" name="videoValue" onChange={handleFileChange} />
          </div>
        )}

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditLesson;
