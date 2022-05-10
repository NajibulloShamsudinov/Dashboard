import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCharts = createAsyncThunk(
  "dashboard/getCharts",
  async (_, { rejectWithValue }) => {
    try {
      const { data = [] } = await axios.get(
        "https://6273c5f6345e1821b2213ae6.mockapi.io/chart"
      );

      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const slice = createSlice({
  name: "dashboard",
  initialState: {
    data: [],
    loading: false,
    messageError: "",
  },
  reducers: {
  
  },
  extraReducers: {
    [getCharts.pending]: (state, action) => {
      state.loading = true;
    },
    [getCharts.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [getCharts.error]: (state, action) => {
      state.loading = false;
      state.data = [];
      state.messageError = action.payload;
    },
  },
});

const {  } = slice.actions;

export default slice.reducer;
