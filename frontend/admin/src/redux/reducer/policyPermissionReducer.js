import { createSlice } from "@reduxjs/toolkit";

export const policyPermissionSlice = createSlice({
  name: "policyPermission",
  initialState: {
    policyPermissionState: {},
  },
  reducers: {
    setpolicyPermission: (state, action) => {
      state.policyPermissionState = action.payload;
    },
  },
});

export const { setpolicyPermission } = policyPermissionSlice.actions;

export default policyPermissionSlice.reducer;
