const { MongoClient } = require('mongodb');
const url = 'mongodb://127.0.0.1:27018/?directConnection=true';
const client = new MongoClient(url);

async function run() {
  try {
    await client.connect();
    const db = client.db('admin');
    const result = await db.command({ replSetInitiate: {} });
    console.log('Replica set initiated:', result);
  } catch (error) {
    console.error('Error initiating replica set:', error);
  } finally {
    await client.close();
  }
}
run();
