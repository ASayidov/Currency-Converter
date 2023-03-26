const elementUSD = document.querySelector('[data-value="USD"]')
const elementEUR = document.querySelector('[data-value="EUR"]')
const elementUZS = document.querySelector('[data-value="UZS"]')


const API = 'https://www.cbr-xml-daily.ru/daily_json.js'

const rates = {};

const getData = async (resurs) => {
  const req = await fetch(resurs)
  if (req.status != 200) {
    throw new Error('error please try again later')
  }
  const data = await req.json()

  // color for informer
  // if (rates.USD.Value > rates.USD.Previous) {
  //   elementUSD.classList.add('top')
  // } else {
  //   elementUSD.classList.add('bottom')
  // }

  // if (rates.EUR.Value > rates.EUR.Previous) {
  //   elementEUR.classList.add('top')
  // } else {
  //   elementEUR.classList.add('bottom')
  // }

  // if (rates.UZS.Value > rates.UZS.Previous) {
  //   elementUZS.classList.add('top')
  // } else {
  //   elementUZS.classList.add('bottom')
  // }
  return data
}



const showRate = (data) => {

  rates.USD = data.Valute.USD
  rates.EUR = data.Valute.EUR
  rates.UZS = data.Valute.UZS
  console.log(rates);
  elementUSD.textContent = rates.USD.Value.toFixed(2)
  elementEUR.textContent = rates.EUR.Value.toFixed(2)
  elementUZS.textContent = rates.UZS.Value.toFixed(2)
}



getData(API).then((value) => {
  showRate(value)
}).catch((err) => { (console.log(err.message)) })
