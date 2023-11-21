import express from 'express';
import Pageres from 'pageres';
import path from 'path';

const app = express();

app.get('/capture', async (req, res) => {
    const { site, delay } = req.query;
    
    if (!site) {
        return res.status(400).send('Please provide a site parameter');
    }
    
    if (!delay) {
        return res.status(400).send('Please provide a delay(seconds) parameter');
    }

    try {
        var filename = "<%= date %>_<%= time %>_<%= url %>"
        var dir = "screenshots"
        await new Pageres({ delay: delay })
            .source(site, ['1920x1080'], { crop: true, filename: filename })
            .destination(dir)
            .run();

        const filePath = path.join(__dirname, dir);

        console.log("filePath: " + filePath)

        // send image as response
        res.sendFile(`${filePath}/${filename}.png`);
        
        // delete image after sending
        setTimeout(() => {
            fs.unlinkSync(`${filePath}/${filename}.png`);
        }, 1000);
    } catch (error) {
        console.error('Error capturing screenshot:', error);
        res.status(500).send(JSON.stringify(error));

        // delete image after sending
        setTimeout(() => {
            fs.unlinkSync(`${filePath}/${filename}.png`);
        }, 1000);
    }
});

const PORT = 3000; // Port on which the server will run
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
