import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import './Translate.css';

function EnglishToHebrewTranslator(props) {
  const [inputWords, setInputWords] = useState([]);
  const [outputWords, setOutputWords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setInputWords(props.wordsList);
    console.log(props.wordsList); // Updated value from props
  }, [props.wordsList]);
  useEffect(() => {
    console.log(inputWords); // should print the updated value
    translateWords();
  }, [inputWords]);

  const apiKey = '...';
  const translateWords = async () => {
    console.log(inputWords);
    try {

      const response = await axios.post(
        `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
        {
          q: inputWords,
          source: 'en',
          target: 'he',
          format: 'text'
        }
      );
      setOutputWords(response.data.data.translations.map(t => t.translatedText));
      console.log(outputWords);
    }
    catch (error) {
      console.log(inputWords);
      console.error(error);
    }
  };

  const playAudio = (word) => {
    const audio = new Audio(`https://ssl.gstatic.com/dictionary/static/sounds/oxford/${word}--_gb_1.mp3`);
    audio.play();
  }

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div style={{ width: '100%', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {inputWords.map((word, index) => (
            <div key={index} className="table" style={{ display: "flex", flexDirection: "row", justifyContent: 'center' }}>
              <div className="translation-container">
                <p>{outputWords[index]}</p>
              </div>
              <div className='container'>
                <div>
                  <p>{word}</p>
                  <div className="buttons-container">
                    <IconButton className="containerItems" onClick={() => playAudio(word)}>
                      <VolumeUpIcon />
                    </IconButton>
                    <IconButton className="containerItems" onClick={() => { navigator.clipboard.writeText(word) }}>
                      <ContentCopyIcon />
                    </IconButton>
                  </div>
                </div>

              </div>
            </div>

          ))}
        </div>
      )}
    </div>
  );
}

export default EnglishToHebrewTranslator;

