var board;

function drawGraphFunc() {
  board = JXG.JSXGraph.initBoard('box', {boundingbox: [-10, 10, 10, -10], axis:true});
  board.create('functiongraph', [function(x){return staticWilkinson(x);}, -10,10]);
}

function staticWilkinson(x) {
  return (x-1)*(x-2)*(x-3)*(x-4)*(x-5)*(x-6)*(x-7)*(x-8)*(x-9)*(x-10);
}

function wilkinsonBuilder(x, v) {
  if ( v == 1) {
    return x-1;
  } else if ( v > 0) {
    return (x-v)*wilkinsonBuilder(x, v-1);
  }
  return NaN;
}

function wilkinson(x) {
  return wilkinsonBuilder(x,6);
}

