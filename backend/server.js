const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS for all requests
app.use(cors());

// Route for handling the retrieval API request
app.get('/retrieve', async (req, res) => {
    const { suburb, startYear, endYear } = req.query;
    const retrievalURL = 'https://slzykzeusf.execute-api.us-east-1.amazonaws.com/prod/population/v1';
    
    try {
        const response = await axios.get(retrievalURL, {
            params: { suburb, startYear, endYear }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data from retrieval API');
    }
});

// Route for handling the visualisation API request
app.get('/visualisation', async (req, res) => {
    const { title, x_header, y_header, x_data, y_data } = req.query;
    const visualisationURL = 'https://f8jc59emd2.execute-api.us-east-1.amazonaws.com/dev/';
    
    try {
        const response = await axios.get(visualisationURL, {
            params: { title, x_header, y_header, x_data, y_data }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data from visualisation API');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
