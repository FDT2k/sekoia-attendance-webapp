



export const userListSelector = state=> state.users.list;

export const makeAttendanceSelector = user_id => state=> state.users.attendances[user_id];
export const makeFilteredUserSelector= displayOnlyPresents => state=> state.users.list.filter( item =>  !displayOnlyPresents ||  item.attendance_state == 'checked_in')
