import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config()

const router = express.Router();

// endpoint to fetch mapbox geocoding or map data
router.get('/map', async (req, res) => {
    const { search_text } = req.query;
    const mapboxAccessToken = process.env.MAPBOX_ACCESS_TOKEN;
    try {
        const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${search_text}.json`,
        {
            params: { access_token: mapboxAccessToken },
        }
        );
        res.json(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
    });
