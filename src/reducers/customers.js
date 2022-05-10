import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCustomers = createAsyncThunk(
  "customers/getCutomers",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.get(
        "https://6270fe836a36d4d62c1fd38b.mockapi.io/customers"
      );
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addCustomers = createAsyncThunk(
  "customers/addCustomers",
  async (_, { rejectWithValue, dispatch, getState }) => {
    const customer = getState().customers.customer;
    try {
      const { data } = await axios.post(
        "https://6270fe836a36d4d62c1fd38b.mockapi.io/customers",
        customer
      );

      dispatch(getCustomers());
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editCustomers = createAsyncThunk(
  "customers/editCustomers",
  async (_, { rejectWithValue, dispatch, getState }) => {
    const customer = getState().customers.customer;
    const id = getState().customers.id;
    try {
      const { data } = await axios.put(
        `https://6270fe836a36d4d62c1fd38b.mockapi.io/customers/${id}`,
        customer
      );

      dispatch(getCustomers());
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCustomers = createAsyncThunk(
  "customers/deleteCustomers",
  async (_, { rejectWithValue, dispatch, getState }) => {
    const id = getState().customers.id;

    try {
      const { data } = await axios.delete(
        `https://6270fe836a36d4d62c1fd38b.mockapi.io/customers/${id}`
      );

      dispatch(getCustomers());
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

const initialCustomer = {
  firstname: "",
  lastname: "",
  phone: "",
};
export const slice = createSlice({
  name: "customers",
  initialState: {
    customers: [],
    customer: initialCustomer,
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

      state.customer[name] = value;
    },
    handleModalOpenAndClose: (state, action) => {
      const { name, value, id = null } = action.payload;
      state[name] = value;
      state.customer = initialCustomer;
      if (id) {
        state.id = id;
        state.customer = state.customers.find((elem) => elem.id === id);
      }
    },
  },
  extraReducers: {
    [getCustomers.pending]: setLoading,
    [getCustomers.fulfilled]: (state, action) => {
      state.loading = false;
      state.customers = action.payload;
    },
    [getCustomers.rejected]: (state) => {
      state.customers = [];
    },
    [addCustomers.pending]: setLoading,
    [addCustomers.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.payload;
      state.addModal = false;
    },
    [addCustomers.rejected]: setError,
    [editCustomers.pending]: setLoading,
    [editCustomers.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.payload;
      state.editModal = false;
    },
    [editCustomers.rejected]: setError,
    [deleteCustomers.pending]: setLoading,
    [deleteCustomers.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.payload;
      state.deleteModal = false;
    },
    [deleteCustomers.rejected]: setError,
  },
});

export const { handleChange, handleModalOpenAndClose } = slice.actions;

export default slice.reducer;
