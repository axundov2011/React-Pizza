import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    searchValue: '',
    categoryId : 0,
    currentPage: 1,
    sort: {
        name: "популярности",
        sortProperty: "rating",
    },
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            console.log('action setCategoryId',action);
            state.categoryId = action.payload;
        },
        setSort(state, action){
            state.sort = action.payload
        },
        setsearchValue(state, action) {
            state.searchValue = action.payload
        },
        setCurrentPage(state, action){
            state.currentPage = action.payload
        },
        setFilters(state, action) {
            state.sort = action.payload.sort;
            state.currentPage = Number(action.payload.currentPage);
            state.categoryId = Number(action.payload.categoryId);
        }
    }
}) 


export const {setCategoryId, setSort, setCurrentPage, setFilters, setsearchValue} = filterSlice.actions
export default filterSlice.reducer;