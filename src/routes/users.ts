import { userController } from "../controllers";
import { UserRoles } from "../interfaces";
import { permissionMiddleware, tokenMiddleware } from "../middlewares";

export default {
  "/users": {
    get: [tokenMiddleware.verify, permissionMiddleware.verify([UserRoles.ADMIN]), userController.getAll],
    post: [tokenMiddleware.verify, permissionMiddleware.verify([UserRoles.ADMIN]), userController.create],
  },
  "/users/current": {
    get: [tokenMiddleware.verify, userController.current],
  },
  "/users/:id": {
    patch: [tokenMiddleware.verify, permissionMiddleware.onlyCurrentUserOrAdmin, userController.update],
    delete: [tokenMiddleware.verify, permissionMiddleware.verify([UserRoles.ADMIN]), userController.remove],
  },
};
