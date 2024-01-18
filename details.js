// questa pagina deve mostrare i dettagli di SOLAMENTE un evento
// come capisco dalla pagina details da quale evento provengo???
// capiamo da dove provengo perchè mi sto passando nell'URL l'_id dell'evento che intendo mostrare

// ora cosa devo fare? devo recuperare quell'id dalla barra degli indirizzi
// una volta che ho l'id, posso fare una fetch() con metodo GET per recuperare le informazioni di quel concerto

// recuperiamo l'ID dalla barra degli indirizzi
const addressBarContent = new URLSearchParams(location.search)
console.log(addressBarContent)
// estrapolo dai parametri dell'indirizzo quello che in index.js ho chiamato "concertId"
const concertId = addressBarContent.get('concertId')
console.log(concertId)

// abbiamo recuperato l'id del concerto!
// ora, faccio una get molto specifica (utilizzando questo ID) per recuperare l'oggetto del concerto in questione

const myURL = 'https://striveschool-api.herokuapp.com/api/agenda'

fetch(myURL + '/' + concertId) // 'https://striveschool-api.herokuapp.com/api/agenda/65a900b72c3f480018af82a9'
  .then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error('Errore nella chiamata')
    }
  })
  .then((singleConcert) => {
    console.log(singleConcert)
  })
  .catch((err) => {
    console.log(err)
  })

// GET su myURL -> TUTTI I CONCERTI (array)
// GET SU myURL / id -> SINGOLO CONCERTO (oggetto)
