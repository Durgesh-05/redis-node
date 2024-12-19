import { createClient } from 'redis';

const client = createClient();
async function processSubmissions() {
  await client.connect();
  //   Workers will be continously polling to server to get submission response
  while (1) {
    const submission = await client.rPop('submissions');
    // spin the docker container and execute the code
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // This is just a 1s delay to get feel the code is executed

    console.log('Submission is Processed ', submission);
  }
}

processSubmissions();
