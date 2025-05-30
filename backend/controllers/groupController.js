const Group = require('../models/Group');


exports.getGroups = async (req, res) => {
  const todos = await Group.find({ members: req.user.userId }).populate('owner');
  res.json(todos);
};

exports.createGroup = async (req, res) => {
  const todo = new Group({ name: req.body.text, description: req.body.description, members:[req.user.userId] ,owner: req.user.userId});
  await todo.save();
  res.status(201).json(todo);
};

exports.joinGroup = async (req, res) => {
    try {
    const grupo = await Group.findOne({ _id: req.params.id });

    if (!grupo) {
      return res.status(404).json({ message: 'Grupo No encontrado' });
    }

    const isAlreadyMember = grupo.members.includes(req.user.userId);

    if (isAlreadyMember) {
      return res.status(400).json({ message: 'Usuario ya es Miembro' });
    }

    grupo.members.push(req.user.userId);

    await grupo.save();
    res.status(201).json(grupo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del Servidor' });
  }
};

