import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "../reducers/dashboard";
import orders from "../reducers/orders";
import customers from "../reducers/customers";
import reports from "../reducers/reports";

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    orders: orders,
    customers: customers,
    reports: reports,
  },
});
