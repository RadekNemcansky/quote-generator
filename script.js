const quoteContainer = document.getElementById("quote-container")
const quoteText = document.getElementById("quote")
const authorText = document.getElementById("author")
const twitterBtn = document.getElementById("twitter")
const newQuoteBtn = document.getElementById("new-quote")
const loader = document.getElementById("loader")

let apiQuotes = [];
 
 
function showLoadingIcon() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoadingIcon() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

//show new Quote 
function newQuote() {
  showLoadingIcon();
  //Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

 //Check if Author field is blank and replace it with "unknown"
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
 
  // Check quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  //Set Quote, Hide loader
  quoteText.textContent = quote.text;
  hideLoadingIcon();
}

  //get quotes from API 
async function getQuotes() {
    showLoadingIcon()
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
      const response = await fetch(apiUrl)
      apiQuotes = await response.json();
      newQuote();
    } catch (error) {
      //catch error Here
    }
}

//Tweet a quote 
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl,"_blank" )
}
   
//Event listeners 
newQuoteBtn.addEventListener("click", newQuote) 
twitterBtn.addEventListener("click", tweetQuote) 

// On load 
getQuotes();

