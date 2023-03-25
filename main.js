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

  rates.USD = data.Valute.USD
  rates.EUR = data.Valute.EUR
  rates.UZS = data.Valute.UZS
  console.log(rates);
  elementUSD.textContent = rates.USD.Value.toFixed(2)
  elementEUR.textContent = rates.EUR.Value.toFixed(2)
  elementUZS.textContent = rates.UZS.Value.toFixed(2)



  return data

}


// getData(API).then((value) => {
//   console.log(value);
// }).catch((err) => { (console.log(err.message)) })

getData(API)
