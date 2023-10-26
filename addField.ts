import mongoose from 'mongoose';
import { config } from 'dotenv';
config();
// Connection URL from your MongoDB Atlas cluster
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB using Mongoose
mongoose.connect(MONGODB_URI);

const db = mongoose.connection;

// Check for connection errors
db.on('error', (err) => {
  console.error('Error connecting to MongoDB Atlas:', err);
});

// Connection successful
db.once('open', async () => {
  console.log('Connected to MongoDB Atlas');

  // Define a Mongoose schema for your collection
  const nftSchema = new mongoose.Schema({
    // Your existing schema fields here
    // ...

    // Add the new field to the schema
    thumbnailLink: String,
  });

  // Create a Mongoose model for your collection
  const Nft = mongoose.model('nfts', nftSchema);

  // Specify the field you want to add to the schema
  const newField = 'thumbnailLink';

  // Update all documents in the collection to include the new field
  const update = {
    [newField]: '',
  };

  // Update all documents in the collection
  const result = await Nft.updateMany({}, { $set: update });

  console.log(
    `Added ${newField} to the schema of the collection for ${result.matchedCount} documents.`,
  );

  // Close the connection
  mongoose.connection.close();
});
