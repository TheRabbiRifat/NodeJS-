const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const port = 3000;

// Endpoint to capture screenshot
app.get('/screenshot', async (req, res) => {
    const url = 'https://everify.bdris.gov.bd/';

    try {
        // Launch a headless browser instance
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Navigate to the specified URL
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Capture the screenshot as base64
        const screenshot = await page.screenshot({ encoding: 'base64', fullPage: true });

        // Close the browser
        await browser.close();

        // Send the screenshot as base64
        res.send(screenshot);
    } catch (error) {
        console.error('Error capturing screenshot:', error);
        res.status(500).send('Failed to capture screenshot');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
