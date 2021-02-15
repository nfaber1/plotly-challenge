function init() {
    
    d3.json("samples.json").then((jsons) => {

      console.log(jsons);
    
      var dropdown = d3.select("#selDataset");
    
        jsons.names.forEach(function (name) {
                console.log(name)
                dropdown.append("option").text(name).attr("value", name)
            });
    
            demoinfo(jsons.names[0]);
            plots(jsons.names[0]);
        });

      };

        function optionChanged(name) {
          console.log(name)
          demoinfo(name)
          plots(name)
        };

        // var sortedByGreekSearch = jsons.sort((a, b) => b.greekSearchResults - a.greekSearchResults);

// Slice the first 10 objects for plotting
slicedData = jsons.slice(0, 10);

// Reverse the array to accommodate Plotly's defaults
reversedData = slicedData.reverse();

// Trace1 for the Greek Data
var trace1 = {
  x: reversedData.map(object => object.greekSearchResults),
  y: reversedData.map(object => object.greekName),
  text: reversedData.map(object => object.greekName),
  name: "Greek",
  type: "bar",
  orientation: "h"
};

// data
var data = [trace1];

// Apply the group bar mode to the layout
var layout = {
  title: "Greek gods search results",
  margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100
  }
};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot", data, layout);

    // };

init();