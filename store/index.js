export const state = () => ({
    twitchToken: false,
});

export const getters = {
    getStoredToken: (state) => {
        return state.twitchToken;
    }
};