const { generateGraphSingle } = require('./app');
const fetchMock = require('jest-fetch-mock');

// Set up mock fetch
fetchMock.enableMocks();

describe('generateGraphSingle - User Stories', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('should return a base64 PNG string for government user with long-term data', async () => {
        const mockRetrievalData = {
            years: [2000, 2005, 2010, 2015, 2020],
            suburbPopulationEstimate: [10000, 10500, 11000, 11500, 12000]
        };
        const mockVisualisationData = {
            image: 'iVBORw0KGgoAAAANSUhEUgAAAAUA' // base64 image string
        };

        fetchMock.mockResponseOnce(JSON.stringify(mockRetrievalData)); // mock for retrieveSingle
        fetchMock.mockResponseOnce(JSON.stringify(mockVisualisationData)); // mock for visualisationSingle

        const result = await generateGraphSingle(2000, 2020, 'GovSuburb', 'GovTitle', 'Year', 'Population');
        
        expect(result).toBe('iVBORw0KGgoAAAANSUhEUgAAAAUA');
    });

    it('should return a base64 PNG string for corporate user with short-term data', async () => {
        const mockRetrievalData = {
            years: [2021, 2022, 2023],
            suburbPopulationEstimate: [7000, 7200, 7400]
        };
        const mockVisualisationData = {
            image: 'iVBORw0KGgoAAAANSUhEUgAAAAUB' // base64 image string
        };

        fetchMock.mockResponseOnce(JSON.stringify(mockRetrievalData)); // mock for retrieveSingle
        fetchMock.mockResponseOnce(JSON.stringify(mockVisualisationData)); // mock for visualisationSingle

        const result = await generateGraphSingle(2021, 2023, 'CorpSuburb', 'CorpTitle', 'Year', 'Population');
        
        expect(result).toBe('iVBORw0KGgoAAAANSUhEUgAAAAUB');
    });

    it('should return null if the retrieval API fails', async () => {
        fetchMock.mockRejectOnce(new Error('RetrievalAPI failed')); // simulate failure in retrieval API

        const result = await generateGraphSingle(2000, 2020, 'GovSuburb', 'GovTitle', 'Year', 'Population');
        
        expect(result).toBeNull();
    });

    it('should return null if the visualisation API fails', async () => {
        const mockRetrievalData = {
            years: [2000, 2005, 2010, 2015, 2020],
            suburbPopulationEstimate: [10000, 10500, 11000, 11500, 12000]
        };

        fetchMock.mockResponseOnce(JSON.stringify(mockRetrievalData)); // mock for retrieveSingle
        fetchMock.mockRejectOnce(new Error('VisualisationAPI failed')); // simulate failure in visualisation API

        const result = await generateGraphSingle(2000, 2020, 'GovSuburb', 'GovTitle', 'Year', 'Population');
        
        expect(result).toBeNull();
    });

    it('should return null if the visualisation API returns invalid data (no image)', async () => {
        const mockRetrievalData = {
            years: [2000, 2005, 2010, 2015, 2020],
            suburbPopulationEstimate: [10000, 10500, 11000, 11500, 12000]
        };
        const mockVisualisationData = {}; // Invalid visualisation data (missing 'image')

        fetchMock.mockResponseOnce(JSON.stringify(mockRetrievalData)); // mock for retrieveSingle
        fetchMock.mockResponseOnce(JSON.stringify(mockVisualisationData)); // mock for visualisationSingle

        const result = await generateGraphSingle(2000, 2020, 'GovSuburb', 'GovTitle', 'Year', 'Population');
        
        expect(result).toBeNull();
    });
});
