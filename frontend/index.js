import { backend } from 'declarations/backend';

let articles = [];

async function fetchArticles() {
    showLoading();
    try {
        articles = await backend.getAllArticles();
        renderArticles();
    } catch (error) {
        console.error("Error fetching articles:", error);
        showError("Failed to fetch articles. Please try again later.");
    }
    hideLoading();
}

function renderArticles() {
    const articlesContainer = document.getElementById('articles');
    articlesContainer.innerHTML = '';

    if (articles.length === 0) {
        articlesContainer.innerHTML = '<p>No articles available.</p>';
        return;
    }

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
    const title = document.getElementById('articleTitle').value.trim();
    const content = document.getElementById('articleContent').value.trim();

    if (!title || !content) {
        showError("Please fill in both title and content.");
        return;
    }

    showLoading();
    try {
        await backend.addArticle(title, content);
        document.getElementById('articleForm').reset();
        await fetchArticles();
        showSuccess("Article added successfully.");
    } catch (error) {
        console.error("Error adding article:", error);
        showError("Failed to add article. Please try again.");
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

function showError(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    document.body.appendChild(errorElement);
    setTimeout(() => errorElement.remove(), 5000);
}

function showSuccess(message) {
    const successElement = document.createElement('div');
    successElement.className = 'success-message';
    successElement.textContent = message;
    document.body.appendChild(successElement);
    setTimeout(() => successElement.remove(), 5000);
}

document.getElementById('articleForm').addEventListener('submit', addArticle);

// Initial fetch of articles
fetchArticles();
