const sampleUrl = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Function to handle dropdown change
function optionChanged(sampleId) {
  // Read samples.json data using D3
  d3.json(sampleUrl).then(data => {
    // Filter the data for the selected sample ID
    const sampleData = data.samples.find(sample => sample.id === sampleId);

    // Get the values for the bar chart
    const barValues = sampleData.sample_values.slice(0, 10).reverse();
    const barLabels = sampleData.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
    const barHovertext = sampleData.otu_labels.slice(0, 10).reverse();

    // Create the bar chart trace
    const barTrace = {
      x: barValues,
      y: barLabels,
      text: barHovertext,
      type: "bar",
      orientation: "h"
    };

    const barData = [barTrace];

    const barLayout = {
      title: "Top 10 OTUs",
      xaxis: { title: "Sample Values" },
      yaxis: { title: "OTU IDs" }
    };

    // Create the bar chart
    Plotly.newPlot("bar", barData, barLayout);

    // Get the metadata for the selected sample
    const metadata = data.metadata.find(meta => meta.id.toString() === sampleId);

    // Update the sample metadata
    const sampleMetadata = d3.select("#sample-metadata");
    sampleMetadata.html("");
    Object.entries(metadata).forEach(([key, value]) => {
      sampleMetadata.append("p").text(`${key}: ${value}`);
    });

    // Create the gauge chart
    const gaugeTrace = {
      domain: { x: [0, 1], y: [0, 1] },
      value: metadata.wfreq,
      title: { text: "Weekly Washing Frequency" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [0, 9] },
        steps: [
          { range: [0, 1], color: "rgb(255, 255, 204)" },
          { range: [1, 2], color: "rgb(255, 255, 153)" },
          { range: [2, 3], color: "rgb(255, 255, 102)" },
          { range: [3, 4], color: "rgb(255, 255, 51)" },
          { range: [4, 5], color: "rgb(255, 255, 0)" },
          { range: [5, 6], color: "rgb(204, 204, 0)" },
          { range: [6, 7], color: "rgb(153, 153, 0)" },
          { range: [7, 8], color: "rgb(102, 102, 0)" },
          { range: [8, 9], color: "rgb(51, 51, 0)" }
        ]
      }
    };

    const gaugeData = [gaugeTrace];

    const gaugeLayout = {
      width: 500,
      height: 400,
      margin: { t: 0, b: 0 }
    };

    Plotly.newPlot("gauge", gaugeData, gaugeLayout);

    // Create the bubble chart
    const bubbleTrace = {
      x: sampleData.otu_ids,
      y: sampleData.sample_values,
      text: sampleData.otu_labels,
      mode: "markers",
      marker: {
        size: sampleData.sample_values,
        color: sampleData.otu_ids,
        colorscale: "Earth"
      }
    };

    const bubbleData = [bubbleTrace];

    const bubbleLayout = {
      title: "OTU ID vs Sample Values",
      xaxis: { title: "OTU ID" },
      yaxis: { title: "Sample Values" }
    };

    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
  });
}

// Read samples.json data using D3
d3.json(sampleUrl).then(data => {
  // Get the dropdown select element
  const dropdown = d3.select("#selDataset");

  // Populate dropdown options with sample IDs
  data.names.forEach(name => {
    dropdown.append("option")
      .text(name)
      .property("value", name);
  });

  // Initialize the chart with the first sample ID
  optionChanged(data.names[0]);
});
