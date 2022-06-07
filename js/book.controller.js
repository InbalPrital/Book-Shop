'use strict'

function onInit() {
  _createBooks()
  console.log(gBooks)
  renderBooks()
}

function renderBooks() {
  var books = getBooksForDisplay()
  console.log('render')
  var strHTMLs = gBooks.map(
    (book) => `  <tr>
                    <td>${book.id}</td>
                    <td>${book.title}</td>
                    <td>${book.price}</td>
                    <td>
                    <button onclick="onReadBook('${book.id}')" data-trans="read">Read</button>
                    <button onclick="onUpdateBook('${book.id}')" data-trans="update">Update</button>
                    <button onclick="onRemoveBook('${book.id}')" data-trans="delete">Delete</button>
                    </td>
                    </tr>`
  )

  const elBooks = document.querySelector('tbody')
  elBooks.innerHTML = strHTMLs.join('')
  // doTrans() TAL
}

function onRemoveBook(bookId) {
  console.log(bookId)
  removeBook(bookId)
  renderBooks()
}

function onAddBook() {
  var name = prompt('Book name?')
  var price = prompt('Book price?')
  if (name && price) {
    const book = addBook(name, price)
    renderBooks()
  }
}

function onUpdateBook(bookId) {
  console.log(bookId)
  var book = getBookById(bookId)
  const price = +prompt("Book's new price?")
  book = updateBook(bookId, price)
  renderBooks()
}

function onReadBook(bookId) {
  var book = readBook(bookId)
  var elModal = document.querySelector('.modal')
  elModal.querySelector(
    'h2'
  ).innerText = `Book Name: ${book.title}\nBook Price: ${book.price}`
  elModal.style.display = 'block'
  var elRate = document.querySelector('.curr-rate')
  console.log(elRate)
  console.log(book)
  elRate.innerText = book.rate
}

function renderRate() {
  var elCurrRate = document.querySelector('.curr-rate')
  elCurrRate.innerText = gCurrBook.rate // להפוך לפונקציה שנמתאת בסרווס.
}

function setQueryParams(bookId) {
  const queryStringParams = `?bookId=${book.id}`
  const newUrl =
    window.location.protocol +
    '//' +
    window.location.host +
    window.location.pathname +
    queryStringParams
  window.history.pushState({ path: newUrl }, '', newUrl)
}

function onReduceRate() {
  reduceRate()
  renderRate()
}

function onIncreseRate() {
  increseRate()
  renderRate()
}

function onSetFilterBy(filterBy) {
  filterBy = setBookFilter(filterBy)
  renderBooks()

  const queryStringParams = `?maxPrice=${filterBy.maxPrice}&minRate=${filterBy.minRate}`
  const newUrl =
    window.location.protocol +
    '//' +
    window.location.host +
    window.location.pathname +
    queryStringParams
  window.history.pushState({ path: newUrl }, '', newUrl)
}

function onCloseModal() {
  const elModal = document.querySelector('.modal')
  elModal.style.display = 'none'
}

function onSetLang(lang) {
  setLang(lang)
  if (lang === 'he') document.body.classList.add('rtl')
  else document.body.classList.remove('rtl')
  doTrans()
  // renderBooks() TAL
}
