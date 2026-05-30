import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AlertState, FraudAlert } from '../types';
import { mockFraudAlerts } from '../data/mockData';

const initialState: AlertState = {
  items: mockFraudAlerts,
  loading: false,
  error: null,
  unreadCount: mockFraudAlerts.filter(a => !a.reviewed).length,
};

const alertSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    setAlerts: (state, action: PayloadAction<FraudAlert[]>) => {
      state.items = action.payload;
      state.unreadCount = action.payload.filter(a => !a.reviewed).length;
    },
    escalateAlert: (state, action: PayloadAction<string>) => {
      const alert = state.items.find(a => a.id === action.payload);
      if (alert) {
        alert.escalated = true;
        if (!alert.reviewed) {
          alert.reviewed = true;
          state.unreadCount -= 1;
        }
      }
    },
    markAsReviewed: (state, action: PayloadAction<string>) => {
      const alert = state.items.find(a => a.id === action.payload);
      if (alert && !alert.reviewed) {
        alert.reviewed = true;
        state.unreadCount -= 1;
      }
    },
    addAlert: (state, action: PayloadAction<FraudAlert>) => {
      state.items.unshift(action.payload);
      if (!action.payload.reviewed) {
        state.unreadCount += 1;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setAlerts, escalateAlert, markAsReviewed, addAlert, setLoading, setError } = alertSlice.actions;
export default alertSlice.reducer;
