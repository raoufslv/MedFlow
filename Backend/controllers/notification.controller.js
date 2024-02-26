import db from "../Models/index.js";

const Notification = db.notification;
const User = db.user;
const RendezVous = db.RendezVous;

export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();

    if (!notifications) {
      res.status(404).send(" No notifications found");
      return;
    }
    res.send(notifications);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      res.status(404).send("Notification not found");
      return;
    }
    // make the notification as read
    notification.vu = true;
    res.send(notification);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      res.status(404).send("Notification not found");
      return;
    }
    await Notification.deleteOne(notification);
    res.send({ message: "Notification was deleted successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const getUnreadNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ vu: false });
    if (!notifications) {
      res.status(404).send("No notifications found");
      return;
    }
    res.send(notifications);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const addNotifications = async (userId) => {
  try {
    const user = await User.findById(userId);
    const rendezvous = await RendezVous.find({
      medecin_Id: userId,
      DateRendezVous: { $gte: new Date().setHours(0, 0, 0, 0) },
    });
    rendezvous.forEach((rdv) => {
      const notification = new Notification({
        medecinId: user._id,
        rendezVousId: rdv._id,
        NomPatient: rdv.patient_Id.Nom,
        prenomPatient: rdv.patient_Id.Prenom,
        message: `Vous avez un rendez vous avec ${rdv.patient_Id.Nom} ${rdv.patient_Id.Prenom} à ${rdv.heureRendezVous}`,
        date: rdv.DateRendezVous,
      });
      notification.save();
    });
  } catch (err) {
    console.log(err);
  }
};
