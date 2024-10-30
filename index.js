const searchInput = document.getElementById('search-input');
const resultsList = document.getElementById('results');
const loader = document.getElementById('loader');
const errorMessage = document.getElementById('error-message');

searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.trim(); 
  if (searchTerm.length > 0) {
    fetchData(searchTerm); 
  } else {
    clearResults();
  }
});

function fetchData(term) {
  clearResults(); 
  showLoader(); 

  fetch(`https://itunes.apple.com/search?term=${term}&entity=song`)
    .then(response => response.json())
    .then(data => {
      hideLoader(); 
      if (data.results.length > 0) {
        displayResults(data.results); 
      } else {
        showError('No results found. Please try another term.'); 
      }
    })
    .catch(() => {
      hideLoader(); 
      showError('An error occurred while fetching data.'); 
    });
}

function displayResults(results) {
  results.forEach(result => {
    const listItem = document.createElement('li');
    listItem.textContent = `${result.trackName} by ${result.artistName}`; 
    resultsList.appendChild(listItem); 
  });
}

function clearResults() {
  resultsList.innerHTML = ''; 
  hideError(); 
}

function showLoader() {
  loader.style.display = 'block'; 
}

function hideLoader() {
  loader.style.display = 'none'; 
}

function showError(message) {
  errorMessage.textContent = message; 
  errorMessage.style.display = 'block'; 
}

function hideError() {
  errorMessage.style.display = "none";
}