export const setJwtToken = (state, payload) => {
  state.jwtToken = payload;
};
export const clearJwtToken = (state) => {
  state.jwtToken = "";
};
