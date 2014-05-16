
function createSensivityTable() {
  var tbody = generateTableBody('sensivityTable', ['#', 'Original Polynomial', 'Modified Polynomail']);
  var data = new Array();

  var mroots = "20.24021159+0.j,18.98804416+1.0812886j,18.98804416-1.0812886j,16.64490643+1.74743755j,16.64490643-1.74743755j,14.21576452+1.57479827j,14.21576452-1.57479827j,12.14115215+0.88792082j,12.14115215-0.88792082j,10.71709178+0.j,10.06671308+0.j,8.99645948+0.j,7.99970563+0.j,7.00009441+0.j,5.99998864+0.j,5.00000094+0.j,3.99999994+0.j,3.00000000+0.j,2.00000000+0.j,1.00000000+0.j".split(',');

  for (var i = 0; i < mroots.length; i ++) {
    data[i] = {id : i+1, or:i+1, mr: mroots[mroots.length - i -1] };
  }

  fillTable(tbody, data);
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
