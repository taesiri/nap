var mathjs = require('mathjs'),
    math = mathjs();


var refIntegralValue = 0


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
  
  //  gaussian integral

  var gaussIns = new Array();
  var onePoint= new Array();
  onePoint[0] = {w: 2, x: 0};
  var twoPoint = new Array();
  twoPoint[0] = {w: 1, x:  0.57735};
  twoPoint[1] = {w: 1, x: -0.57735};
  var threePoint = new Array();
  threePoint[0] = {w: 8/9, x:  0};
  threePoint[1] = {w: 5/9, x:  0.77459};
  threePoint[2] = {w: 5/9, x: -0.77459};



  gaussIns[0] = {mode:'One Point Gaussian Integral', integralValue: gaussianIntegral(_fx_, onePoint)};
  gaussIns[1] = {mode:'Two Point Gaussian Integral', integralValue: gaussianIntegral(_fx_, twoPoint)};
  gaussIns[2] = {mode:'Three Point Gaussian Integral', integralValue: gaussianIntegral(_fx_, threePoint)};

  var tbg = generateTableBody("gaussianIntegral", []);
  fillTable(tbg, gaussIns);

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
   _fx_.value = 'sqrt(1-x^2) - x';
   refIntegralValue = 0.3926990816987241548078304;
  }
  else if (id == 2) {
    _a_.value = '0';
    _b_.value = Math.PI;
    _fx_.value = '1/(2+sin(2*x))';
   refIntegralValue = 1.8137993642342178505940782;
  }
  else if (id == 3) {
   _a_.value = '0';
   _b_.value = '1';
   _fx_.value = '1/(1+x^2)';
   refIntegralValue = 0.78539816339744830961566084;
  }


  var result_label = document.getElementById('originalVal');
  result_label.innerHTML = "Real Answer: " + refIntegralValue;
  result_label.className ="";

  calculateMatrix();
}

function execute() {
  var result_label = document.getElementById('originalVal');
  result_label.className ="hidden-div";
  calculateMatrix();
}

function gaussianIntegral(fx, points) {
  var result = 0;
  for (var i = 0, l = points.length; i < l; i ++) {
    result += points[i]['w'] * fx(points[i]['x']);
  }
  return result;
}
