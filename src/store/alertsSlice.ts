import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { AppThunkAction } from '.';
import { delay } from '../utils/delay';

interface Alert {
  id: string;
  isOpen: boolean;
  color: string;
  message: string;
  tOptions?: Record<string, string>;
}

type CreateAlertFields = Partial<Pick<Alert, 'id' | 'color' | 'tOptions'>> & Pick<Alert, 'message'>;

const initialState: Alert[] = [];

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    showAlert: (
      state,
      action: PayloadAction<CreateAlertFields>
    ) => {
      state.push({
        id: nanoid(),
        isOpen: true,
        color: 'dark',
        ...action.payload,
      });
    },
    hideAlert: (state, action: PayloadAction<string>) => {
      const alert = state.find(({ id }) => id === action.payload)
      if (alert) {
        alert.isOpen = false;
      }
    },
    removeAlert: (state, action: PayloadAction<string>) => {
      return state.filter(({ id }) => id !== action.payload);
    }
  }
});

export const showAlertFor = (
  alert: CreateAlertFields,
  ms = 2500
): AppThunkAction => {
  return async (dispatch) => {
    const id = alert.id || nanoid();
    dispatch(showAlert({ id, ...alert }));
    await delay(ms);
    dispatch(hideAlert(id));
    await delay(1000);
    dispatch(removeAlert(id));
  }
}

export const { showAlert, hideAlert, removeAlert } = alertsSlice.actions;

export const alertsReducer = alertsSlice.reducer;
