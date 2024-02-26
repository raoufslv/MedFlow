import axios from "../../../config/axiosConfig.js";

const pageActive = window.location.pathname;

// Add active class based on the current page
const getClassNames = (page) => {
  return page === pageActive ? "bg-secondary bg-opacity-10 text-secondary" : "";
};

const getCurrentWord = (page) => {
  return page === pageActive ? "Current" : "";
};

const SideBar = () => {
  return (
    <div className="h-full flex flex-col items-center justify-between w-1/5 border-r-2 py-6">
      <div className=" flex flex-col gap-20 w-full px-10">
        <h2
          onClick={() => (window.location.href = "/")}
          className="text-4xl font-bold mb-5 text-center font-racingSansOne text-secondary flex gap-5 items-center justify-center cursor-pointer"
        >
          <img src="ico.svg" alt="logo_MEDHUB" />
          MedFlow
        </h2>
        <ul className="flex flex-col gap-8 text-xl font-semibold mb-5 text-start">
          <a href="/dashboard">
            <li
              className={`rounded-xl w-full py-3 px-5 hover:bg-secondary hover:bg-opacity-10 transition-all duration-200 flex gap-4
          ${getClassNames("/dashboard")} ${getClassNames("/addpatient")}`}
              id="dashboard"
            >
              <img
                src={`icons/dashboard${getCurrentWord("/dashboard")}${getCurrentWord("/addpatient")}.svg`}
                alt="dashboard icon"
              />
              <p>Dashboard</p>
            </li>
          </a>
          <a href="/profile">
            <li
              id="profile"
              className={`rounded-xl w-full py-3 px-5 hover:bg-secondary hover:bg-opacity-10 transition-all duration-200 flex gap-4
          ${getClassNames("/profile")} ${getClassNames("/password")}`}
            >
              <img
                src={`icons/profil${getCurrentWord("/profile")}${getCurrentWord(
                  "/password"
                )}.svg`}
                alt="profile icon"
              />
              <p>Profile</p>
            </li>{" "}
          </a>
          <a href="/historique">
            <li
              id="historique"
              className={`rounded-xl w-full py-3 px-5 hover:bg-secondary hover:bg-opacity-10 transition-all duration-200 flex gap-4
          ${getClassNames("/historique")}`}
            >
              <img
                src={`icons/historique${getCurrentWord("/historique")}.svg`}
                alt="historique icon"
              />
              <p>Historique</p>
            </li>
          </a>
        </ul>
      </div>

      <button
        onClick={() => {
          axios
            .post("/users/logout")
            .then((response) => {
              console.log(response.data); // Handle successful response here
              localStorage.removeItem("token");
              localStorage.removeItem("roles");
              window.location.href = "/signin";
            })
            .catch((error) => {
              console.log(error.response.data);
              console.error(error); // Handle error here
            });
        }}
        className="rounded-xl font-semibold text-xl text-red-600 hover:bg-red-100 animate-ease-out transition-all duration-200
      flex gap-4 items-center justify-center py-3 px-5"
      >
        <img src="icons/deconnecter.svg" alt="logout icon" />
        <p>Se déconnecter</p>
      </button>
    </div>
  );
};

export default SideBar;
