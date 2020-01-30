import React from 'react';
import './User.css';

const default_pic = 'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAADP0lEQVR4nO2aW1PbQAxGj+04aUm5pO309v9/Gi+lUyZAoSE390FR7LgOxV7JNtRnJoOZwHr3W61WqxUMDAwMDAwMDAwM/JdEPXp/1lkvekhrE9OVBcTAGDgBUmAJLIBHYNtmR9oWYAJcAFMg4e8lsEJEeEBEcRekTQHeAzNk4FnhU+yLfpQF8B0RwoU2BEiAT8ApMptZjffGiCVcAmuPznkLkABfkbXe1JQjxAKuEIswxVOACPhCPvOhbW2R5fArsK0DYsvGSpxjM3iQZRMDnxFHaoaXACni9Cw9eIYsqZlhm+YC6JI6A0bGbYMIeoIIYYK1AOrhp/iFtgkSRJngsQQmSAc9BFCB1bqCnbilANqZMXmw03s8LMB7awXY7H4Gi+y5DXqxQaJDEzwE2FAv3K2DRoVmYbGlAGqOj+Qmak0E3BWeg/GwgBUyQ9YWEO3avd/9buJkPQR4g2xTHrvAGuNTocc2eIrfNphgPGkeFqDJC68lYJoh8nKC1mksbds8KeJhAa0mNUPxEGCNZG48TprLwrMJHgJkwE/EEqw6GiOi3hbeYYJn3D5F8oGh6Mxf4hBgeZ4F7pGgKFRkDX9dosu+H4b0TGG+9hVvARaEdTpCRFABzIMrbwHuCO/0BseboTYsIMQPROSHKxe8BdgiF50hAvzGMb3WhhOc0yw61Nj/xrQ3JdoQYEwzC2glqeotwBS5GW6KXq6aXYSU8YoEY+Rq7IJ8Kwtp6wG5HTZLhirWAiTAO2TgE+xOhhGyHd4g54FV6TtoKLKVAClyH3i2ey5Xf1ig1SNrRIQ5BttjyPY0QmZ5uvtoHtDTeWloHJMnSPWcsKZBzFBXgDEyy1rdpc6piyRIuZ4oQ4RYIUUUtzzjAFWnVmeGrO0Rea1PH9B+6Fh0Z1sC1+Q5hEqeI0CKlLq8pX6RU5eohcyBHxyZsH8NJAW+YevR2yZGdo8rKkR4KhCKyGtyXurgQfp+Dnyo+vIpAWaElbf1iS35eA44JkC6+4e+ODorPlJa9scE8Lze6ooMWc4HVlAlQISEs69p8IqObU+VAGP8ipy6Rq1gT5UA5jewPSJD/Nu+hrE40GKVl/7xayTmiADKiJcR6ZnwB6Zyqzx8+J9yAAAAAElFTkSuQmCC'

export const UserPic =  (props) =>  {
  const {user} = props;
  const {image_small} = user;
  let pic = image_small || default_pic
  const src = `data:image/jpeg;base64,${pic}`;
    return (<img alt="" src={src}/>)
}

export const UserName =  (props) => {
  const {user} = props;
  const {name} = user;
  return (<p>{name}</p>)
}

export const UserPresence =  (props) => {
  const {user} = props;
  const {attendance_state} = user;
  const present = attendance_state ==='checked_in'
  return (<p>{present ? 'Présent' : 'Absent'}</p>)
}


export const User = (props)  => {
    const {user} = props

    return (
            <div className="user" onClick={props.onClick}>
              <UserPic user={user}/>
              <UserName user={user}/>
              <UserPresence user={user}/>
            </div>
           )
}

export default User;
