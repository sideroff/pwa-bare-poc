let history = []
const API_BASE = "https://jsonplaceholder.typicode.com/"
const API = API_BASE + "posts/"

window.onload = function () {
  console.log('hello world')
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
async function onOkButtonClickAsync() {
  let targetElementId = '#main'
  let id = document.querySelector("#id-input").value
  try {
    const response = await fetch(API + id)
    if (!response.ok) return document.querySelector(targetElementId).innerHTML = build404(id);

    let item = await response.json()

    document.querySelector(targetElementId).innerHTML = buildItemMarkup(item)

    updateHistory(item)
  } catch (err) {
    console.error(`error ${err}`)
  }
}