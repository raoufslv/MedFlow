import HistoriqueAction from "../Models/History.schema.js";
import onFinished from "on-finished";

const ActionTypes = {
  TYPE1: "Create",
  TYPE2: "Update",
  TYPE3: "Delete",
  TYPE4: "Read",
};

export const responseHandler = (req, res, next) => {
  onFinished(res, (err, data) => {
    const resourceId =
      req.params.idP || req.params.idR || req.params.id || req.userId;
      if(!resourceId) return;
    const ressourceName = req.baseUrl.split("/")[1];
    if(!ressourceName) return;
    const actionType =
      req.method === "POST"
        ? ActionTypes.TYPE1
        : req.method === "PUT"
        ? ActionTypes.TYPE2
        : req.method === "DELETE"
        ? ActionTypes.TYPE3
        : ActionTypes.TYPE4;

    // Add a record to the HistoriqueAction collection
    HistoriqueAction.create({
      RessourceId: resourceId,
      RessourceName: ressourceName,
      actionType,
    });
  });
  next();
};

export default responseHandler;
