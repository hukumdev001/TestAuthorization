import { createSlice } from "@reduxjs/toolkit";

export const PolicyRoleSlice = createSlice({
  name: "PolicyRole",
  initialState: {
    PolicyRoleState: {},
  },
  reducers: {
    setPolicyRole: (state, action) => {
      state.PolicyRoleState = action.payload;
    },
  },
});

export const { setPolicyRole } = PolicyRoleSlice.actions;

export default PolicyRoleSlice.reducer;
