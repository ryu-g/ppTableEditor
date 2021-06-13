import './main.sass'
import html2canvas from './html2canvas.min.js'

console.log('hogehoge')

const copyToClipboard = () => {
  const UniqueURL = document.getElementById("UniqueURL")
  UniqueURL.select()
  document.execCommand("Copy")
  const buttonText = document.getElementById("copybutton_random")
  buttonText.innerText = "ｱｧｧｱｲ"
}

const url = location;
const params = new URLSearchParams(url.search)
const directedTableData = params.get('table')
const coopybutton_random = document.getElementById("copybutton_random")
coopybutton_random.addEventListener('click', copyToClipboard)
const editablePanel = document.getElementsByClassName('editable')

for(let panel of editablePanel){
  panel.addEventListener('click',() =>{
    let list = panel.classList
    switch(list[2]){
      case "dummy":
        panel.classList.remove("dummy")
        panel.classList.add("red")
        break
      case "red":
        panel.classList.remove("red")
        panel.classList.add("sky")
        break
      case "sky":
        panel.classList.remove("sky")
        panel.classList.add("yellow")
        break
      case "yellow":
        panel.classList.remove("yellow")
        panel.classList.add("green")
        break
      case "green":
        panel.classList.remove("green")
        panel.classList.add("purple")
        break
      case "purple":
        panel.classList.remove("purple")
        panel.classList.add("dummy")
        break
      }
  })
}

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
  captureImage()
}

const captureImage = () =>{
  const captureTarget = document.querySelector("#viewer")
  html2canvas(document.querySelector("#viewer")).then(canvas => {
    captureTarget.after(canvas)
    captureTarget.style.display = 'none'
  })
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
  console.log(`[message] loaded data ${tableData}`)
  displayTable(tableData)
  generateURL(url, numbers)
}

if(directedTableData != null ){
  numbersToTableFormatArray(directedTableData)
}else{
  console.log("[message] no param. try to request random data")
  generateFromAPI()
}