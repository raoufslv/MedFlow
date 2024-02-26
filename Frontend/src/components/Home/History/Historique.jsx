import React from "react";
import axiosInstance from "../../../config/axiosConfig.js";

const Historique = () => {
  const token = localStorage.getItem("token");
  const [historique, setHistorique] = React.useState([]);

  const loadHistorique = () => {
    axiosInstance
      .get("/history/all", { headers: { "x-access-token": token } })
      .then((response) => {
        console.log("Historique:", response.data);
        setHistorique(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  React.useEffect(() => {
    loadHistorique();
  }, []);

  const SpellTheBeens = (word) => {
    switch (word) {
      case "Create":
        return "créer";
        break;

      case "Update":
        return "mettre a jour";
        break;

      case "Delete":
        return "supprimer";
        break;

      case "Read":
        return "consulter";
        break;

      default:
        break;
    }
  };

  return (
      <div className="flex flex-col gap-y-5 p-10 h-[86vh]">
        <ul className="flex flex-col self-start gap-y-4 overflow-y-scroll h-full w-3/4 custom-scroll shadow-lg rounded-lg py-5">
          {historique.map((element) => (
            <div className="" key={element._id}>
              <li className="font-semibold text-lg ml-10">
                Vous avez
                <span className="font-bold text-lg ml-2">
                  {SpellTheBeens(element.actionType)}
                </span>{" "}{" "}
                un(e)
                <span className="font-bold text-lg ml-2">
                  {element.RessourceName}
                </span>{" "}
                le
                <span className="font-bold text-lg ml-2">
                  {element.timestamp.split("T")[0]}
                </span>{" "}
                à
                <span className="font-bold text-lg ml-2">
                  {element.timestamp.split("T")[1].split(".")[0]}
                </span>
              </li>
              <hr className="bg-gray-600 mb-2 mt-4 w-full" />
            </div>
          ))}
        </ul>
      </div>
  );
};

export default Historique;
