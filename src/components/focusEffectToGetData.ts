import { useConnectionAlert } from "./ConnectionAlertProvider";

type FocusEffectToGetData = {
  request: () => any;
  setData: React.Dispatch<React.SetStateAction<any>>;
  setIsDataRequestProcessed: React.Dispatch<React.SetStateAction<boolean>>;
};

const focusEffectToGetData = async ({
  request,
  setData,
  setIsDataRequestProcessed,
}: FocusEffectToGetData) => {
  setIsDataRequestProcessed(false);
  const result = await request();
  if (result && typeof result !== "boolean") {
    setData(result);
  } else {
    // setConnectionStatus(false, "Не вдалося загрузити дані");
  }
  setIsDataRequestProcessed(true);
};

export default focusEffectToGetData;
