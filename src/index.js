import './main.sass'
import html2canvas from './html2canvas.min.js'

console.log('hogehoge')

const url = location;
const params = new URLSearchParams(url.search);
const directedTableData = params.get('table')
const requestOptions = {
  method: 'GET',
  redirect: 'follow',
}
let tableData

const generateFromAPI = () =>{
  fetch("https://cryptic-eyrie-04921.herokuapp.com/panepon-table/", requestOptions)
    .then(response => response.text())
    .then(result => {
      tableData = JSON.parse(result).table
      console.log(tableData)
      displayTable(tableData)
      const UniqueID = tableData.join('').replace(/,/g, '')
      generateURL(url, UniqueID)
    })
    .catch(error => console.log('error', error))
}
const displayTable = (data) =>{
  const panels = document.querySelectorAll('.panel')
  console.log(panels)
  console.log("start drawing")
  data.forEach((line,i) =>{
    line.forEach((element,j) => {
      switch(element){
        case 0:
          // console.log(`${element}`)
          panels[i*6+j].classList.add("red")
          break;
        case 1:
          // console.log(`${element}`)
          panels[i*6+j].classList.add("sky")
          break;
        case 2:
          // console.log(`${element}`)
          panels[i*6+j].classList.add("yellow")
          break;
        case 3:
          // console.log(`${element}`)
          panels[i*6+j].classList.add("green")
          break;
        case 4:
          // console.log(`${element}`)
          panels[i*6+j].classList.add("purple")
          break;
      }
    })
  })
  console.log("end drawing")
  // captureImage()
}

const captureImage = () =>{
  const captureTarget = document.getElementById("panelTableContainer")
  html2canvas(document.querySelector("#panelTableContainer")).then(canvas => {
    document.body.appendChild(canvas)
    captureTarget.style.display = 'none'
  })
}

const copyToClipboard = () =>{
  const copyTarget = document.getElementById("UniqueURL")
  UniqueURL.select()
  document.execCommand("Copy")
  const buttonText = document.getElementById("copybutton")
  buttonText.innerText = "ｱｧｧｱｲ"
}

function splitArray(array, part) {
    var tmp = [];
    for(var i = 0; i < array.length; i += part) {
        tmp.push(array.slice(i, i + part));
    }
    return tmp;
}

const generateURL = (url, n) =>{
  const uniqueUrlParam = document.getElementById("UniqueURL")
  uniqueUrlParam.value = `${url}?table=${n}`
}

const numbersToTableFormatArray = (numbers) =>{
  const newData = Array.from(numbers)
  const newData_numbered = newData.map( str => parseInt(str, 10) )
  tableData = splitArray(newData_numbered, 6)
  console.log(tableData)
  displayTable(tableData)
  generateURL(url, numbers)
}

if(directedTableData != null ){
  numbersToTableFormatArray(directedTableData)
}else{
  console.log("[message] no param. try to request random data")
  generateFromAPI()
}