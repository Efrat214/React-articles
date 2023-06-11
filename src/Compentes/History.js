import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ArticleCard from './GetAllArticals';

const History = () => {
  const user = useSelector(state => state.userSlice.currentUser);
  const [articels, setArticels] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  useEffect(() => {
    axios.get(`https://localhost:7193/api/ArticelsToUsers/${user.id}`)
      .then((response) => {
        console.log(response.data);
        setArticels(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])
  const fetchData = async () => {
    const promises = articels.map(article => axios.get(`https://localhost:7193/api/Categories/${article.category}`));
    const responses = await Promise.all(promises);
    const categoryData = responses.map(response => response.data);
    setCategoryData(prevCategoryData => [...prevCategoryData, ...categoryData]);
  }
  useEffect(() => {
    if (articels)
      fetchData()
  }, [articels])
  useEffect(() => {
    if (categoryData)
      console.log('categoryDataaaaaaaaa:' + categoryData);
  }, [categoryData])
  const articless = articels.map((article, index) => (
    <div style={{ margin: '80px' }} key={article.id}>
      <ArticleCard item={article} categoryy={categoryData[index]?.name} />
    </div>
  ));
  return (
    <div>
      {articless}
    </div>
  );
};

export default History;
