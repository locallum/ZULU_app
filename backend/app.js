const retrievalURL = 'https://slzykzeusf.execute-api.us-east-1.amazonaws.com/test';
const visualisationURL = 'https://f8jc59emd2.execute-api.us-east-1.amazonaws.com/dev/';

export async function retrieveSingle(start, end, suburb) {
    try {
        const params = new URLSearchParams({ startyear: start, endyear: end, suburb: suburb });

        const response = await fetch(`${retrievalURL}?${params}`);
        if (!response.ok) {
            throw new Error('Network response fail');
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
        console.error('Fetch operation fail:', error);
    }
}

export async function visualisationSingle(title, x_header, y_header, x_data, y_data) {
    try {
        const params = new URLSearchParams();
        params.append("title", title);
        params.append("x-header", x_header);
        params.append("y-header", y_header);
        x_data.forEach(value => params.append("x_data", value));
        y_data.forEach(value => params.append("y_data", value));

        const response = await fetch(`${visualisationURL}?${params}`);
        if (!response.ok) {
            throw new Error('Network response fail');
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
        console.error('Fetch operation fail:', error);
    }
}