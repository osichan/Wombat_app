import requestToPermissionsLoad from "../services/api/permissionsLoad";
import { getDataAsync, saveDataAsync } from "../storage/Async";
import { PERMISSIONS_LOAD_KEY } from "../utils/constants/asyncStorageKeys";

const checkPermissionsLoad = async () => {
  const permissionsLoadData = await getDataAsync({
    key: PERMISSIONS_LOAD_KEY,
  });
  if (!permissionsLoadData) {
    if (await requestToPermissionsLoad()) {
      await saveDataAsync({
        key: PERMISSIONS_LOAD_KEY,
        data: "permissions",
      });
      return true;
    }
    return false;
  }
};
export default checkPermissionsLoad;
