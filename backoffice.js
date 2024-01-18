// creiamo innanzitutto i riferimenti agli elementi della pagina
const nameInput = document.getElementById('name')
const descriptionInput = document.getElementById('description')
const timeInput = document.getElementById('time')
const priceInput = document.getElementById('price')

const form = document.getElementsByTagName('form')[0]
const URL = 'https://striveschool-api.herokuapp.com/api/agenda'

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

  // ora facciamo una fetch() però NON con il metodo GET (che riceve dati), ma con POST (che crea una nuova entità)
})
