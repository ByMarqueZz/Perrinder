import { createSlice } from "@reduxjs/toolkit";

// const initial_state = 'http://127.0.0.1:5000'
// const initial_state = 'http://192.168.9.84:5000' //wifi clase
// const initial_state = 'http://192.168.208.127:5000'// cable 
// const initial_state = 'http://192.168.8.148:5000'
// const initial_state = 'http://192.168.1.163:8000'
const initial_state = 'https://webview.granada.ai:8000'

export const urlSlice = createSlice({
    name: 'url',
    initialState: initial_state,
    reducers: {},
});