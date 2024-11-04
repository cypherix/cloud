// models/sneaker.js

import mongoose from 'mongoose';

const sneakerSchema = new mongoose.Schema({
  box_condition: {
    type: String,
   
  },
  brand_name: {
    type: String
  },
  category: {
    type: [String]
  },
  collection_slugs: {
    type: [String]
  },
  color: {
    type: String
  },
  designer: {
    type: String
  },
  details: {
    type: String
  },
  gender: {
    type: [String]
  },
  grid_picture_url: {
    type: String
  },
  has_picture: {
    type: Boolean,
    default: true,
  },
  has_stock: {
    type: Boolean,
    default: true,
  },
  id: {
    type: Number
  },
  keywords: {
    type: [String]
  },
  main_picture_url: {
    type: String
  },
  midsole: {
    type: String
  },
  name: {
    type: String
  },
  nickname: {
    type: String
  },
  original_picture_url: {
    type: String
  },
  product_template_id: {
    type: Number
  },
  release_date: {
    type: Date
  },
  release_date_unix: {
    type: Number
  },
  release_year: {
    type: Number
  },
  retail_price_cents: {
    type: Number
  },
  shoe_condition: {
    type: String
  },
  silhouette: {
    type: String
  },
  size_range: {
    type: [Number]
  },
  sku: {
    type: String
  },
  slug: {
    type: String
  },
  status: {
    type: String,
    default: 'active',
  },
  story_html: {
    type: String
  },
  upper_material: {
    type: String
  },
});

const Sneaker = mongoose.model('Sneaker', sneakerSchema);


export const createSneaker = async (req, res) => {
  const sneakerData = req.body;

  try {
    const newSneaker = new Sneaker(sneakerData);
    await newSneaker.save();
    res.status(201).json({ message: 'Sneaker created successfully.', sneaker: newSneaker });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create sneaker.', message: error.message });
  }
};

// Get all sneakers
export const getAllSneakers = async (req, res) => {
  try {
    const sneakers = await Sneaker.find();
    res.status(200).json({ sneakers });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sneakers.', message: error.message });
  }
};

// Get a single sneaker by ID
export const getSneakerById = async (req, res) => {
  const { id } = req.params;

  try {
    const sneaker = await Sneaker.findById(id);
    if (!sneaker) {
      return res.status(404).json({ error: 'Sneaker not found.' });
    }
    res.status(200).json({ sneaker });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sneaker.', message: error.message });
  }
};

// Update a sneaker by ID
export const updateSneaker = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedSneaker = await Sneaker.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedSneaker) {
      return res.status(404).json({ error: 'Sneaker not found.' });
    }
    res.status(200).json({ message: 'Sneaker updated successfully.', sneaker: updatedSneaker });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update sneaker.', message: error.message });
  }
};

// Delete a sneaker by ID
export const deleteSneaker = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSneaker = await Sneaker.findByIdAndDelete(id);
    if (!deletedSneaker) {
      return res.status(404).json({ error: 'Sneaker not found.' });
    }
    res.status(200).json({ message: 'Sneaker deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete sneaker.', message: error.message });
  }
};

export default Sneaker;