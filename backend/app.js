const retrievalURL = 'https://slzykzeusf.execute-api.us-east-1.amazonaws.com/test';
const visualisationURL = 'https://f8jc59emd2.execute-api.us-east-1.amazonaws.com/dev/';

export async function generateGraphSingle() {
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
        if (!retrievalOutput) {
            throw new Error("Failed to retrieve data.");
        }

        const visualisationOutput = await visualisationSingle(
            title,
            x_header,
            y_header,
            retrievalOutput.years,
            retrievalOutput.suburbPopulationEstimate
        );
        if (!visualisationOutput) {
            throw new Error("Failed to generate visualisation.");
        }

        return visualisationOutput.url;
    } catch (error) {
        console.error("Failed to generate graph:", error.message);
        return null;
    }
}

async function retrieveSingle(start, end, suburb) {
    try {
        const params = new URLSearchParams({ startyear: start, endyear: end, suburb: suburb });

        const response = await fetch(`${retrievalURL}?${params}`);
        if (!response.ok) {
            throw new Error('RetrievalAPI failed');
        }

        const data = await response.json();

        /* data json
        {
            "suburbPopulationEstimate": [],
            "years": []
        }
        */

        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function visualisationSingle(title, x_header, y_header, x_data, y_data) {
    try {
        const params = new URLSearchParams();
        params.append("title", title);
        params.append("x-header", x_header);
        params.append("y-header", y_header);
        x_data.forEach(value => params.append("x_data", value));
        y_data.forEach(value => params.append("y_data", value));

        const response = await fetch(`${visualisationURL}?${params}`);
        if (!response.ok) {
            throw new Error('VisualisationAPI failed');
        }

        const data = await response.json();

        /* data json
        {
            "url": ""
        }
        */

        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}