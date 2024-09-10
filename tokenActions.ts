/* eslint-disable */
const actions = {
  storeToken: payload => ({
    type: 'STORE_ID_TOKEN',
    payload: payload
  }),

  storeFullName: payload => ({
    type: 'STORE_FULLNAME',
    payload: payload
  })
};
export default actions;
