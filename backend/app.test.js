const { generateGraphSingle } = require('./app');
const fetchMock = require('jest-fetch-mock');

describe('generateGraphSingle - User Stories', () => {

    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('should return a graph URL for government user with long-term data', async () => {
        const mockRetrievalData = {
            years: [2000, 2005, 2010, 2015, 2020],
            suburbPopulationEstimate: [10000, 10500, 11000, 11500, 12000]
        };
        const mockVisualisationData = {
            url: 'https://example.com/government-graph.png'
        };

        fetchMock.mockResponseOnce(JSON.stringify(mockRetrievalData)); // mock for retrieveSingle
        fetchMock.mockResponseOnce(JSON.stringify(mockVisualisationData)); // mock for visualisationSingle

        const result = await generateGraphSingle(2000, 2020, 'GovSuburb', 'GovTitle', 'Year', 'Population');
        
        expect(result).toBe('https://example.com/government-graph.png');
    });

    it('should return a graph URL for corporate user with short-term data', async () => {
        const mockRetrievalData = {
            years: [2021, 2022, 2023],
            suburbPopulationEstimate: [7000, 7200, 7400]
        };
        const mockVisualisationData = {
            url: 'https://example.com/corporate-graph.png'
        };

        fetchMock.mockResponseOnce(JSON.stringify(mockRetrievalData)); // mock for retrieveSingle
        fetchMock.mockResponseOnce(JSON.stringify(mockVisualisationData)); // mock for visualisationSingle

        const result = await generateGraphSingle(2021, 2023, 'CorpSuburb', 'CorpTitle', 'Year', 'Population');
        
        expect(result).toBe('https://example.com/corporate-graph.png');
    });

});