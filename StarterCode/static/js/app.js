        
    // function that populated the metadata
    function demoInfo(newSample)
    {
        //console.log(newSample);
 
        d3.json("samples.json").then((data) => {

            // grab the metadata
            let metaData = data.metadata;

            // filter based on the value of the sample where it should only return an array of 1 result
            let result = metaData.filter(sampleResult => sampleResult.id == newSample);
        
            // grab index 0 out of the result array
            let resultData = result[0];
            //console.log(resultData);

            // clear the metaData out
            d3.select("#sample-metadata").html(""); // clears the HTML out

            // use Object.entries to get the value key pairs
            Object.entries(resultData).forEach(([key, value]) => {
            
                // add to the sample data / demographics section
                d3.select("#sample-metadata")
                    .append("h5").text(`${key}: ${value}`);
            });

        });

    }


    // function that builds the bar chart
    function buildBarChart(newSample)
    {
        //console.log(sample);
        //console.log(data);
            d3.json("samples.json").then((data) => {
   
            let sampleData = data.samples;
            //console.log(sampleData);

            // filter based on the value of the sample where it should only return an array of 1 result
            let result = sampleData.filter(sampleResult => sampleResult.id == newSample);
            //console.log(result)
        
            // grab index 0 out of the result array
            let resultData = result[0];
            //console.log(resultData);

            // get the otu_ids, otu_labels, and sample_values
            let otu_ids = resultData.otu_ids;
            let otu_labels = resultData.otu_labels;
            let sample_values = resultData.sample_values;
            /*console.log(otu_ids);
            console.log(otu_labels);
            console.log(sample_values);*/

            // build the bar chart
            // yTicks
            let yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}`);
            //console.log(yticks);

            // get the xValues
            let xValues = sample_values.slice(0, 10);
            //console.log(xValues);

            // get the textLabels
            let textLabels = otu_labels.slice(0, 10);
            //console.log(textLabels);

            let barChart = {
                y: yticks.reverse(),
                x: xValues.reverse(),
                text: textLabels.reverse(),
                type: "bar",
                orientation: "h"
            }

            let layout = {
                
                title: "Top 10 Belly Button Bacteria"
            };

            Plotly.newPlot("bar", [barChart], layout);

    });

};

    // function that builds the bubble chart
    function buildBubbleChart(newSample)
    {
            d3.json("samples.json").then((data) => {
            //console.log(sample);
            //console.log(data);

            // grab the metadata
            let sampleData = data.samples;
            //console.log(sampleData);

            // filter based on the value of the sample where it should only return an array of 1 result
            let result = sampleData.filter(sampleResult => sampleResult.id == newSample);
            //console.log(result)
        
            // grab index 0 out of the result array
            let resultData = result[0];
            //console.log(resultData);

            // get the otu_ids, otu_labels, and sample_values
            let otu_ids = resultData.otu_ids;
            let otu_labels = resultData.otu_labels;
            let sample_values = resultData.sample_values;
            /*console.log(otu_ids);
            console.log(otu_labels);
            console.log(sample_values);*/

            // build the bubble chart
            let bubbleChart = {
                y: sample_values,
                x: otu_ids,
                text: otu_labels,
                mode: "markers",
                marker: {
                    size: sample_values,
                    color: otu_ids,
                    colorscale: "Earth"
                }
            }

            let layout = {

                title: "Bacteria Cultures Per Sample",
                hovermode: "closest",
                xaxis: {title: "OTU ID"}
            };

            Plotly.newPlot("bubble", [bubbleChart], layout);

            });

    };
        

function init()
{
    let data = d3.json('https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json').then(function(data)
    {
    // access the dropdown selector from the index.html file
    var select = d3.select("#selDataset");

    // use d3.json to get the data
    let sampleNames = data.names;
    console.log(sampleNames);

        // use a for each in order to create options for each sample in the names
        sampleNames.forEach((sample) => {
            select.append("option")
            .text(sample)
            .property("value", sample);
        });

        let newSample1 = sampleNames[0];
        demoInfo(newSample1);

        // call function to build the bar chart
        buildBarChart(newSample1);

        // call function to build the bar chart
        buildBubbleChart(newSample1);

    })};

// function that updates the dashboard
function optionChanged(newitem)
{

    d3.json("samples.json").then((data) => {
        // call the update to the metaData
        demoInfo(newitem);
        
        // call function to build the bar chart
        buildBarChart(newitem);
        
        // call function to build the bubble chart
        buildBubbleChart(newitem);

    });

};

// Function that executes the above functions
d3.json("data/samples.json").then(
    init()
);






