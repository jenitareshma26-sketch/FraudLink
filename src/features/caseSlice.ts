import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CaseState, Case } from '../types';
import { mockCases } from '../data/mockData';

const initialState: CaseState = {
  items: mockCases,
  loading: false,
  error: null,
  selectedCase: null,
};

const caseSlice = createSlice({
  name: 'cases',
  initialState,
  reducers: {
    setCases: (state, action: PayloadAction<Case[]>) => {
      state.items = action.payload;
    },
    addCase: (state, action: PayloadAction<Case>) => {
      state.items.push(action.payload);
    },
    updateCase: (state, action: PayloadAction<Case>) => {
      const index = state.items.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    selectCase: (state, action: PayloadAction<Case | null>) => {
      state.selectedCase = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setCases, addCase, updateCase, selectCase, setLoading, setError } = caseSlice.actions;
export default caseSlice.reducer;
