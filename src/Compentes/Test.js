import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Radio from '@mui/material/Radio';
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardMedia, CircularProgress, Link, Menu } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice';

export default function Test() {
  const [questions, setQuestions] = React.useState();
  const location = useLocation();
  const { name, email, password } = location.state;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [selectedAnswer, setSelectedAnswer] = React.useState(null);
  const [score, setScore] = React.useState(0);
  const [showScore, setShowScore] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [totalPoints, setTotalPoints] = React.useState(0);
  const [userLevel, setuserLevel] = React.useState(-1);
  const [user, setuser] = React.useState(0);

  const [levelScores, setLevelScores] = React.useState([])
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const levelPoints = {
    0: 10, // Level 0 score
    1: 20, // Level 1 score
    2: 30, // Level 2 score
    3: 40
  };
  const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #f153ff 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px',
      direction: 'ltr'
    },
  });
  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:7193/api/Test');
      setQuestions(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);
  const fetchData1 = async () => {
    if (userLevel > -1) {
      console.log(userLevel);
      let dataa = {
        id: 0,
        name: name,
        mail: email,
        password: password,
        level: userLevel,
      };
      console.log(dataa);
      console.log('Before axios.post');
      try {
        const response = await axios.post("https://localhost:7193/api/Users", dataa);
        setuser(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }

  React.useEffect(() => {
    fetchData1()
  }, [name, email, password, userLevel]);
  // Calculate the total score based on the number of questions
  React.useEffect(() => {
    if (questions && questions.length > 0) {
      const scores = calculateLevelScores();
      setLevelScores(scores);
    }
  }, [questions]);
  React.useEffect(() => {
    if (levelScores.length > 0)
      console.log(levelScores);
  }, [levelScores])
  const userr = async () => {
    if (user) {
      await dispatch(login(user.mail))
      console.log(user);
      navigate('/menu')
    }
  };

  React.useEffect(() => {
    userr()
  }, [user])
  const totalScore = 100;

  // Calculate the score for each level
  const calculateLevelScores = () => {
    const levelScores = {};
    // const totalQuestions = questions.length;

    const levels = Array.from(new Set(questions.map(question => question.level))); // Get unique levels from questions
    const levelWeights = [10, 20, 30, 40]; // Define the weights for each level in reverse order
    levels.forEach((level, index) => {
      const levelQuestions = questions.filter(question => question.level === level);
      const levelQuestionCount = levelQuestions.length;
      const levelWeight = levelWeights[index]; // Get the weight for the current level
      // const levelScore = Math.round(scorePerWeight * levelQuestionCount * levelWeight);
      const levelScore = levelWeight / levelQuestionCount
      levelScores[level] = levelScore;
    });
    console.log(levelScores);

    return levelScores;
  }

  // Calculate the scores for each level
  // const levelScores = calculateLevelScores();

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].answer) {
      ///////מס השאלות-יחס
      const level = questions[currentQuestion].level;
      if (levelPoints.hasOwnProperty(level)) {
        setTotalPoints(prevPoints => prevPoints + levelScores[level]);
      }

      setScore(score + 1);
      console.log(name);
    }
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    }
    else {
      calculateUserLevel()
      setShowScore(true);
    }

  }

  const calculateUserLevel = () => {
    switch (totalPoints) {
      case totalPoints <= 40:
        setuserLevel(0);
        break;
      case totalPoints > 40 && totalPoints <= 60:
        setuserLevel(1);
        break;
      case totalPoints > 60 && totalPoints <= 80:
        setuserLevel(2);
        break;
      case totalPoints > 60 && totalPoints <= 80:
        setuserLevel(2);
        break;
      case totalPoints > 80:
        setuserLevel(3);
        break;
      default:
        setuserLevel(0);
        break;
    }
  };
  const classes = useStyles();
  return (
    <div className={classes.root} style={{ maxWidth: 600, margin: "auto", padding: 16 }}>
      {isLoading ?
        <CircularProgress /> :
        <>
          {!showScore ? (
            <Card>
              <CardContent>
                <Typography variant="body1">
                  Question {currentQuestion + 1}: {questions[currentQuestion].questionText}
                </Typography>
                <FormControl component="fieldset" style={{ marginTop: 16 }}>
                  <RadioGroup
                    aria-label="answer"
                    name="answer"
                    value={selectedAnswer}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                  >
                    {questions[currentQuestion].options.map((option, index) => (
                      <FormControlLabel
                        key={index}
                        value={option}
                        control={<Radio />}
                        label={option}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: 16 }}
                  disabled={selectedAnswer === null}
                  onClick={handleNextQuestion}
                >
                  Next Question
                </Button>
              </CardContent>
              {/* </CardActionArea> */}
            </Card>
          ) : (
            <Card>
              <CardContent>
                <Typography variant="h6">Quiz Results</Typography>
                <Typography variant="body1">
                  You scored {score} out of {questions.length} your total {totalPoints}.
                </Typography>
              </CardContent>
            </Card>
          )}
        </>}

    </div>
  );
};