const elementUSD = document.querySelector('[data-value="USD"]')
const elementEUR = document.querySelector('[data-value="EUR"]')
const elementUZS = document.querySelector('[data-value="UZS"]')
const select = document.getElementById('select')
const input = document.getElementById('input')
const result = document.getElementById('result')



const API = 'https://www.cbr-xml-daily.ru/daily_json.js'


//get data from API
const getData = async (resurs) => {
  const req = await fetch(resurs)
  if (req.status != 200) {
    throw new Error('error please try again later')
  }
  const data = await req.json()
  return data
}

// show rates

const rates = {};

const showRate = (data) => {

  rates.USD = data.Valute.USD
  rates.EUR = data.Valute.EUR
  rates.UZS = data.Valute.UZS
  elementUSD.textContent = rates.USD.Value.toFixed(2)
  elementEUR.textContent = rates.EUR.Value.toFixed(2)
  elementUZS.textContent = (rates.UZS.Value / 10000).toFixed(2)
  return rates
}

// color for informer
const colorChange = () => {

  if (rates.USD.Value > rates.USD.Previous) {
    elementUSD.classList.add('top')
  } else {
    elementUSD.classList.add('bottom')
  }

  if (rates.EUR.Value > rates.EUR.Previous) {
    elementEUR.classList.add('top')
  } else {
    elementEUR.classList.add('bottom')
  }

  if (rates.UZS.Value > rates.UZS.Previous) {
    elementUZS.classList.add('top')
  } else {
    elementUZS.classList.add('bottom')
  }
}

//show data from api
getData(API).then((value) => {
  showRate(value)
  colorChange(value)
  console.log(value);
}).catch((err) => { (console.log(err.message)) })


//convert valut
input.oninput = converValut
select.oninput = converValut

function converValut(params) {
  if (rates[select.value].CharCode == 'UZS') {
    result.value = (input.value / (rates[select.value].Value * 0.0001)).toFixed(2)
  } else {
    result.value = (input.value / rates[select.value].Value).toFixed(2)
  }
}
