import { backend } from 'declarations/backend';

let articles = [];

async function fetchArticles() {
    showLoading();
    try {
        articles = await backend.getAllArticles();
        renderArticles();
    } catch (error) {
        console.error("Error fetching articles:", error);
    }
    hideLoading();
}

function renderArticles() {
    const articlesContainer = document.getElementById('articles');
    articlesContainer.innerHTML = '';

    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.className = 'article';
        articleElement.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.content}</p>
            <small>Posted on: ${new Date(Number(article.timestamp) / 1000000).toLocaleString()}</small>
        `;
        articlesContainer.appendChild(articleElement);
    });
}

async function addArticle(event) {
    event.preventDefault();
    const title = document.getElementById('articleTitle').value;
    const content = document.getElementById('articleContent').value;

    showLoading();
    try {
        await backend.addArticle(title, content);
        document.getElementById('articleForm').reset();
        await fetchArticles();
    } catch (error) {
        console.error("Error adding article:", error);
    }
    hideLoading();
}

function showLoading() {
    const loadingSpinner = document.createElement('div');
    loadingSpinner.id = 'loadingSpinner';
    loadingSpinner.innerHTML = '<i data-feather="loader" class="spin"></i>';
    document.body.appendChild(loadingSpinner);
    feather.replace();
}

function hideLoading() {
    const loadingSpinner = document.getElementById('loadingSpinner');
    if (loadingSpinner) {
        loadingSpinner.remove();
    }
}

document.getElementById('articleForm').addEventListener('submit', addArticle);

// Initial fetch of articles
fetchArticles();
