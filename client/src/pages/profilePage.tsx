import ProfilePic from "../components/profilePic/profilePic";
import '../styles/profilePage.css'
const ProfilePage = () => {

  return (
    <div>
      <div className="profile-container">

      <div className="profile-pic">
        <ProfilePic />
      </div>
      <button data-bs-toggle="modal" data-bs-target="#profilePicModal" className="change">Change profile picture</button>
      </div>


<div className="modal fade" id="profilePicModal" tabIndex={-1} aria-labelledby="profilePicModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="profilePicModalLabel">Edit profile <picture></picture></h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <input type="file" className="form-control" accept="image/*" />
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Save profile picture</button>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default ProfilePage;