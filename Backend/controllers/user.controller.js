import jwt from "jsonwebtoken";
import bycrypt from "bcrypt";
import db from "../Models/index.js";
import { addNotifications } from "./notification.controller.js";
const User = db.user;

export const signup = (req, res) => {
  // Save User to Database
  const user = new User({
    Nom: req.body.Nom,
    Prenom: req.body.Prenom,
    Username: req.body.Username,
    mail: req.body.mail,
    password: bycrypt.hashSync(req.body.password, 8),
    Speciality: req.body.Speciality,
    PhoneNumber: req.body.PhoneNumber,
  });

  user
    .save(user)
    .then((data) => {
      jwt.sign(
        { id: user._id }, //
        process.env.JWT_SECRET_KEY,
        { expiresIn: 86400 }, // 24 hours
        (err, token) => {
          if (err) {
            res.status(500).send({ message: err.message });
            return;
          }
          res.status(200).send({
            Nom: user.Nom,
            Prenom: user.Prenom,
            Username: user.Username,
            mail: user.mail,
            PhoneNumber: user.PhoneNumber,
            Speciality: user.Speciality,
            accessToken: token,
          });
        }
      );
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

export const signin = async (req, res) => {
  try {
    console.log(req.body.Username);
    const user = await User.findOne({
      $or: [{ Username: req.body.Username }, { mail: req.body.Username }],
    });
    if (!user) {
      res.status(404).send({ message: "User Not found." });
      return;
    }
    const passwordIsValid = bycrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
      return;
    }
    jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: 86400 }, // 24 hours
      (err, token) => {
        if (err) {
          res.status(500).send({ message: err.message });
          return;
        }
        res.status(200).send({
          Nom: user.Nom,
          Prenom: user.Prenom,
          Username: user.Username,
          mail: user.mail,
          PhoneNumber: user.PhoneNumber,
          Speciality: user.Speciality,
          accessToken: token,
        });
        // add the notifications for each rendez vous that the user has today
        addNotifications(user._id);
      }
    );
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    res.status(200).send({
      id: user._id,
      Nom: user.Nom,
      Prenom: user.Prenom,
      Username: user.Username,
      mail: user.mail,
      Speciality: user.Speciality,
      PhoneNumber: user.PhoneNumber,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    user.Nom = req.body.Nom;
    user.Prenom = req.body.Prenom;
    user.Username = req.body.Username;
    user.mail = req.body.mail;
    user.Speciality = req.body.Speciality;
    user.PhoneNumber = req.body.PhoneNumber;
    await user.save();
    res.status(200).send({
      id: user._id,
      Username: user.Username,
      mail: user.mail,
      Speciality: user.Speciality,
      PhoneNumber: user.PhoneNumber,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    const passwordIsValid = bycrypt.compareSync(
      req.body.oldPassword,
      user.password
    );
    if (!passwordIsValid) {
      res.status(406).send({
        message: "Invalid Password!",
      });
      return;
    }
    user.password = bycrypt.hashSync(req.body.newPassword, 8);
    await user.save();
    res.status(200).send({ message: "Password Updated Successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
