import express from 'express';
import { createShortUrl } from '../controller/short_url.controller.js';
import { redirectFromShortUrl } from '../controller/short_url.controller.js';
const router = express.Router();

router.post("/",createShortUrl);
router.get("/:id", redirectFromShortUrl); 

export default router;