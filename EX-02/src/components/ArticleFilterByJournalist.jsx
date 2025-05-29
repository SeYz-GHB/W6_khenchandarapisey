import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleFilterByJournalist() {
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [selectedJournalist, setSelectedJournalist] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
    fetchJournalists();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await axios.get('http://localhost:5000/articles');
      setArticles(res.data);
      setFilteredArticles(res.data); // Initialize filtered list
    } catch (err) {
      console.error('Error fetching articles:', err);
    }
  };

  const fetchJournalists = async () => {
    try {
      const res = await axios.get('http://localhost:5000/journalists');
      setJournalists(res.data);
    } catch (err) {
      console.error('Error fetching journalists:', err);
    }
  };

  const applyFilters = () => {
    if (!selectedJournalist) {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter(
        article => article.journalistId === parseInt(selectedJournalist)
      );
      setFilteredArticles(filtered);
    }
  };

  const resetFilters = () => {
    setSelectedJournalist('');
    setFilteredArticles(articles);
  };

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <label htmlFor="journalistFilter">Filter by Journalist:</label>
        <select
          id="journalistFilter"
          value={selectedJournalist}
          onChange={(e) => setSelectedJournalist(e.target.value)}
        >
          <option value="">All Journalists</option>
          {journalists.map(j => (
            <option key={j.id} value={j.id}>{j.name}</option>
          ))}
        </select>

        <button onClick={applyFilters}>Apply Filters</button>
        <button onClick={resetFilters}>Reset Filters</button>
      </div>

      <ul>
        {filteredArticles.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>By Journalist #{article.journalistId} | Category #{article.categoryId}</small><br />
            <button disabled>Delete</button>
            <button disabled>Update</button>
            <button disabled>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
