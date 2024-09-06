import { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Question from './components/Question';
import Results from './components/Results';
import UserForm from './components/UserForm';
import UserProvider from './components/UserContext';

import './App.css';

async function fetchArtwork(searchKeyword) {
  const baseUrl =
    'https://collectionapi.metmuseum.org/public/collection/v1/search?q=';
  const objectUrl =
    'https://collectionapi.metmuseum.org/public/collection/v1/objects/';

  try {
    const response = await fetch(`${baseUrl}${searchKeyword}`);
    const data = await response.json();

    if (!data.objectIDs || data.objectIDs.length === 0) {
      throw new Error('No artworks found for the search keyword.');
    }

    const randomIndex = Math.floor(
      Math.random() * Math.min(5, data.objectIDs.length)
    );
    const objectID = data.objectIDs[randomIndex];

    const objectResponse = await fetch(`${objectUrl}${objectID}`);
    const objectData = await objectResponse.json();

    return objectData;
  } catch (error) {
    console.error('Error fetching artwork data:', error);
    return null;
  }
}

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [element, setElement] = useState('');
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(false);


  const questions = [
    {
      question: "What's your favorite color?",
      options: ['Red 🔴', 'Blue 🔵', 'Green 🟢', 'Yellow 🟡'],
    },
    {
      question: "What's your favorite season?",
      options: ['Summer ☀️', 'Winter ❄️', 'Spring 🌸', 'Autumn 🍂'],
    },
    {
      question: 'Which type of environment do you prefer?',
      options: ['Mountains 🏔️', 'Beach 🏖️', 'Forest 🌲', 'Desert 🏜️'],
    },
    {
      question: 'What kind of weather do you enjoy the most?',
      options: ['Sunny ☀️', 'Rainy 🌧️', 'Windy 🌬️', 'Snowy ❄️'],
    },
  ];

  const keywords = {
    Fire: 'fire',
    Water: 'water',
    Earth: 'earth',
    Air: 'air',
  };

  const elements = {
    'Red 🔴': 'Fire',
    'Blue 🔵': 'Water',
    'Green 🟢': 'Earth',
    'Yellow 🟡': 'Air',
    'Summer ☀️': 'Fire',
    'Winter ❄️': 'Water',
    'Spring 🌸': 'Earth',
    'Autumn 🍂': 'Air',
    'Mountains 🏔️': 'Earth',
    'Beach 🏖️': 'Water',
    'Forest 🌲': 'Earth',
    'Desert 🏜️': 'Fire',
    'Sunny ☀️': 'Fire',
    'Rainy 🌧️': 'Water',
    'Windy 🌬️': 'Air',
    'Snowy ❄️': 'Water',
  };

  function handleAnswer(answer) {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  function determineElement(answers) {
    const counts = {};
    answers.forEach(function (answer) {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    return Object.keys(counts).reduce(function (a, b) {
      return counts[a] > counts[b] ? a : b;
    });
  }

  function handleReset() {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setElement('');
    setArtwork(null);
  }

  useEffect(
    function () {
      if (currentQuestionIndex === questions.length) {
        const selectedElement = determineElement(answers);
        setElement(selectedElement);
        setLoading(true);
        fetchArtwork(keywords[selectedElement]).then((data) => {
          setArtwork(data);
          setLoading(false);
        });
      }
    },
    [currentQuestionIndex]
  );

  return (
    <UserProvider>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<UserForm />} />
          <Route
            path='/quiz'
            element={
              currentQuestionIndex < questions.length ? (
                <Question
                  question={questions[currentQuestionIndex].question}
                  options={questions[currentQuestionIndex].options}
                  onAnswer={handleAnswer}
                />
              ) : (
                <Results
                  element={element}
                  artwork={artwork}
                  loading={loading}
                  onReset={handleReset}
                />
              )
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
