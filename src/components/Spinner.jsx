import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
function Spinner () {
  return (
    <div className='loadingSpinnerContainer'>
      <div className='loadingSpinner'></div>
    </div>
  )
}

export default Spinner
