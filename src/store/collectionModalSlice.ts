import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { Collection } from '../types/collection';

interface CollectionNullableId extends Pick<Collection, 'name' | 'description'> {
  id: Collection['id'] | null;
}

interface InitialState {
  isOpen: boolean;
  values: CollectionNullableId;
}

const initialState: InitialState = {
  isOpen: false,
  values: {
    id: null,
    name: '',
    description: ''
  }
};

const collectionModalSlice = createSlice({
  name: 'collectionModal',
  initialState,
  reducers: {
    toggleIsOpen: (state, action: PayloadAction<boolean | undefined>) => {
      state.isOpen = action.payload ?? !state.isOpen;
    },
    setValues: (state, action: PayloadAction<CollectionNullableId>) => {
      state.values = action.payload;
    },
    resetValues: (state) => {
      state.values = {
        id: null,
        name: '',
        description: ''
      };
    }
  }
});

export const modalActionSelector = (state: RootState) => {
  return state.collectionModal.values.id === null
    ? 'create'
    : 'update'
}

export const {
  toggleIsOpen,
  setValues,
  resetValues
} = collectionModalSlice.actions;

export const collectionModalReducer = collectionModalSlice.reducer;
