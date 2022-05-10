import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getReports = createAsyncThunk(
  "Reports/getReports",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.get(
        "https://6270fe836a36d4d62c1fd38b.mockapi.io/users"
      );
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addReports = createAsyncThunk(
  "Reports/addReports",
  async (_, { rejectWithValue, dispatch, getState }) => {
    const report = getState().reports.report;
    try {
      const { data } = await axios.post(
        "https://6270fe836a36d4d62c1fd38b.mockapi.io/users",
        report
      );

      dispatch(getReports());
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editReports = createAsyncThunk(
  "reports/editReports",
  async (_, { rejectWithValue, dispatch, getState }) => {
    const report = getState().reports.report;
    const id = getState().reports.id;
    try {
      const { data } = await axios.put(
        `https://6270fe836a36d4d62c1fd38b.mockapi.io/users/${id}`,
        report
      );

      dispatch(getReports());
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteReports = createAsyncThunk(
  "reports/deleteReports",
  async (_, { rejectWithValue, dispatch, getState }) => {
    const id = getState().reports.id;

    try {
      const { data } = await axios.delete(
        `https://6270fe836a36d4d62c1fd38b.mockapi.io/users/${id}`
      );

      dispatch(getReports());
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setLoading = (state) => {
  state.loading = true;
};

const setError = (state, action) => {
  state.loading = false;
  state.status = action.payload.error;
};

const initialReport = {
  name: "",
  age: "",
  email: null,
  phone: null,
  id: null,
};
export const slice = createSlice({
  name: "reports",
  initialState: {
    reports: [],
    report: initialReport,
    id: null,
    addModal: false,
    editModal: false,
    deleteModal: false,
    loading: false,
    status: null,
  },
  reducers: {
    handleChange: (state, action) => {
      const { name, value } = action.payload;

      state.report[name] = value;
    },
    handleModalOpenAndClose: (state, action) => {
      const { name, value, id = null } = action.payload;
      state[name] = value;
      state.report = initialReport;
      if (id) {
        state.id = id;
        state.report = state.reports.find((elem) => elem.id === id);
      }
    },
  },
  extraReducers: {
    [getReports.pending]: setLoading,
    [getReports.fulfilled]: (state, action) => {
      state.loading = false;
      state.reports = action.payload;
    },
    [getReports.rejected]: (state) => {
      state.reports = [];
    },
    [addReports.pending]: setLoading,
    [addReports.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.payload;
      state.addModal = false;
    },
    [addReports.rejected]: setError,
    [editReports.pending]: setLoading,
    [editReports.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.payload;
      state.editModal = false;
    },
    [editReports.rejected]: setError,
    [deleteReports.pending]: setLoading,
    [deleteReports.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.payload;
      state.deleteModal = false;
    },
    [deleteReports.rejected]: setError,
  },
});

export const { handleChange, handleModalOpenAndClose } = slice.actions;

export default slice.reducer;
