// creiamo innanzitutto i riferimenti agli elementi della pagina
const nameInput = document.getElementById('name')
const descriptionInput = document.getElementById('description')
const timeInput = document.getElementById('time')
const priceInput = document.getElementById('price')

const form = document.getElementById('concert-form')
const myURL = 'https://striveschool-api.herokuapp.com/api/agenda'

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

  fetch(myURL, {
    method: 'POST',
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
