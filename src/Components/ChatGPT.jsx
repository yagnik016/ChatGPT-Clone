import React, { Component } from 'react';
import axios from 'axios';

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        textAlign: 'center',
        background: `url('https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.firstpost.com%2Fworld%2F5-reasons-why-gpt-4-is-better-than-chatgpt-12294562.html&psig=AOvVaw1_LUjMX6jv9SVgQsqqA35f&ust=1697878521984000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJDW69qghIIDFQAAAAAdAAAAABAE') no-repeat center center`,
        backgroundSize: 'cover',
      },
  header: {
    fontSize: '70px',
    marginBottom: '20px',
    color: '#000',
    fontweight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
  },
  button: {
    background: '#007BFF',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    fontSize: '18px',
    cursor: 'pointer',
    marginTop: '20px',
  },
  responseContainer: {
    marginTop: '20px',
    border: '1px solid #ccc',
    padding: '20px',
    fontSize: '16px',
    background: '#f9f9f9',
  },
  responseText: {
    lineHeight: '1.5',
    textAlign: 'left',
  },
  wordByWord: {
    display: 'inline',
    marginLeft: '5px',
    color: '#007BFF',
  },
};

class ChatGPT extends Component {
  constructor() {
    super();
    this.state = {
      userInput: '',
      response: '',
      words: [],
      currentIndex: 0,
    };
  }

  handleInputChange = (event) => {
    this.setState({ userInput: event.target.value });
  }

  handleGenerateResponse = () => {
    const apiKey = '3a84d2a400mshde756ce8bf8e207p103a3cjsnf51caa713198';  // Replace with your own API key  
    //get your key from https://rapidapi.com/nextbaseapp/api/chatgpt-gpt4-ai-chatbot
    const apiUrl = 'https://chatgpt-gpt4-ai-chatbot.p.rapidapi.com/ask';

    const headers = {
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'chatgpt-gpt4-ai-chatbot.p.rapidapi.com',
    };

    const requestData = {
      query: this.state.userInput,
    };

    axios.post(apiUrl, requestData, { headers })
      .then((response) => {
        this.setState({
          response: response.data.response,
          words: response.data.response.split(' '),
          currentIndex: 0,
        });

        // Start displaying words with a delay
        this.startDisplayWords();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  startDisplayWords = () => {
    const { currentIndex, words } = this.state;
    if (currentIndex < words.length) {
      setTimeout(() => {
        this.setState({ currentIndex: currentIndex + 1 });
        this.startDisplayWords();
      }, 200); // Adjust the delay as needed
    }
  }

  
  render() {
    return (
      <div style={styles.container}>
        <h1 style={styles.header}>ChatGPT Chatbot</h1>
        <input
          type="text"
          placeholder="Enter your query here..."
          value={this.state.userInput}
          onChange={this.handleInputChange}
          style={styles.input}
        />
        <button onClick={this.handleGenerateResponse} style={styles.button}>Generate Response</button>

        <div style={styles.responseContainer}>
          {this.state.response && (
            <div>
              <p>Response:</p>
              <div style={styles.responseText}>
                {this.state.words
                  .slice(0, this.state.currentIndex)
                  .map((word, index) => (
                    <span key={index} style={styles.wordByWord}>
                      {word}
                    </span>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ChatGPT;