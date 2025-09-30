import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true,
    index: true
  },
  location: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  link: {
    type: String,
    trim: true
  },
  source: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Technology', 'Community', 'Music', 'Business', 'Health', 'Arts', 'Entertainment', 'Other'],
    default: 'Other'
  },
  imageUrl: {
    type: String,
    trim: true
  },
  imageAlt: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Prevent duplicate events (same title + date)
EventSchema.index({ title: 1, date: 1 }, { unique: true });

export default mongoose.models.Event || mongoose.model('Event', EventSchema);