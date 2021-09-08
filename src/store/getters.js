export const isAuthenticated = (state) => {
  return state.jwtToken !== "";
};
