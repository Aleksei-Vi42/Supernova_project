import React from 'react'
import classes from './Friends.module.css'
import * as axios from 'axios'
import userPhoto from '../../Assets/images/av2.png'


 const Friends = (props) => {
  if(props.users.length === 0) {
      axios.get('https://social-network.samuraijs.com/api/1.0/users')
          .then(response => {
           props.setUsers(response.data.items)
          })
  }
    return (
    <div>
        {
          props.users.map( u =>  <div key={u.id} className={classes.user}>
                <div>
                    <div>
                        <img src={u.photos.small != null ? u.photos.small : userPhoto} className={classes.userPhoto}/>
                    </div>
                    <div>
                        { u.followed
                            ? <button onClick={() => { props.unfollowed(u.id)} }>Unfollow</button>
                            : <button onClick={() => { props.followed(u.id)} }>Follow</button>
                                }
                    </div>

                </div>
                <div className={classes.description}>
                    <div>
                        <div>
                            {u.name}
                        </div>
                        <div>
                            {u.status}
                        </div>
                    </div>
                    <div>
                        <div>
                            {"u.location.country"}
                        </div>
                        <div>
                            {"u.location.sity"}
                        </div>
                    </div>
                </div>
            </div>)
        }
    </div>

)}
export default Friends