import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  userId: string | null;
  username: string | null;
  email: string | null;
  isAdmin: boolean;
}

const initialState: AuthState = {
  userId: null,
  username: null,
  email: null,
  isAdmin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(
      state,
      action: PayloadAction<{
        userId: string;
        username: string;
        email: string;
        isAdmin: boolean;
      }>
    ) {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.isAdmin = action.payload.isAdmin;
    },
    logout(state) {
      state.userId = null;
      state.username = null;
      state.email = null;
      state.isAdmin = false;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export const selectUserId = (state: any) => state.auth.userId;
export const selectUsername = (state: any) => state.auth.username;
export const selectEmail = (state: any) => state.auth.email;
export const selectIsAdmin = (state: any) => state.auth.isAdmin;

export default authSlice.reducer;
