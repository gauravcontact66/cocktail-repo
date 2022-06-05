import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cocktails: [],
  cocktail: [],
  loading: false,
  error: null,
};

//#1: Fetch all cosktails
export const fetchCocktails = createAsyncThunk(
  "cocktails/fetchCocktails",
  async () => {
    return fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
    ).then((res) => res.json());
  }
);

//#2: Fetch single cocktail with specific id passed
export const fetchSingleCocktail = createAsyncThunk(
  "cocktails/fetchSingleCocktail",
  async ({ id }) => {
    return fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    ).then((res) => res.json());
  }
);

//#3: Searching the cocktail
export const fetchSearchCocktail = createAsyncThunk(
  "cocktails/fetchSearchCocktail",
  async ({ searchText }) => {
    return fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${searchText}`
    ).then((res) => res.json());
  }
);

const cocktailSlice = createSlice({
  name: "cocktails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //#1: Fetch all cocktail
    builder.addCase(fetchCocktails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCocktails.fulfilled, (state, action) => {
      state.loading = false;
      state.cocktails = action.payload.drinks;
      state.error = "";
    });
    builder.addCase(fetchCocktails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //#2: Fetch single cocktail
    builder.addCase(fetchSingleCocktail.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchSingleCocktail.fulfilled, (state, action) => {
      state.loading = false;
      state.cocktail = action.payload.drinks;
      state.error = "";
    });
    builder.addCase(fetchSingleCocktail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //#3: Fetch search cocktail
    builder.addCase(fetchSearchCocktail.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchSearchCocktail.fulfilled, (state, action) => {
      state.loading = false;
      state.cocktails = action.payload.drinks;
      state.error = "";
    });
    builder.addCase(fetchSearchCocktail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default cocktailSlice.reducer;
