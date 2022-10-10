import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.get(
        "https://6270fe836a36d4d62c1fd38b.mockapi.io/orders"
      );
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addOrders = createAsyncThunk(
  "orders/addOrders",
  async (_, { rejectWithValue, dispatch, getState }) => {
    const order = getState().orders.order;
    try {
      const { data } = await axios.post(
        "https://6270fe836a36d4d62c1fd38b.mockapi.io/orders",
        order
      );

      dispatch(getOrders());
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editOrders = createAsyncThunk(
  "orders/editOrders",
  async (_, { rejectWithValue, dispatch, getState }) => {
    const order = getState().orders.order;
    const id = getState().orders.id;
    console.log(order);
    try {
      const { data } = await axios.put(
        `https://6270fe836a36d4d62c1fd38b.mockapi.io/orders/${id}`,
        order
      );

      dispatch(getOrders());
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteOrders = createAsyncThunk(
  "orders/deleteOrders",
  async (_, { rejectWithValue, dispatch, getState }) => {
    const id = getState().orders.id;

    try {
      const { data } = await axios.delete(
        `https://6270fe836a36d4d62c1fd38b.mockapi.io/orders/${id}`
      );

      dispatch(getOrders());
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
  state.orders = [];
  state.deleteModal = false;
};

const initialUser = {
  customer: "",
  item: "",
  price: null,
  quantity: null,
};
export const slice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    order: initialUser,
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

      state.order[name] = value;
    },
    handleModalOpenAndClose: (state, action) => {
      const { name, value, id = null } = action.payload;
      state[name] = value;
      state.order = initialUser;
      if (id) {
        state.id = id;
        state.order = state.orders.find((elem) => elem.id === id);
      }
    },
  },
  extraReducers: {
    [getOrders.pending]: setLoading,
    [getOrders.fulfilled]: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    [getOrders.rejected]: (state) => {
      state.orders = [];
    },
    [addOrders.pending]: setLoading,
    [addOrders.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.payload;
      state.addModal = false;
    },
    [addOrders.rejected]: setError,
    [editOrders.pending]: setLoading,
    [editOrders.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.payload;
      state.editModal = false;
    },
    [editOrders.rejected]: setError,
    [deleteOrders.pending]: setLoading,
    [deleteOrders.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.payload;
      state.deleteModal = false;
    },
    [deleteOrders.rejected]: setError,
  },
});

export const { handleChange, handleModalOpenAndClose } = slice.actions;

export default slice.reducer;
