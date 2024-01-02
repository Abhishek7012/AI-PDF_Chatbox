import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Input } from 'reactstrap';
import './Chatpage.css';
import Nav from '../Nav';

function Chatpage() {
  const [question, setQuestion] = useState('');
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setQuestion(event.target.value);
  };

  async function fetchData() {
    try {
      const userid = localStorage.getItem('userid');
      const userId = JSON.parse(userid);
      const response = await fetch(`http://localhost:5000/list/${userId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setResponses(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleButtonClick = async () => {
    try {
      setLoading(true);
      const userid = localStorage.getItem('userid');
      const response = await axios.post('http://localhost:5000/answer', {
        question: question,
        userid: JSON.parse(userid),
      });
      const newResponse = { question, response: response.data.data.text };

      setResponses((prevResponses) => {
        if (prevResponses === undefined) {
          console.error('prevResponses is undefined');
          return [];
        }
        return [...prevResponses, newResponse];
      });
      setQuestion('');
      fetchData();
    } catch (error) {
      console.error('Error fetching new response:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='main'>
      <Nav />
      <div className="container mt-5">
        <div className="row">
          {!localStorage.getItem('userid') && (
            <div className="error-container">
              You are not logged in. Please login to continue.
              <button className="login-button" onClick={() => window.location.href = '/login'}>
                Login
              </button>
            </div>
          )}
          <div className="col-lg-8 mx-auto">
            <div className="my-4">
              <h1 className="text-center">Ask a Question</h1>
            </div>
            <div className="responses">
              {responses && responses.map((item, index) => (
                <div key={index} className="mb-3">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title"><strong>Que:</strong> {item.question}</h5>
                      <p className="card-text"><strong>Ans:</strong> {item.finalResponse}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="input-group mb-3">
              <Input
                className="form-control"
                placeholder="Ask your question here"
                onChange={handleInputChange}
                value={question}
              />
              <Button
                className='send btn btn-primary'
                color="secondary"
                onClick={handleButtonClick}
                disabled={loading}
              >
                {loading && <span className="loading-spinner" />} Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatpage;



