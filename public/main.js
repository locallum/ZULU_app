import { generateGraphSingle } from '../backend/app.js';

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
