// questo foglio JS è collegato a index.html (la homepage)
// nel file HTML ho inserito tutta la struttura STATICA
// ora recupero i dati dei concerti con una FETCH

const getConcerts = function () {
  const URL = 'https://striveschool-api.herokuapp.com/api/agenda'
  // nella homepage useremo questo URL per fare un'operazione di GET
  fetch(URL)
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
    })
    .catch((err) => {
      // il server non è stato contattato oppure sono finito qui dentro
      // perchè ho generato artificialmente un errore
      console.log(err)
    })
}

getConcerts()
