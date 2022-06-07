var gTrans = {
  title: {
    en: 'Welcome to my book shop',
    he: 'ברוכים הבאים לחנות הספרים שלי',
  },
  bookFilter: {
    en: 'Book Filter',
    he: 'סינון ספרים',
  },
  all: {
    en: 'All',
    he: 'הכל',
  },
  maxPrice: {
    en: 'Max Price',
    he: 'מחיר מקסימלי',
  },
  minRate: {
    en: 'Min Rate',
    he: 'דירוג מינימלי',
  },
  creatNewBook: {
    en: 'Creat new book',
    he: 'יצירת ספר חדש',
  },
  id: {
    en: 'Id',
    he: 'מספר סידורי',
  },
  bookTitle: {
    en: 'Title',
    he: 'שם הספר',
  },
  price: {
    en: 'Price $',
    he: 'מחיר ₪ ',
  },
  actions: {
    en: 'Actions',
    he: 'פעולות',
  },
  read: {
    en: 'Read',
    he: 'קרא',
  },
  update: {
    en: 'Update',
    he: 'עדכן',
  },
  delete: {
    en: 'Delete',
    he: 'מחק',
  },
}

var gCurrLang = 'en'

function getTrans(transKey) {
  var keyTrans = gTrans[transKey]
  if (!keyTrans) return 'UNKNOWN'

  var txt = keyTrans[gCurrLang]
  if (!txt) txt = keyTrans.en

  return txt
}

function doTrans() {
  var els = document.querySelectorAll('[data-trans]')
  console.log(els)
  els.forEach((el) => {
    console.log(el.dataset)
    var transKey = el.dataset.trans
    var txt = getTrans(transKey)

    if (el.localName === 'input') {
      el.placeholder = txt
    } else el.innerText = txt
  })
}

function setLang(lang) {
  gCurrLang = lang
}

function formatNumOlder(num) {
  return num.toLocaleString('en')
}

function formatNum(num) {
  return new Intl.NumberFormat(gCurrLang).format(num)
}

function formatCurrency(num) {
  return new Intl.NumberFormat('he-IL', {
    style: 'currency',
    currency: 'ILS',
  }).format(num)
}
