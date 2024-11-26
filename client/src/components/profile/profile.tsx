import './profile.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {

    return(
        <div>
            <FontAwesomeIcon icon={faUser} className='profileComp'/>
        </div>
    )
}

export default Profile;