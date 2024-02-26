import axiosInstance from "../../../config/axiosConfig.js";

const NavbarUser = () => {
  // get user name from local storage
  var Nom = localStorage.getItem("Nom");
  var Specialite = localStorage.getItem("Specialite");
  const pageActive = window.location.pathname;

  // check if the variables are empty ? if yes, retrerive them from the server and store them in the local storage
  if (!Nom || !Specialite) {
    axiosInstance
      .get("/users/profile")
      .then((res) => {
        localStorage.setItem("Nom", res.data.Nom);
        localStorage.setItem("PreNom", res.data.Prenom);
        localStorage.setItem("Username", res.data.Username);
        localStorage.setItem("mail", res.data.mail);
        localStorage.setItem("PhoneNumber", res.data.PhoneNumber);
        localStorage.setItem("Specialite", res.data.Specialite);
        Nom = res.data.Nom;
        Specialite = res.data.Specialite;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getPage = () => {
    switch (pageActive) {
      case "/dashboard":
        return "Dashboard";
      case "/password":
        return "Changer mot de passe";
      case "/profile":
        return "Mon profile";
      case "/historique":
        return "Historique";
      case "/addpatient":
        return "Ajouter un patient";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="flex justify-between items-center px-10 py-5 border-b-2 gap-10">
      <div>
        <h2 className="text-3xl font-bold font-poppins">{getPage()}</h2>
      </div>
      <div className="flex items-center gap-10">
        <div className="flex gap-5">
          <img src="icons/notification.svg" alt="notification icon" />
          <img src="icons/help.svg" alt="help icon" />
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-semibold">{Nom}</p>
          <p className="text-sm font-semibold opacity-50">{Specialite}</p>
        </div>
      </div>
    </div>
  );
};

export default NavbarUser;
