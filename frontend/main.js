const retrievalURL = 'http://localhost:3000/retrieve';
const visualisationURL = 'http://localhost:3000/visualisation';

document.addEventListener("DOMContentLoaded", () => {
    const generateButton = document.getElementById("generate-button");
    const resetButton = document.getElementById("reset-button");  // Get the reset button

    // Initialize Select2 for suburb dropdown
    $(document).ready(function () {
        $('#suburb').val(null).trigger('change');
        $('#suburb').select2({
            placeholder: "Select a suburb...",
            allowClear: true
        });
    });

    let downloadButtonEventListener; // Store the event listener to remove it later

    generateButton.addEventListener("click", async () => {
        const startYear = document.getElementById("start-year")?.value?.trim();
        const endYear = document.getElementById("end-year")?.value?.trim();
        const suburb = document.getElementById("suburb")?.value?.trim();
        const title = document.getElementById("graph-title")?.value?.trim();

        if (!startYear || !endYear || !suburb || !title) {
            alert("Please fill in all fields before generating the graph.");
            return;
        }

        try {
            const base64Image = await generateGraphSingle(startYear, endYear, suburb, title);
            console.log(base64Image);
            if (base64Image) {
                document.getElementById("results").innerHTML = 
                    `<img src="data:image/png;base64,${base64Image}" alt="Generated Graph">`;
                
                // Show the download button and add download functionality
                const downloadButton = document.getElementById("download-button");
                downloadButton.style.display = "inline-block";

                // Remove the old event listener if it exists
                if (downloadButtonEventListener) {
                    downloadButton.removeEventListener("click", downloadButtonEventListener);
                }

                // Define and add a new event listener for the download button
                downloadButtonEventListener = () => {
                    // Create a temporary link to download the image
                    const link = document.createElement("a");
                    link.href = `data:image/png;base64,${base64Image}`;
                    link.download = "generated-graph.png";  // Filename for the downloaded image
                    link.click();
                };
                downloadButton.addEventListener("click", downloadButtonEventListener);
            } else {
                alert("Failed to generate the graph.");
            }
        } catch (error) {
            console.error("Error generating graph:", error);
            alert("An error occurred while generating the graph.");
        }
    });

    // Reset button event listener
    resetButton.addEventListener("click", () => {
        // Clear all form fields
        document.getElementById("search-form").reset();

        // Clear the results image
        document.getElementById("results").innerHTML = '';

        // Hide the download button
        const downloadButton = document.getElementById("download-button");
        downloadButton.style.display = "none";

        // Reset the suburb field
        $('#suburb').val(null).trigger('change');

        // Remove the download button event listener to prevent multiple listeners
        if (downloadButtonEventListener) {
            downloadButton.removeEventListener("click", downloadButtonEventListener);
            downloadButtonEventListener = null;
        }
    });
});

async function generateGraphSingle(startYear, endYear, suburb, title) {
    try {
        const retrievalOutput = await retrieveSingle(startYear, endYear, suburb);
        if (!retrievalOutput) {
            throw new Error("Failed to retrieve data.");
        }
        console.log(retrievalOutput.years);
        console.log(retrievalOutput.suburbPopulationEstimates)
        const visualisationOutput = await visualisationSingle(
            title,
            retrievalOutput.years,  // years
            retrievalOutput.suburbPopulationEstimates  // suburbPopulationEstimates
        );        
        console.log(visualisationOutput.image);

        return visualisationOutput.image;
    } catch (error) {
        console.error("Failed to generate graph:", error.message);
        return null;
    }
}

async function retrieveSingle(start, end, suburb) {
    try {
        const params = new URLSearchParams({ suburb: suburb, startYear: start, endYear: end});
        const response = await fetch(`${retrievalURL}?${params}`);
        if (!response.ok) {
            throw new Error('RetrievalAPI failed');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error.message);
    }
}

async function visualisationSingle(title, years, populationEstimates) {
    try {
        const params = new URLSearchParams();
        params.append("title", title);
        params.append("x_header", "Years");  // Static value for x-axis label
        params.append("y_header", "Population");  // Static value for y-axis label
        params.append("x_data", years);
        params.append("y_data", populationEstimates);

        console.log("params!" + params.toString());
        
        const response = await fetch(`${visualisationURL}?${params}`);
        if (!response.ok) {
            throw new Error('VisualisationAPI failed');
        }
        const data = await response.json();
        const parsedData = JSON.parse(data.body);
        return parsedData;
    } catch (error) {
        console.error(error.message);
    }
}
