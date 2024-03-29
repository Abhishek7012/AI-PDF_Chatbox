import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Nav from '../Nav';
import './Home.css'; 

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const navigate = useNavigate();

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = async () => {
    try {
      if (selectedFile) {
        setUploading(true);

        const formData = new FormData();
        formData.append('file', selectedFile, selectedFile.name);

        const response = await axios.post('http://localhost:5000/upload', formData);

        if (response.status === 200) {
          setUploadSuccess(true);
          setUploading(false);
          setTimeout(() => {
            setUploadSuccess(false);
            setUploading(false);
            navigate('/chat');
          }, 2000);
        }
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  const fileData = () => {
    if (selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {selectedFile.name}</p>
          <p>File Type: {selectedFile.type}</p>
          <p>Last Modified: {selectedFile.lastModifiedDate.toDateString()}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Please select a file before pressing the upload button</h4>
        </div>
      );
    }
  };

  return (
    <div className='main'>
      <Nav />
      <div className='container mt-5'>
        <h1 className='text-center'>File Upload</h1>
        <Form>
          <FormGroup>
            <Label for='exampleFile'>File</Label>
            <Input type='file' name='file' id='exampleFile' onChange={onFileChange} />
            <FormText color='muted'>Please select the file you want to upload.</FormText>
          </FormGroup>
          <Button color='primary' onClick={onFileUpload} disabled={uploading}>
            {uploading && <span className='loading-spinner'></span>} Upload
          </Button>
        </Form>
        {uploadSuccess && (
          <div className='success-message'>File uploaded successfully!</div>
        )}
        {fileData()}
      </div>
    </div>
  );
};

export default Home;
