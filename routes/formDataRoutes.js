const express = require('express');
const router = express.Router();
const FormData = require('../models/FormData');
const upload = require('../middleware/multerConfig');

// Handle form submission
router.post('/ins', upload.single('logo'), (req, res) => {
  const formData = new FormData({
    name: req.body.name,
    gender: req.body.gender,
    whno: req.body.whno,
    contact: req.body.contact,
    email: req.body.email,
    dob: req.body.dob,
    businessName: req.body.bName,
    category: req.body.category,
    address: req.body.address,
    pin: req.body.pin,
    loc: req.body.loc,
    city: req.body.city,
    link: req.body.link,
    desc: req.body.desc,
    disc: req.body.disc,
    logo: req.file ? req.file.path : '',
    status: 'not verified',
    createdAt: new Date()
  });

  formData.save()
    .then(data => res.json(data))
    .catch(err => res.status(400).json({ error: err.message }));
});

// Fetch all form data sorted by createdAt field in descending order
router.get('/form-data', (req, res) => {
  FormData.find().sort({ createdAt: -1 })
    .then(data => res.json(data))
    .catch(err => res.status(400).json({ error: err.message }));
});

// Update form data status
router.put('/form-data/:id', (req, res) => {
  FormData.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true })
    .then(data => res.json(data))
    .catch(err => res.status(400).json({ error: err.message }));
});

router.put('/update-form-data/:id', upload.single('logo'), (req, res) => {
  const updateData = {
    name: req.body.name,
    gender: req.body.gender,
    whno: req.body.whno,
    contact: req.body.contact,
    email: req.body.email,
    dob: req.body.dob,
    businessName: req.body.bName,
    category: req.body.category,
    address: req.body.address,
    pin: req.body.pin,
    loc: req.body.loc,
    city: req.body.city,
    link: req.body.link,
    disc: req.body.disc,
    desc: req.body.desc
  };

  if (req.file) {
    updateData.logo = req.file.path;
  }

  FormData.findByIdAndUpdate(req.params.id, updateData, { new: true })
    .then(data => res.json(data))
    .catch(err => res.status(400).json({ error: err.message }));
});

router.get('/home-data', async (req, res) => {
  try {
    const data = await FormData.find({ status: { $nin: ['not verified', 'blocked'] } });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/check', upload.none(), async (req, res) => {
  const { contact, email } = req.body;

  try {
    const user = await FormData.findOne({
      $or: [{ contact: contact }, { whno: contact }],
      email: email
    });

    if (user) {
      res.json({ found: true, user });
    } else {
      res.json({ found: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
