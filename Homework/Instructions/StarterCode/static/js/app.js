function init() {
    
  // LOAD DATA & CONSOLE.LOG IT
    d3.json("samples.json").then((sampleData) => {
      console.log(sampleData);
      console.log(sampleData.names);
      var age = sampleData.metadata.map(object => object.age)
      console.log(age);
    
// CREATE DROPDOWN
      var dropdown = d3.select("#selDataset");
    
      // APPEND NAMES
        sampleData.names.forEach(function (name) {
                console.log(name)
                dropdown.append("option").text(name).attr("value", name)
            });
    
            demographic(sampleData.names[0]);
            plots(sampleData.names[0]);
        });
      };

        function optionChanged(name) {
          demographic(name)
        };

  // CREATE FUNCTION FOR SPECFIC DEMOGRAPHIC INFO
    function demographic(name) {

      // SAMPLE DATA EXTRACTION
      d3.json("samples.json").then((sampleData) => {

          // PULL METADATA FOR DEMOGRAPHIC INFO
          var metadata = sampleData.metadata;

          // CHECK TO SEE IF EVERYTHING CALLS CORRECTLY
          console.log(metadata);

          // CHECK TO SEE IF GENDER POPS UP
          var titles = sampleData.metadata.map(object =>  object.gender);
          console.log(titles)

          // CHECK TO SEE IF NAMES POP UP
          var nameMeta = metadata.filter(object => object.id == name)[0];
          console.log(nameMeta)

          var panel = d3.select("#sample-metadata");
          panel.html("");

          Object.entries(nameMeta).forEach(([key, value]) => {

              // APPEND DATA
              panel.append("h5").text(`${key}: ${value}`);
          });

      });
    };

    function plots(name) {
      // LOAD DATA
      d3.json("samples.json").then((dataData) => {
          var sampleDataData = dataData.samples;
          var secID = sampleDataData.filter(object => object.id == name)[0];
          var sampleValues = secID.sample_values;
          // SEE IF THEY CAME UP
          console.log(sampleDataData)
          console.log(secID)
          console.log(sampleValues)
          
          // // OTU ID VARIABLE & LABELS
          var OTUID = secID.otu_ids;
          var OTUlabel = secID.otu_labels;
    
          // CREATE TRACE1 FOR BAR CHART
          var yticks = OTUID.slice(0, 10).map(object1 => `OTU ${OTUID}`).reverse();
          var trace1 = {
            x: sampleValues.slice(0,10).reverse(),
            y: yticks,
            type: 'bar',
            // text: OTUlabel.slice(0,10).reverse(),
            orientation: 'h'
        };
    
        // CREATE TRACE1
        var data1 = [trace1];

      // });

        var layout1 = {
            title: 'TOP OTUs',
            showlegend: true,
            xaxis: {
                tickangle: -45
            },
            yaxis: {
                zeroline: false,
                gridwidth: 2
            },
            bargap: 0.05
        };
    
        Plotly.newPlot('bar', data1, layout1);

        var trace2 = {
          x: OTUID,
          y: sampleValues,
          mode: 'markers',
          marker: {
              size: sampleValues,
              color: OTUID
          }
      };

      // CREATE TRACE2 & LAYOUT
      var data2 = [trace2]
      var layout2 = {
          title: 'Sample OTUs',
          showlegend: false,
          height: 600,
          width: 1200,
          margin: {t:30}
      };

      Plotly.newPlot('bubble', data2, layout2);
      });
};
init();


