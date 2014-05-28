var mathjs = require('mathjs'),
    math = mathjs();



function calculateMatrix() {

  var scope = {
    e: 2.71828
  };
  var _fx_ = math.eval('f(x) = ' + document.getElementById('_fx_').value);
  var _n_ = math.eval(document.getElementById('_n_').value);
  var _a_ = math.eval(document.getElementById('_a_').value);
  var _b_ = math.eval(document.getElementById('_b_').value);

  var tArray = new Array();

  
  var h = (_b_ - _a_);
  
  for (var i = 1; i <=_n_; i ++) {
    tArray[i] = new Array();
    tArray[i][1] = h/Math.pow(2,i) *( _fx_(_a_) + 2*calcHelper(_fx_, h/Math.pow(2,i-1) , i, _a_) + _fx_(_b_));
    for (var j = 2; j <= i; j ++) {
      tArray[i][j] = (( Math.pow(4,j-1) * tArray[i][j-1]  -  tArray[i-1][j-1] )/(Math.pow(4, j-1)-1))
    }
  }

  var tb = generateTableBody("romberg-matrix", []);
  fillTable(tb, tArray);
  MathJax.Hub.Queue(["Typeset",MathJax.Hub]);


  var newBtn = document.getElementById('result-div');
  newBtn.className = "give-some-space";

}

function calcHelper(f, h, i, a) {
  var result = 0
  for (var k = 1, l = Math.pow(2,i-1); k < l; k ++) {
    result += f(a + k*h)
  }
  return result;
}



function generateTableBody(tableName, labels) {
  tbody = document.getElementById(tableName);
  theaderrow = document.createElement("TR");
  while(theaderrow.firstChild) {
    theaderrow.removeChild(theaderrow.firstChild);
  }
  labels.forEach(function (entry) {
    tCell = document.createElement("TH");
    hNode = document.createTextNode(entry);
    tCell.appendChild(hNode);
    theaderrow.appendChild(tCell);
  });
  while(tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }
  tbody.appendChild(theaderrow);
  return tbody;
}

function fillTable(tb, data) {
  for(entry in data){
    row = document.createElement("TR");
    for ( key in data[entry]) {
      cell = document.createElement("TD");
      tNode = document.createTextNode(data[entry][key]);
      cell.appendChild(tNode);

      row.appendChild(cell);
    }
    tb.appendChild(row);
  }
}

function autoFill(id) {
  var _fx_ = document.getElementById('_fx_');
  var _a_ = document.getElementById('_a_');
  var _b_ = document.getElementById('_b_');

  if( id == 1) {
   _a_.value = '1';
   _b_.value = '1/sqrt(2)';
   _fx_.value = 'sqrt(1-x^2) - x'
  }
  else if (id == 2) {
    _a_.value = '0';
    _b_.value = Math.PI;
    _fx_.value = '1/(2+sin(2*x))' 
  }
  else if (id == 3) {
   //_a_.value = '0';
   //_b_.value = '1/sqrt(2)';
   //_fx_.value = 'sqrt(1-x^2) - x'
  }
}
