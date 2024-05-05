import {createSlice} from "@reduxjs/toolkit"

function getWithExpiry(key) {
    const itemString = localStorage.getItem(key);
    if (!itemString) {
        return null;
    }
    const item = JSON.parse(itemString);
    const now = new Date();
    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }
    return item.value;
}

const initialState = {
    user: getWithExpiry("user"),
    loading: false,
};

const profileSlice = createSlice(
    {
        name:"profile",
        initialState: initialState,
        reducers: {
            setUser(state, value) {
                state.user = value.payload;
            },
            setLoading(state, value) {
                state.loading = value.payload;
            },
        },

    }
)

export const {setUser, setLoading} = profileSlice.actions;
export default profileSlice.reducer;