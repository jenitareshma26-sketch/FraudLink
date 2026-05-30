import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { TransactionState, Transaction } from '../types';
import { mockTransactions } from '../data/mockData';

const initialState: TransactionState = {
  items: mockTransactions,
  loading: false,
  error: null,
  filters: {},
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.items = action.payload;
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.items.unshift(action.payload);
    },
    setFilters: (state, action: PayloadAction<any>) => {
      state.filters = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setTransactions, addTransaction, setFilters, setLoading, setError } = transactionSlice.actions;
export default transactionSlice.reducer;
