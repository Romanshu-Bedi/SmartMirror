import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/NewsFeed.css';

const NewsFeed = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [error, setError] = useState(null);
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://newsdata.io/api/1/news?apikey=${apiKey}&country=us&language=en`
        );

        // Filter articles: remove duplicates and those without images
        const filteredArticles = response.data.results
          .filter(
            (article, index, self) =>
              article.image_url && // Ensure article has an image
              article.title && // Ensure article has a title
              self.findIndex((a) => a.title === article.title) === index // Remove duplicates by title
          )
          .slice(0, 5); // Limit to top 5 articles

        setNewsArticles(filteredArticles);
      } catch (error) {
        console.error("Error fetching news:", error);
        setError("Failed to fetch news data");
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
            {article.image_url && (
              <img src={article.image_url} alt="News" className="news-image" />
            )}
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsFeed;