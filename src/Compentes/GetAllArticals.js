import { CenterFocusStrong } from '@mui/icons-material';
import { Button, Card, CardContent, hexToRgb, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { pink } from '@mui/material/colors';
import { Document, Page } from 'react-pdf';

import axios from 'axios';
import { saveAs } from 'file-saver';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    background: pink[100],
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 95,
    padding: '0 30px',
  },
  card: {
    alignItems:CenterFocusStrong,
    marginBottom: 10,
  },
});
function ArticleCard( props ) {
  const classes = useStyles();
  const navigate=useNavigate()

  const handleButtonClick = (article) => {
    console.log(article);
    console.log(props.categoryy);
    const category=props.categoryy
   navigate('/pdfff',{ state: { article,category } })
  }
  return (
    <div className={classes.root}>

   
    <Card className={classes.card}>
      <CardContent style={{display: 'flex',flexDirection:'column', justifyContent: 'center',}}>
        <Typography variant="h5" component="h2">
          {props.item.title}
        </Typography>
        <Button onClick={() => handleButtonClick(props.item)} variant="outlined" color="primary" style={{ width: 'fit-content' }}>
          Read Article
        </Button>
    
      </CardContent>
    </Card>
    </div>
  );
}

export default ArticleCard;

