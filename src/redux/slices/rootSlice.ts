import { createSlice } from '@reduxjs/toolkit'

const rootSlice = createSlice({
    name: "root",
    initialState: {
        name: 'Iron Man',
        price: "12.00",
        description: "Original",
        director: 'Jon Favreau',
        budget: '$40 million',
        rating: 'PG-13',
        runtime: '126 min',
        release_date: 'Jan 1, 1999',
    },
    reducers: {
        chooseName: (state, action) => { state.name = action.payload},
        choosePrice: (state, action) => { state.price = action.payload},
        chooseDescription: (state, action) => { state.description = action.payload},
        chooseDirector: (state, action) => { state.director = action.payload},
        chooseBudget: (state, action) => { state.budget = action.payload},
        chooseRating: (state, action) => { state.rating = action.payload},
        chooseReleaseDate: (state, action) => { state.release_date = action.payload},
        chooseRuntime: (state, action) => { state.runtime = action.payload},
    }
})

// Export Reducers
export const reducer = rootSlice.reducer;
export const { chooseName, choosePrice, chooseDescription, chooseDirector, chooseBudget, chooseRating, chooseReleaseDate, chooseRuntime } = rootSlice.actions