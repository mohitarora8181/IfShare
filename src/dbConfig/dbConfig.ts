import { Client } from 'pg';

const dbClient = new Client({
    connectionString: process.env.DATABASE_URL,
});

export default async function handler(req: any, res : any) {
    try {
        await dbClient.connect();
        // Perform your database queries here
        res.status(200).json({ message: 'Connected to the database!' });
    } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).json({ error: 'Database connection failed' });
    } finally {
        await dbClient.end();
    }
}
