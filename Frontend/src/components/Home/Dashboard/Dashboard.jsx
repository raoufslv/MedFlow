import React from "react";
import axiosInstance from "../../../config/axiosConfig.js";

const Dashboard = () => {
  const [patients, setPatients] = React.useState([]);
  const [filteredPatients, setFilteredPatients] = React.useState([]);
  const token = localStorage.getItem("token");
  const nom = localStorage.getItem("Nom");

  // handle the search bar
  const [query, setQuery] = React.useState("");

  function filterItems(items, query) {
    if (query === "") {
      return items;
    }
    return items.filter((item) => {
      return item.Nom_p.toLowerCase().startsWith(query.toLowerCase());
    });
  }

  const handleChangeSearchBar = (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);

    // use the array of patients to filter them
    const filteredPatients = filterItems(patients, searchTerm);
    setFilteredPatients(filteredPatients);
  };

  const loadPatients = () => {
    axiosInstance
      .get("/patients/all", { headers: { "x-access-token": token } })
      .then((response) => {
        console.log("Patients:", response.data);
        setPatients(response.data);
        setFilteredPatients(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  React.useEffect(() => {
    loadPatients();
  }, []);

  return (
    <div className="flex flex-col items-start justify-start w-full h-full gap-20 px-10 py-10">
      <div className="flex flex-col gap-14 w-full">
        <div>
          <h2 className="text-4xl font-semibold">Hi {nom}...</h2>
          <h2 className="text-xs font-semibold  mt-2 opacity-50">
            welcome back to your dashboard manager
          </h2>
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-5 items-center relative" id="search">
            <img
              src="icons/recherche.svg"
              alt="recherche icon"
              className="absolute left-3"
            />
            <input
              type="text"
              name="recherche"
              className="p-3 rounded-xl w-96 pl-10 focus:outline-secondary border border-primary focus:ring-secondary focus:border-secondary"
              placeholder="Rechercher..."
              value={query}
              onChange={(e) => handleChangeSearchBar(e)}
            />
          </div>
          <button
            className="rounded-xl bg-secondary text-white font-semibold text-lg px-5 py-3"
            onClick={() => {
              window.location.href = "/addpatient";
            }}
          >
            Ajouter un patient
          </button>
        </div>
      </div>
      <div className="w-full">
        <h2 className="text-2xl font-semibold">Tableau des patients</h2>
        <div className="overflow-hidden max-h-[230px] overflow-y-auto custom-scroll py-2 mt-3">
          <table className="w-full ">
            <thead className="border-b-2 border-gray-200">
              <tr className=" text-gray-500 text-sm font-semibold">
                <th className="text-left">Nom complet</th>
                <th className="text-left">Sexe</th>
                <th className="text-left">date de naissance</th>
                <th className="text-left">numéro de téléphone</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr
                  key={patient._id}
                  className="border-b-2 border-gray-200 text-sm font-semibold cursor-pointer hover:bg-gray-50 transition-all duration-200"
                  onClick={() => {
                    window.location.href = `/patient/:${patient._id}`;
                  }}
                >
                  <td className="py-5">
                    {patient.Nom_p} {patient.Prenom_p}
                  </td>
                  <td className="py-5">{patient.Sexe}</td>
                  <td className="py-5">
                    {patient.Date_naissance.split("T")[0]}
                  </td>
                  <td className="py-5">{patient.Phone}</td>
                  <td className="py-5">
                    <button
                      className="mr-5"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `/patient/${patient._id}`;
                      }}
                    >
                      <img src="icons/edit.svg" alt="edit icon" />
                    </button>
                    <button
                      className="mr-5"
                      onClick={(e) => {
                        e.stopPropagation();
                        axiosInstance
                          .delete(`/patients/${patient._id}`, {
                            headers: { "x-access-token": token },
                          })
                          .then((response) => {
                            console.log("Patient deleted:", response.data);
                            //update the UI by removing the deleted patient
                            setPatients(
                              patients.filter(
                                (patient) => patient._id !== response.data._id
                              )
                            );
                            setFilteredPatients(
                              filteredPatients.filter(
                                (patient) => patient._id !== response.data._id
                              )
                            );
                          })
                          .catch((error) => {
                            console.error("Error deleting patient:", error);
                          });
                      }}
                    >
                      <img src="icons/delete.svg" alt="delete icon" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
