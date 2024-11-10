import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsFeed = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [error, setError] = useState(null);
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
        );
        setNewsArticles(response.data.articles.slice(0, 5)); // Get the top 5 articles
      } catch (error) {
        setError('Failed to fetch news data');
      }
    };

    fetchNews();
  }, [apiKey]);

  if (error) return <div>{error}</div>;
  if (!newsArticles.length) return <div>Loading news...</div>;

  return (
    <div className="news-feed">
      <h2>Latest News</h2>
      <ul>
        {newsArticles.map((article, index) => (
          <li key={index}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsFeed;
