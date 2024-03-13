import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfoProps } from "../../types/Types";
import { RootState } from "../store";

export type UserInfoBackendProps = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: string;
  description: string | null;
  isLoaned: boolean;
  isStaff: boolean;
  isSuperuser: boolean;
  telegramId: number | null;
  permissionIds: number[];
};

const initialState = {} as UserInfoProps;

export const userInfoSlice = createSlice({
  name: "userInfoSlice",
  initialState,
  reducers: {
    setUserInfo: (state, info: PayloadAction<UserInfoBackendProps>) => {
      state = info.payload;
      return state;
    },
    removeUserInfo: (state) => {
      state = initialState;
      return state;
    },
  },
});

export const selectUserInfo = (state: RootState) => state.userInfoReducer;
export const { setUserInfo, removeUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
