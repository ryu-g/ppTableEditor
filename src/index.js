import './main.sass'
import html2canvas from './html2canvas.min.js'

const ComparisonSheet = {0:'red',1:'sky',2:"yellow",3:'green',4:'purple',5:'dummy'}
const url = location;
const params = new URLSearchParams(url.search)
const directedTableData = params.get('table')
const copybutton_random = document.getElementById("copybutton_random")
copybutton_random.addEventListener('click', copyRandomUrlToClipboard)
const copybutton_edited = document.getElementById("copybutton_edited")
copybutton_edited.addEventListener('click', copyEditedUrlToClipboard)
const editablePanel = document.getElementsByClassName('editable')
let editedTableUrl = ''

function copyRandomUrlToClipboard(){
  const URL_random = document.getElementById("URL_random")
  URL_random.select()
  document.execCommand("Copy")
  const buttonText = document.getElementById("copybutton_random")
  buttonText.innerText = "ｱｧｧｱｲ"
}
function copyEditedUrlToClipboard(){
  const URL_edited = document.getElementById('URL_edited')
  URL_edited.select()
  document.execCommand("Copy")
  const buttonText = document.getElementById("copybutton_edited")
  buttonText.innerText = "ｱｧｧｱｲ"
  console.log("hofw")
}

for(let panel of editablePanel){
  panel.classList.remove("dummy")
  panel.classList.add("dummy")
  panel.oncontextmenu = function(){
    let list = panel.classList
    if(list.contains("dummy")){
      panel.classList.remove("dummy")
      panel.classList.add("purple")
      refreshPreviewPanelPointer("purple")
    }else if(list.contains("red")){
      panel.classList.remove("red")
      panel.classList.add("dummy")
      refreshPreviewPanelPointer("dummy")
    }else if(list.contains("sky")){
      panel.classList.remove("sky")
      panel.classList.add("red")
      refreshPreviewPanelPointer("red")
    }else if(list.contains("yellow")){
      panel.classList.remove("yellow")
      panel.classList.add("sky")
      refreshPreviewPanelPointer("sky")
    }else if(list.contains("green")){
      panel.classList.remove("green")
      panel.classList.add("yellow")
      refreshPreviewPanelPointer("yellow")
    }else if(list.contains("purple")){
      panel.classList.remove("purple")
      panel.classList.add("green")
      refreshPreviewPanelPointer("green")
    }
    tableViewToNumberStrings(editablePanel)
    return false
  }
  panel.addEventListener('mouseover',() =>{
    let list = panel.classList
    if(list.contains("dummy")){
      refreshPreviewPanelPointer("dummy")
    }else if(list.contains("red")){
      refreshPreviewPanelPointer("red")
    }else if(list.contains("sky")){
      refreshPreviewPanelPointer("sky")
    }else if(list.contains("yellow")){
      refreshPreviewPanelPointer("yellow")
    }else if(list.contains("green")){
      refreshPreviewPanelPointer("green")
    }else if(list.contains("purple")){
      refreshPreviewPanelPointer("purple")
    }
  })
  panel.addEventListener('click',() =>{
    let list = panel.classList
    if(list.contains("dummy")){
      panel.classList.remove("dummy")
      panel.classList.add("red")
      refreshPreviewPanelPointer("red")
    }else if(list.contains("red")){
      panel.classList.remove("red")
      panel.classList.add("sky")
      refreshPreviewPanelPointer("sky")
    }else if(list.contains("sky")){
      panel.classList.remove("sky")
      panel.classList.add("yellow")
      refreshPreviewPanelPointer("yellow")
    }else if(list.contains("yellow")){
      panel.classList.remove("yellow")
      panel.classList.add("green")
      refreshPreviewPanelPointer("green")
    }else if(list.contains("green")){
      panel.classList.remove("green")
      panel.classList.add("purple")
      refreshPreviewPanelPointer("purple")
    }else if(list.contains("purple")){
      panel.classList.remove("purple")
      panel.classList.add("dummy")
      refreshPreviewPanelPointer("dummy")
    }
    tableViewToNumberStrings(editablePanel)
  })
}

const refreshPreviewPanelPointer = (type) =>{
  const previewPanels = document.getElementsByClassName('sample')
  const targetClor = type
  for ( let panel of previewPanels ){
    const list = panel.classList
    if( list.contains( targetClor ) ){
      panel.classList.add("cursor")
    }else{
      panel.classList.remove("cursor")
    }
  }
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
      displayTable(tableData)
      const UniqueID = tableData.join('').replace(/,/g, '')
      generateRandomURL(url, UniqueID)
    })
    .catch(error => console.log('error', error))
}

const displayTable = (data) =>{
  const panels = document.querySelectorAll('.panel')
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

const splitArray = (array, part) =>{
  var tmp = [];
  for(var i = 0; i < array.length; i += part) {
      tmp.push(array.slice(i, i + part));
  }
  return tmp;
}

const numbersToTableFormatArray = (numbers) =>{
  //URLの数字から配列を作る
  const newData = Array.from(numbers)
  const newData_numbered = newData.map( str => parseInt(str, 10) )
  tableData = splitArray(newData_numbered, 6)
  console.log(`[message] loaded data ${tableData}`)
  displayTable(tableData)
  generateRandomURL(url, numbers)
}
const tableViewToNumberStrings = (table) =>{
  let editedTableNumberSyrings = ''
  let keyFromVal = ''
  let searchval = ''
  for(let panel of table){
    searchval = panel.classList[2]
    keyFromVal = Object.keys(ComparisonSheet).reduce(function(r, k) { return ComparisonSheet[k] == searchval ? k : r }, null);
    editedTableNumberSyrings += keyFromVal
  }
  editedTableUrl = editedTableNumberSyrings
  const editedTableUrlParam = document.getElementById('URL_edited')
  editedTableUrlParam.value = `${url.host}?table=${editedTableUrl}`
}

const generateRandomURL = (url, n) =>{
  const params = new URLSearchParams(url.search)
  const directedTableData = params.get('table')
  const randomTableUrlParam = document.getElementById("URL_random")
  if(directedTableData == null){
    randomTableUrlParam.value = `${url}?table=${n}`
  }else{
    randomTableUrlParam.value = `${url}`
  }
}

const captureImage = () =>{
  const captureTarget = document.querySelector("#viewer")
  html2canvas(document.querySelector("#viewer")).then(canvas => {
    captureTarget.after(canvas)
    captureTarget.style.display = 'none'
  })
}

if(directedTableData != null ){
  numbersToTableFormatArray(directedTableData)
}else{
  console.log("[message] no param. try to request random data")
  generateFromAPI()
}