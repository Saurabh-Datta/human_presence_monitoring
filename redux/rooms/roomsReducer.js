import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: []
};

export const roomsReducer = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        addItem: (state,action) => {
            state.list = [...state.list, action.payload];
        },
        removeItem: (state,action) => {
            const newState = state.list.filter(item => {return item.id!==action.payload})
            state.list = newState;
        },
        editItem: (state,action) => {
            let searchState = state.list.filter(item => {return item.id===action.payload.id});
            const newState = state.list.filter(item => {return item.id!==action.payload.id});
            searchState = action.payload.data;
            state.list = [...newState,searchState];
        },
        setItem: (state,action) => {
            state.list = action.payload;
        },
    }
});

export const { addItem, removeItem, editItem, setItem } = roomsReducer.actions;
export const selectRooms = (state) => state.rooms.list;
export default roomsReducer.reducer;