import './profilePic.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const ProfilePic = () => {

    return(
        <div>
            <FontAwesomeIcon icon={faUser} className='profileComp1'/>
        </div>
    )
}

export default ProfilePic;