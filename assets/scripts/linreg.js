var x = nj.array([1, 1.7, 2, 2.5, 3.1]);
var y = x.multiply(1.45).add(nj.array([-.2, .165, .3, -.35, .15]));
var x = x.subtract(.06);
var sse_total = y.subtract(y.mean()).pow(2).sum();

function calc_intercept(xm, ym, slope) {
  return ym - xm * slope
}

function estimate(x, a, b) {
  return x.multiply(a).add(b)
}

var pl_colors = ['rgb(31, 119, 180)', 'rgb(255, 127, 14)',
             'rgb(44, 160, 44)', 'rgb(214, 39, 40)',
             'rgb(148, 103, 189)', 'rgb(140, 86, 75)',
             'rgb(227, 119, 194)', 'rgb(127, 127, 127)',
             'rgb(188, 189, 34)', 'rgb(23, 190, 207)'];
             
function build_shapes(x, y, estimator, flip) {
  var shapes = [];
  error = y.subtract(estimator);
  //if (flip) {
  error = error.multiply(-1);
  //}
  if (!(estimator instanceof nj.NdArray)) {
    estimator = nj.ones(x.shape).multiply(estimator);
  }
  for (var i = 0; i < x.size; i++) {
    color = pl_colors[i].slice(3,-1);
    shapes.push({'type': 'rect',
      'x0': x.get(i),
      'y0': y.get(i),
      'x1': x.get(i) + error.get(i),
      'y1': estimator.get(i),
      'fillcolor': 'rgba' + color + ',.2)',
      'line': {
        'color': 'rgba' + color + ',.5)',
      }
    });
  }
  return shapes
}

var xrange = nj.array([-3, 7]);

function fit(x, y, a, b) {
  if (!a) {
    a = 0;
  }
  if (!(b == 0)) {
    if (!b) {
      b = calc_intercept(x.mean(), y.mean(), a);
    }
  }
  return [a, b]
}


var data1 = [{'type': 'scatter',
  'name': 'Data',
  'x': x.tolist(),
  'y': y.tolist(),
  'hoverinfo': 'x+y',
  'marker': {'opacity': 1.0,
   'symbol': 'circle',
   'line': {'width': 0, 'color': 'rgba(50,50,50,0.8)'}},
  'line': {'color': 'black'},
  'mode': 'markers',
  'fillcolor': 'rgba(255,79,38,0.600000)',
  'showlegend': true,
  'xaxis': 'x1',
  'yaxis': 'y1'},
 {'type': 'scatter',
  'name': 'Fit',
  'x': [-3, 7],
  'y': [5.53, 0.5300000000000002],
  'mode': 'lines',
  'marker': {'size': 10, 'color': 'red'},
  'xaxis': 'x1',
  'yaxis': 'y1'},
 {'type': 'scatter',
  'name': 'Mean',
  'x': [x.mean()],
  'y': [y.mean()],
  'mode': 'markers',
  'marker': {'size': 10, 'color': 'black', 'symbol': 'cross', 'opacity': 0.7}},
 {'type': 'scatter',
  'name': 'Bias',
  'x': [0],
  'y': [4.03],
  'mode': 'markers',
  'marker': {'color': 'red'}},];

var data2 = [{'type': 'scatter',
  'name': 'Point 1',
  'mode': 'lines',
  'y': [1, 1],
  'x': [5.1984, 0],
  'showlegend': false,
  'line': {'color': 'rgba(31, 119, 180,.5)', 'width': 15}},
 {'type': 'scatter',
  'name': 'Point 2',
  'mode': 'lines',
  'y': [2, 2],
  'x': [0.3025, 0],
  'showlegend': false,
  'line': {'color': 'rgba(255, 127, 14,.5)', 'width': 15}},
 {'type': 'scatter',
  'name': 'Point 3',
  'mode': 'lines',
  'y': [3, 3],
  'x': [0.0289, 0],
  'showlegend': false,
  'line': {'color': 'rgba(44, 160, 44,.5)', 'width': 15}},
 {'type': 'scatter',
  'name': 'Point 4',
  'mode': 'lines',
  'y': [4, 4],
  'x': [0.245, 0],
  'showlegend': false,
  'line': {'color': 'rgba(214, 39, 40,.5)', 'width': 15}},
 {'type': 'scatter',
  'name': 'Point 5',
  'mode': 'lines',
  'y': [5, 5],
  'x': [4.6872, 0],
  'showlegend': false,
  'line': {'color': 'rgba(148, 103, 189,.5)', 'width': 15}}];

