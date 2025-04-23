import express from 'express';
import cors from 'cors';
import { evaluateCandidate } from './services/flaggingService';

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Define interfaces
export interface Candidate {
  name: string;
  nacExam: number;
  mccqe1Result: number;
  canadianExperience: number;
  practiceGaps: number;
}

export interface Flag {
  type: string;
  severity: 'high' | 'medium' | 'low';
  message: string;
  acknowledged: boolean;
}

// Test endpoint to verify server is running
app.get('/test', (req, res) => {
  console.log('Test endpoint hit');
  res.json({ message: 'Backend is running!' });
});

// Endpoint to evaluate candidate
app.post('/evaluate', (req, res) => {
  console.log('Evaluate endpoint hit with data:', req.body);
  try {
    const candidate: Candidate = req.body;
    
    // Validate required fields
    if (!candidate.name || 
        candidate.nacExam === undefined || 
        candidate.mccqe1Result === undefined || 
        candidate.canadianExperience === undefined || 
        candidate.practiceGaps === undefined) {
      throw new Error('Missing required fields');
    }
    
    const flags = evaluateCandidate(candidate);
    console.log('Generated flags:', flags);
    res.json(flags);
  } catch (err: unknown) {
    console.error('Error processing request:', err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
    res.status(400).json({ 
      error: 'Invalid candidate data',
      details: errorMessage
    });
  }
});

// Error handling middleware
app.use((err: unknown, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
  res.status(500).json({ 
    error: 'Internal server error',
    details: errorMessage
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 