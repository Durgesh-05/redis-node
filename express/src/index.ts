import express, { Request, Response } from 'express';
import { createClient } from 'redis';

const app = express();
app.use(express.json());
const client = createClient();

app.post('/submit', async (req: Request, res: Response) => {
  const { code, language, userId, problemId } = req.body;
  try {
    await client.lPush(
      'submissions',
      JSON.stringify({ problemId, userId, code, language })
    );
    res.status(200).json({ message: 'Problem is submitted' });
    return;
  } catch (e) {
    console.error('Failed to submit problem Error: ', e);
    res.status(500).json({ message: 'Something Went Wrong!' });
    return;
  }
});

async function startServer() {
  try {
    await client.connect();
    console.log('Connected to redis client');
    app.listen(8000, () => {
      console.log(`Server is Listening`);
    });
  } catch (e) {
    console.error('Failed to connect to redis server ', e);
  }
}

startServer();
