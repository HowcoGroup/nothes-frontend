import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/stores/store';

export interface TitleState {
    value: string
  }
  
  // Define the initial state using that type
  const initialState: TitleState = {
    value: "Nothes"
  }

export const titleSlice = createSlice({
  name: 'title',
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    }
  }
})

export const { setTitle } = titleSlice.actions

export const selectTitle = (state: RootState) => state.title.value

export default titleSlice.reducer