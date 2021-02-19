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
 

// };
init();


