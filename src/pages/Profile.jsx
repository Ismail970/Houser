import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getAuth, updateProfile } from "firebase/auth"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase.config"
import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg"
import homeIcon from "../assets/svg/homeIcon.svg"

function Profile () {
  const auth = getAuth()

  const [changeDetails, setChangeDetails] = useState(false)

  const [formData, setformData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })

  const { name, email } = formData

  const navigate = useNavigate()

  const onLogout = () => {
    auth.signOut()
    navigate("/")
  }

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // update name
        await updateProfile(auth.currentUser, {
          displayName: name
        })

        // update in firestore
        const userRef = doc(db, "users", auth.currentUser.uid)
        await updateDoc(userRef, {
          name: name
        })
      }
    } catch (error) {
      toast.error("Couls not update profile details.")
    }
  }

  const onChange = e => {
    setformData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  return (
    <div className='profile'>
      <header className='profileHeader'>
        <p className='pageHeader'>My Profile</p>
        <button
          className='logOut'
          type='button'
          onClick={onLogout}
        >
          Logout
        </button>
      </header>
      <main>
        <div className='profileDetailsHeader'>
          <p className="profileDetailsText">Personal Details</p>
          <p
            className='changePersonalDetails'
            onClick={() => {
              changeDetails && onSubmit()
              setChangeDetails(prevState => !prevState)
            }}
          >
            {changeDetails ? "Done" : "Change"}
          </p>
        </div>

        <div className='profileCard'>
          <form>
            <input
              type="text"
              id='name'
              className={
                !changeDetails
                  ? "profileName"
                  : "profileNameActive"
              }
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
            <input
              type="email"
              id='email'
              className={
                !changeDetails
                  ? "profileEmail"
                  : "profileEmailActive"
              }
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />
          </form>
        </div>

        <Link to="/create-listing" className="createListing">
          <img src={homeIcon} alt='home'/>
          <p>Sell or rent your home</p>
          <img src={arrowRight} alt='arrow right'/>
        </Link>
      </main>
    </div>
  )
}

export default Profile
