// questo foglio JS è collegato a index.html (la homepage)
// nel file HTML ho inserito tutta la struttura STATICA
// ora recupero i dati dei concerti con una FETCH

const generateCards = function (arrayOfConcerts) {
  // manipolazione del DOM
  arrayOfConcerts.forEach((concert) => {
    const newCol = document.createElement('div')
    newCol.classList.add('col', 'col-12', 'col-md-4', 'col-lg-3')
    newCol.innerHTML = `
        <div class="card h-100">
            <img src="https://img.freepik.com/free-photo/back-view-crowd-fans-watching-live-performance-music-concert-night-copy-space_637285-544.jpg?w=1480&t=st=1705570099~exp=1705570699~hmac=06c85fe577590cd689a88ab44d2985f7bcc0443968af2dae3f437d18db891c46" class="card-img-top" alt="...">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${concert.name}</h5>
                <p class="card-text flex-grow-1">${concert.description}</p>
                <p class="card-text">${concert.time.split('T')[0]} - ${
      concert.time.split('T')[1].split('.')[0]
    }</p>
                <a href="#" class="btn btn-primary"><i class="bi bi-cart-check me-2"></i>${
                  concert.price || '?'
                }€</a>
                <a href="./details.html?concertId=${
                  concert._id
                }" class="btn btn-success mt-2"><i class="bi bi-caret-right"></i></i>
                 VAI AI DETTAGLI 
                </a>
            </div>
        </div>
        `
    // ci manca solo da appendere questa col alla row degli eventi
    const eventsRow = document.getElementById('events-row')
    eventsRow.appendChild(newCol)
  })
}

// "2024-05-25T    19:30:00.000Z"

const getConcerts = function () {
  const myURL = 'https://striveschool-api.herokuapp.com/api/agenda'
  // nella homepage useremo questo URL per fare un'operazione di GET
  fetch(myURL)
    .then((response) => {
      // tutto bene, ho ottenuto una response dal server
      console.log('response', response)
      if (response.ok) {
        // ci informa che la chiamata ha avuto esito positivo es. 200
        // solo qui posso "provare" ad estrarre il JSON trasportato (i dati)
        return response.json()
      } else {
        // mi auto-lancio nel catch() per comodità
        throw new Error('errore nella chiamata')
      }
    })
    .then((data) => {
      console.log('DATA', data)
      // in questo blocco then abbiamo accesso a "data"
      // con "data" noi ora manipoleremo il DOM e creeremo le cards/slides per mostrare i concerti disponibili
      generateCards(data)
    })
    .catch((err) => {
      // il server non è stato contattato oppure sono finito qui dentro
      // perchè ho generato artificialmente un errore
      console.log(err)
    })
}

getConcerts()
