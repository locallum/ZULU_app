// generateGraph.test.js
const { generateGraphSingle } = require('./app'); // Adjust the path as needed
const fetchMock = require('jest-fetch-mock');

describe('generateGraphSingle', () => {

    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('should return a graph URL when retrieval and visualisation succeed', async () => {
        // Mock the retrieval function
        const mockRetrievalData = {
            years: [2020, 2021],
            suburbPopulationEstimate: [5000, 5100]
        };
        const mockVisualisationData = {
            url: 'https://example.com/graph.png'
        };

        // Mocking fetch calls for retrieveSingle and visualisationSingle
        fetchMock.mockResponseOnce(JSON.stringify(mockRetrievalData)); // mock for retrieveSingle
        fetchMock.mockResponseOnce(JSON.stringify(mockVisualisationData)); // mock for visualisationSingle

        // Run the function and check the result
        const result = await generateGraphSingle(2020, 2021, 'TestSuburb', 'TestTitle', 'X Header', 'Y Header');
        
        expect(result).toBe('https://example.com/graph.png');
    });

    it('should return null when retrieval fails', async () => {
        // Mock the retrieval function to fail
        fetchMock.mockRejectOnce(new Error('RetrievalAPI failed'));

        // Run the function and check the result
        const result = await generateGraphSingle(2020, 2021, 'TestSuburb', 'TestTitle', 'X Header', 'Y Header');
        
        expect(result).toBeNull();
    });

});
