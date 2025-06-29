import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MessageState {
  type: "success" | "error" | "info" | null;
  text: string;
}

const initialState: MessageState = {
  type: null,
  text: "",
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage(
      state,
      action: PayloadAction<{ type: "success" | "error" | "info"; text: string }>
    ) {
      state.type = action.payload.type;
      state.text = action.payload.text;
    },
    clearMessage(state) {
      state.type = null;
      state.text = "";
    },
  },
});

export const { setMessage, clearMessage } = messageSlice.actions;

export const selectMessage = (state: any) => state.message;

export default messageSlice.reducer;
