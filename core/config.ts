import * as dotenv from 'dotenv';

/**
 * Load environment variables from .env file.
 */
dotenv.config();

export const CONFIG = { baseUrl: process.env.REACT_APP_BASE_URL || 'https://localhost:3000' };
