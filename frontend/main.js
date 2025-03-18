document.getElementById("generate-button").addEventListener("click", async () => {
    const startYear = document.getElementById("start-year").value;
    const endYear = document.getElementById("end-year").value;
    const suburb = document.getElementById("suburb").value;
    const title = document.getElementById("graph-title").value;
    const x_header = document.getElementById("x-header").value;
    const y_header = document.getElementById("y-header").value;

    const base64Image = await generateGraphSingle(startYear, endYear, suburb, title, x_header, y_header);
    
    if (base64Image) {
        const resultsDiv = document.getElementById("results");
        resultsDiv.innerHTML = `<img src="data:image/png;base64,${base64Image}" alt="Generated Graph">`;
    } else {
        alert("Failed to generate the graph.");
    }
});
