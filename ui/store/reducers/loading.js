import { createSlice } from '@reduxjs/toolkit'

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    value: false
  },
  reducers: {
    showLoadingOverlay: state => {
      state.value = true
    },
    hideLoadingOverlay: state => {
      state.value = false
    }
  }
})

export const { showLoadingOverlay, hideLoadingOverlay } = loadingSlice.actions

export default loadingSlice.reducer
