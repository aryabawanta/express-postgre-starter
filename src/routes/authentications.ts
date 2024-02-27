import { authenticationController } from "../controllers";

export default {
  "/authentications/login": {
    post: [authenticationController.login],
  },
};
