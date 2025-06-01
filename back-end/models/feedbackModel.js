// backend/models/feedbackModel.js
const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    voters: [
      {
        type: String, // Stores the voter_identifier (e.g., UUID from frontend local storage)
      }
    ]
  },
  {
    timestamps: true, // Mongoose automatically adds createdAt and updatedAt fields
    toJSON: { virtuals: true }, // Ensure virtuals are included when converting to JSON
    id: false // Prevents Mongoose from creating a default 'id' virtual that duplicates '_id'
  }
);

// Define a virtual 'id' field that returns the '_id' as a string.
// This allows your frontend to still use 'feedback.id' instead of 'feedback._id'.
feedbackSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

// Configure JSON output to remove the default '_id' and '__v' fields
feedbackSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id; // Remove the default _id field from the output
        delete ret.__v; // Remove the __v field (version key) from the output
    }
});

module.exports = mongoose.model('Feedback', feedbackSchema);