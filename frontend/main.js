import { retrieveSingle, visualisationSingle } from '../backend/app.js'


document.getElementById("search-form").addEventListener("submit", generateGraphSingle);

async function generateGraphSingle() {
    // these are sample, will be user inputs and arguments of this function
    // graph only
    const title = document.getElementById("graph-title").value;
    const x_header = document.getElementById("x-header").value;
    const y_header = document.getElementById("y-header").value;

    // data fetch input
    const startYear = document.getElementById("start-year").value;
    const endYear = document.getElementById("end-year").value;
    const suburb = document.getElementById("suburb").value;

    try {
        const retrievalOutput = await retrieveSingle(startYear, endYear, suburb);

        if (retrievalOutput) {
            await visualisationSingle(
                title,
                x_header,
                y_header,
                retrievalOutput.years,
                retrievalOutput.suburbPopulationEstimate
            );
        }
        
    } catch (error) {
        console.error("Cannot run main")
    }
}