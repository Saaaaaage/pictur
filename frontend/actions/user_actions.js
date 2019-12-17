import * as UserApiUtil from '../util/user_api_util';

// export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_USER_ERRORS = 'RECEIVE_USER_ERRORS';

// const receiveUsers = users => ({
//   type: RECEIVE_USERS,
//   users
// });

const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

// export const fetchUsers = () => dispatch => UserApiUtil.getUsers()
//   .then(
//     users => dispatch(receiveUsers(users)),
//     errors => dispatch(receiveErrors(errors.responseJSON))
//   );

export const fetchUser = userId => dispatch => UserApiUtil.getUser(userId)
  .then(
    user => dispatch(receiveUser(user)),
    errors => dispatch(receiveErrors(errors.responseJSON))
  );
