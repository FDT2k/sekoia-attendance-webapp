



export const userListSelector = state=> state.users.list;

export const makeAttendanceSelector = user_id => state=> state.users.attendances[user_id];
