const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  const users = await User.query();
  res.json(users);
});

// Obtener un usuario por ID
router.get('/:id', async (req, res) => {
  const user = await User.query().findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.json(user);
});

// Crear un usuario
router.post('/', async (req, res) => {
    const { name, email, birthdate, gender, document_id } = req.body;
  
    // Validaciones de datos
    if (!name || !email || !birthdate || !gender || !document_id) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }
  
    try {
      const newUser = await User.query().insert({
        name,
        email,
        birthdate,
        gender,
        document_id
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

// Actualizar un usuario
router.put('/:id', async (req, res) => {
    const { name, email, birthdate, gender, document_id } = req.body;
  
    // Validaciones de datos
    if (!name || !email || !birthdate || !gender || !document_id) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }
  
    try {
      const updatedUser = await User.query().patchAndFetchById(req.params.id, {
        name,
        email,
        birthdate,
        gender,
        document_id
      });
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
// Eliminar un usuario
router.delete('/:id', async (req, res) => {
  const deletedRows = await User.query().deleteById(req.params.id);
  if (!deletedRows) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.json({ message: 'Usuario eliminado' });
});

module.exports = router;