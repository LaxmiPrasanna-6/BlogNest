import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "@clerk/clerk-react";
import '../common/Articles.css'
function Articles() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const navigate = useNavigate();
  const { getToken } = useAuth();

  // Fetch articles
  async function getArticles() {
    try {
      const token = await getToken();
      const res = await axios.get('http://localhost:3000/author-api/articles', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Response:', res.data);
      if (res.data.message === 'Articles') {
        setArticles(res.data.payload);
        setFilteredArticles(res.data.payload); // Set initial articles
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError('Error fetching articles');
      console.error(err);
    }
  }

  function gotoArticle(articleObj) {
    navigate(`../${articleObj.articleId}`, { state: articleObj });
  }

  useEffect(() => {
    getArticles();
  }, []);

  // Categories
  const categories = ['all', 'programming', 'AI&ML', 'database'];

  // Handle category selection
  function handleCategoryChange(event) {
    const category = event.target.value;
    setSelectedCategory(category);
    
    if (category === 'all') {
      setFilteredArticles(articles);
    } else {
      setFilteredArticles(articles.filter(article => article.category === category));
    }
  }

  return (
    <div className='container'>
      {error.length !== 0 && <p className='display-4 text-center mt-5 text-danger'>{error}</p>}

      {/* Category Filter Dropdown */}
      <div className="text-center mt-4">
        <label htmlFor="categoryFilter" className="me-2 fw-bold">Filter by Category:</label>
        <select id="categoryFilter" className="form-select d-inline-block w-auto" value={selectedCategory} onChange={handleCategoryChange}>
          {categories.map(category => (
            <option key={category} value={category}>{category.toUpperCase()}</option>
          ))}
        </select>
      </div>

      {/* Display Articles */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 mt-4">
        {filteredArticles.length === 0 ? (
          <p className="text-center text-muted">No articles found for this category.</p>
        ) : (
          filteredArticles.map(articleObj => (
            <div className='col' key={articleObj.articleId}>
              <div class="container my-4">
  <div class="row">
    <div class="col-md-4 mb-3">
      <div class="card h-100">
        <div class="card-body">
          <div class="author-details text-end">
            <img src={articleObj.authorData.profileImageUrl} width="40" alt="" class="rounded-circle" />
            <p><small class="text-secondary">{articleObj.authorData.nameOfAuthor}</small></p>
          </div>
          <h5 class="card-title">{articleObj.title}</h5>
          <p class="card-text">{articleObj.content.substring(0, 80) + "..."}</p>
          <button class="btn btn-primary " onClick={()=> gotoArticle(articleObj)}>Read more</button>
        </div>
        <div class="card-footer">
          <small class="text-secondary">Last updated on {articleObj.dateOfModification}</small>
        </div>
      </div>
    </div>
   
  </div>
</div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Articles;
