// creiamo innanzitutto i riferimenti agli elementi della pagina
const nameInput = document.getElementById('name')
const descriptionInput = document.getElementById('description')
const timeInput = document.getElementById('time')
const priceInput = document.getElementById('price')

const form = document.getElementById('concert-form')
const myURL = 'https://striveschool-api.herokuapp.com/api/agenda'

// PARTE FINALE DELLA LEZIONE
// ora il form deve servire anche in modalità "MODIFICA" evento
// come faccio a capire se la pagina backoffice si è caricata in modalità CREA o in modalità MODIFICA?
// se ho il parametro "concertId" nella barra degli indirizzi, sono in modalità MODIFICA!
// se NON ho il parametro "concertId" nella barra degli indirizzi, sono in modalità CREAZIONE!

const addressBarContent = new URLSearchParams(location.search)
console.log(addressBarContent)
// estrapolo dai parametri dell'indirizzo quello che in index.js ho chiamato "concertId"
const concertId = addressBarContent.get('concertId')
console.log(concertId)

if (concertId) {
  // cambiamo il titolo del form
  document.getElementById('form-title').innerText = 'Form di modifica evento'
  // recupero le informazioni da riempire nel form con una fetch() CHIRURGICA
  fetch(myURL + '/' + concertId)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(
          "non sono riuscito a recuperare l'evento per ripopolare il form"
        )
      }
    })
    .then((singleConcert) => {
      // ho ottenuto i dettagli di un singolo concerto!
      // ripopolo il form
      nameInput.value = singleConcert.name
      descriptionInput.value = singleConcert.description
      timeInput.value = singleConcert.time.split('.')[0]
      priceInput.value = singleConcert.price
    })
    .catch((err) => {
      console.log(err)
    })
}

// sovrascrivo il comportamento di default del form
form.addEventListener('submit', function (e) {
  e.preventDefault() // evitiamo che la pagina si aggiorni!
  // ora raccolgo i dati del form
  // genero un oggetto

  // la FORMA (schema) dell'oggetto da inviare alle API non è a caso!
  // è stata pensata dal backender che ha creato l'API
  // in genere, vi verrà fornita

  const newConcert = {
    name: nameInput.value,
    description: descriptionInput.value,
    price: priceInput.value,
    time: timeInput.value,
  }

  console.log('ecco i dati raccolti dal form che sto per inviare:', newConcert)

  // ora facciamo una fetch() però NON con il metodo GET (che riceve dati), ma con POST (che crea una nuova entità)

  // URL DA UTILIZZARE
  // per GET e POST l'indirizzo da utilizzare è lo stesso!

  // se siamo in modalità modifica, la fetch sul bottone di submit va modificata:
  // 1) il metodo non sarà più POST ma sarà PUT
  // 2) dovrei cambiare l'URL da "indirizzo generico" a "indirizzo specifico"

  let URLToUse
  let methodToUse

  if (concertId) {
    methodToUse = 'PUT'
    URLToUse = myURL + '/' + concertId
  } else {
    methodToUse = 'POST'
    URLToUse = myURL
  }

  fetch(URLToUse, {
    method: methodToUse, // alcune volte sarà PUT
    // method: concertId ? 'PUT' : 'POST', // alcune volte sarà PUT, metodo extreme delle 13:11 con operatore ternario
    body: JSON.stringify(newConcert), // il body in una fetch può essere SOLAMENTE una stringa
    headers: {
      // se avessimo un'autenticazione, la inseriremmo con una proprietà Authorization
      'Content-Type': 'application/json', // informiamo l'API che , nonostante il body sia una stringa, in origina era un oggetto
    },
  })
    .then((response) => {
      console.log(response)
      if (response.ok) {
        // il concerto è stato creato correttamente!
        alert('CONCERTO SALVATO!')
        // svuoto il form
        nameInput.value = ''
        descriptionInput.value = ''
        priceInput.value = ''
        timeInput.value = ''
      } else {
        alert('PROBLEMA NEL SALVATAGGIO!')
        // hai sbagliato qualcosa nella richiesta?
      }
    })
    .catch((err) => {
      console.log(err)
    })
})
