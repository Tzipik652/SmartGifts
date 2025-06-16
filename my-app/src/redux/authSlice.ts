import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  username: string | null;
  isAdmin: boolean;
}

const initialState: AuthState = {
  username: localStorage.getItem("displayName"),
  isAdmin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(
      state,
      action: PayloadAction<{ username: string; isAdmin: boolean }>
    ) {
      state.username = action.payload.username;
      state.isAdmin = action.payload.isAdmin;
      localStorage.setItem("displayName", action.payload.username);
    },
    logout(state) {
      state.username = null;
      state.isAdmin = false;
      localStorage.removeItem("displayName");
      localStorage.removeItem("email");
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export const selectUsername = (state: any) => state.auth.username;
export const selectIsAdmin = (state: any) => state.auth.isAdmin;

export default authSlice.reducer;
