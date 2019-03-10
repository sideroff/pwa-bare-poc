let history = []
const API_BASE = "https://jsonplaceholder.typicode.com/"
const API = API_BASE + "posts/"

window.onload = function () {
  console.log('installing service worker')
  installServiceWorkerAsync();

  if (!navigator.onLine) {
    document.querySelector('#history').innerHTML = "It appears you are not connected to the internet."
  }
}

// Install the service worker
async function installServiceWorkerAsync() {
  if ('serviceWorker' in navigator) {
    try {
      let serviceWorker = await navigator.serviceWorker.register('/../sw.js')
      console.log(`Service worker registered ${serviceWorker}`)
    } catch (err) {
      console.error(`Failed to register service worker: ${err}`)
    }
  }
}

// generate item tag from a Javascript Object that containt the item information
function buildItemMarkup(item) {
  return `<div class="item">
            <div class="title">${item.title}</div>
            <div class="body">${item.body}</div>
            <div class="author">Posted by: ${item.userId}</div>
          </div>`
}

function build404(id) {
  return `<div> Post with id: ${id} does not exist. </div>`
}

// add an item to the history and updates display
function updateHistory(item) {
  history.push(item)
  //update display
  addItemToHistoryTag(item)
}

// Update the DOM
function addItemToHistoryTag(item) {
  document.querySelector('#history').innerHTML = buildItemMarkup(item) + document.querySelector('#history').innerHTML
}

// load the item from the internet and place it on a target element
function onOkButtonClickAsync() {
  let targetElementId = '#main'
  let id = document.querySelector("#id-input").value
  fetch(API + id).then(response => {
    return response.json();
  }).then(item => {
    document.querySelector(targetElementId).innerHTML = buildItemMarkup(item)
  }).catch(error => {
    console.log(error)
    document.querySelector('#history').innerHTML = 'There was a problem while executing your query.'
  })
}