const mongoose = require('mongoose');

const roomsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    // slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    type: { type: String, enum: ['single', 'couple', 'family', 'presidential', 'suite'], required: true },
    price: { type: Number, required: true },
    size: { type: Number, required: true },
    room_capacity: { type: Number, required: true },
    petsAllowed: { type: Boolean, default: false },
    breakfastIncluded: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    room_description: { type: String, required: true },
    facilities: [String],
    images: [{ url: { type: String, required: true } }],
    status: { type: String, enum: ['available', 'unavailable', 'booked'], default: 'available' },
  },
  { timestamps: true, strict: false } // 👈 strict: false allows saving extra fields
);

// Auto format slug before saving
roomsSchema.pre('save', function (next) {
  if (this.slug) {
    this.slug = this.slug.replace(/\s+/g, '-');
  }
  next();
});

module.exports = mongoose.model('Room', roomsSchema);
