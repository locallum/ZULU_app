const retrievalURL = 'http://localhost:3000/retrieve';
const visualisationURL = 'http://localhost:3000/visualisation';

export async function generateGraphSingle(startYear, endYear, suburb, title) {
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
