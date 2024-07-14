import UserService from "../services/users.service.js";

const findAll = async (req, res) => {
  try {
    const users = await UserService.findAll();

    return res.status(200).json({
      data: users,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Something went wrong",
    });
  }
};

const findById = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await UserService.findById(id);

    if (!student) {
      return res.status(400).json({
        message: "User Not Found",
      });
    }

    return res.status(200).json({
      data: student,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Something went wrong",
    });
  }
};

const findByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await UserService.findByEmail(email);

    if (!user) {
      return res.status(400).json({
        message: "User Not Found",
      });
    }

    return res.status(200).json({
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Something went wrong",
    });
  }
};

const create = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        message: "Missing Fields",
      });
    }

    const user = await UserService.create({ email, password });

    return res.status(201).json({
      data: user,
    });
  } catch (err) {
    if (err.code === "P2002") {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    return res.status(500).json({
      message: err || "Something went wrong",
    });
  }
};

const update = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Missing Fields",
      });
    }

    const user = await UserService.update({ email, password });

    return res.status(200).json({
      data: user,
    });
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(400).json({
        message: "User Not Found",
      });
    }

    return res.status(500).json({
      message: err.message || "Something went wrong",
    });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserService.remove(id);

    if (user) {
      return res.status(200).json({
        message: "User Delete Success",
      });
    }
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(400).json({
        message: "User Not Found",
      });
    }

    return res.status(500).json({
      message: err.message || "Something went wrong",
    });
  }
};

const UserController = {
  findAll,
  findById,
  findByEmail,
  create,
  update,
  remove,
};

export default UserController;