var layout1 = {
 'showlegend': true,
 'useResizeHandler': true,
 'style': {'width': "100%", 'height': "100%"},
 'legend': {'orientation': 'h', 'y': 1.2, 'x': 0},
 'xaxis': {'title': 'x',
  'range': [-3, 7]},
 'yaxis': {'title': 'y',
  'range': [-1.2, 5.8]},
 'title': '',
 'margin': {'t': 50, 'b': 50, 'l': 50, 'r': 50},
 'shapes': [{'type': 'rect',
   'x0': 1.0,
   'y0': 1.25,
   'x1': 3.2800000000000002,
   'y1': 3.5300000000000002,
   'fillcolor': 'rgba(31, 119, 180,.2)',
   'line': {'color': 'rgba(31, 119, 180,.5)'}},
  {'type': 'rect',
   'x0': 1.7,
   'y0': 2.63,
   'x1': 2.25,
   'y1': 3.18,
   'fillcolor': 'rgba(255, 127, 14,.2)',
   'line': {'color': 'rgba(255, 127, 14,.5)'}},
  {'type': 'rect',
   'x0': 2.0,
   'y0': 3.1999999999999997,
   'x1': 1.8300000000000005,
   'y1': 3.0300000000000002,
   'fillcolor': 'rgba(44, 160, 44,.2)',
   'line': {'color': 'rgba(44, 160, 44,.5)'}},
  {'type': 'rect',
   'x0': 2.5,
   'y0': 3.275,
   'x1': 2.0050000000000003,
   'y1': 2.7800000000000002,
   'fillcolor': 'rgba(214, 39, 40,.2)',
   'line': {'color': 'rgba(214, 39, 40,.5)'}},
  {'type': 'rect',
   'x0': 3.1,
   'y0': 4.6450000000000005,
   'x1': 0.935,
   'y1': 2.4800000000000004,
   'fillcolor': 'rgba(148, 103, 189,.2)',
   'line': {'color': 'rgba(148, 103, 189,.5)'}}],
};

var layout2 = {
 'height': 250,
 'xaxis': {'title': 'Data Points',
  'range': [0, 6]},
 'yaxis': {'title': 'Squared Error',
  'range': [0, 6],
  'showticklabels': false},
 'title': '',
 'margin': {'t': 10, 'b': 100, 'l': 50, 'r': 50},
};

function valueOutput(element) { 
	var value = element.value; 
	var output = element.parentNode.getElementsByTagName('output')[0]; 
	output.innerHTML = value; 
} 

function changePlot() {
  var slider_a = parseFloat(document.getElementById("slider_a").value);
  var slider_b = parseFloat(document.getElementById("slider_b").value);
  var pegged = document.getElementById("pegged");
  if (pegged.checked) {
  	slider_b = undefined;
  }
  var tester1 = document.getElementById("tester1");
  var tester2 = document.getElementById("tester2");
  fitted = fit(x, y, slider_a, slider_b);
  // intercept
  tester1.data[3].y = [fitted[1]];
  if (pegged.checked) {
  	$('#slider_b').val(fitted[1]).change();
  }
  // fit line
  xrange_y = estimate(xrange, fitted[0], fitted[1], (slider_a == 0)).tolist();
  tester1.data[1].y = xrange_y;
  // shapes
  estimator = estimate(x, fitted[0], fitted[1], (slider_a == 0));
  shapes = build_shapes(x, y, estimator, (slider_a == 0));
  for (i = 0; i < shapes.length; i++) {
    tester1.layout.shapes[i] = shapes[i];
  }
  // errors
  errors = y.subtract(estimator);
  errors = errors.pow(2);
  for (i = 0; i < x.size; i++) {
    tester2.data[i].x = [errors.get(i), 0];
  }
  // stats
  sse = errors.sum();
  mse = errors.mean();
  r2 = 1 - (sse / sse_total);
  tester2.layout.xaxis.title = 'SSE = ' + sse.toFixed(4) + ' - MSE = ' + mse.toFixed(4) + ' - R2 = ' + r2.toFixed(4);
  Plotly.redraw(tester1);
  Plotly.redraw(tester2);
}
