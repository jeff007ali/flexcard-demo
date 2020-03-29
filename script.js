function callNewsApi() {
    var url = 'http://newsapi.org/v2/everything?' +
          'q=coronavirus&' +
          'sortBy=popularity&' +
          'apiKey=cf0cba3704c24dda85bd20d224a7cc28';

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    var req = new Request(url, requestOptions);

    fetch(req)
    .then(response => response.json())
    .then(result => createNewsCard(result.articles))
    .catch(error => console.log('error', error));
}

function createNewsCard(articles) {
    console.log(articles);
    console.log(articles.length);

    for (var i = 0; i < articles.length; i++) {
        cardElement = document.getElementsByClassName('card')[0];
        clonedCard = cardElement.cloneNode(true);
        assignValuesToClonedCard(clonedCard, articles[i]);
        clonedCard.style.display = 'block';
        
        // get main cards grid element
        cardsGrid = document.getElementsByClassName('cards')[0];
        cardsGrid.appendChild(clonedCard);
    }
    
}

function assignValuesToClonedCard(card, article) {
    // set article url
    card.href = article.url;
    // set image of article
    card.getElementsByClassName('card-header')[0].style.backgroundImage = "url('" + article.urlToImage + "')";
    // set header of article
    clonedCard.getElementsByClassName('card-title')[0].firstElementChild.innerHTML = article.title;
    // set content summary of article
    clonedCard.getElementsByClassName('card-summary')[0].innerHTML = article.content;
    // set published data
    clonedCard.getElementsByClassName('card-meta')[0].innerHTML = "Published on : " + formatDate(article.publishedAt);
    // clonedCard.getElementsByClassName('card-meta')[0].innerHTML = formatDate(article.publishedAt);

    // set source of article
    clonedCard.getElementsByClassName('card-source')[0].innerHTML = "Source : " + article.source.name;
    // clonedCard.getElementsByClassName('card-source')[0].innerHTML = article.source.name;

}

function formatDate(strDate) {
    var monthNames = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

    var today = new Date(strDate);
    var dd = today.getDate();
    var mmm = monthNames[today.getMonth()];
    var yyyy = today.getFullYear();

    return mmm + " " + dd + ", " + yyyy; 
}

function mainScript() {
    callNewsApi()
}

document.addEventListener('DOMContentLoaded', mainScript);