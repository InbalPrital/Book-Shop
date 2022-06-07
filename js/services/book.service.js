const STORAGE_KEY = 'bookDB'

var gBooks = []
var gCurrBook
var gFilterBy = { maxPrice: -Infinity, minRate: 0 }

function getBooksForDisplay() {
  return gBooks
}

function _createBooks() {
  var books = loadFromStorage(STORAGE_KEY)
  if (!books || !books.length) {
    books = [
      { id: makeId(), title: 'kissed by the Moon', price: 20, rate: 0 },
      { id: makeId(), title: 'Guess How Much I Love You', price: 30, rate: 0 },
      { id: makeId(), title: 'The Hungry Caterpillar', price: 15, rate: 0 },
    ]
  }
  gBooks = books
  _saveBooksToStorage()
}

function _saveBooksToStorage() {
  saveToStorage(STORAGE_KEY, gBooks)
}

function removeBook(bookId) {
  const bookIdx = gBooks.findIndex((book) => bookId === book.id)
  gBooks.splice(bookIdx, 1)
  _saveBooksToStorage()
}

function addBook(name, price) {
  const book = { id: makeId(), title: name, price: price }
  gBooks.unshift(book)
  _saveBooksToStorage()
  return book
}

function getBookById(bookId) {
  const book = gBooks.find((book) => bookId === book.id)
  return book
}

function readBook(bookId) {
  gCurrBook = getBookById(bookId)
  return gCurrBook
}

function updateBook(bookId, price) {
  console.log(bookId)
  const book = gBooks.find((book) => bookId === book.id)
  console.log(book)
  book.price = price
  _saveBooksToStorage()
  return book
}

function reduceRate() {
  gCurrBook.rate--
}

function increseRate() {
  gCurrBook.rate++
}

function setBookFilter(filterBy = {}) {
  if (filterBy.vendor !== undefined) gFilterBy.vendor = filterBy.vendor
  if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed
  return gFilterBy
}

function setBookSort(sortBy = {}) {
  if (sortBy.maxPrice !== undefined) {
    gBooks.sort((c1, c2) => (c1.maxPrice - c2.maxPrice) * sortBy.maxPrice)
  } else if (sortBy.minRate !== undefined) {
    gBooks.sort(
      (c1, c2) => c1.minRate.localeCompare(c2.minRate) * sortBy.minRate
    )
  }
}
