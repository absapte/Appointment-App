import { createContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import axios from "axios"

export const AppContext = createContext()

const AppContextProvider = ({ children }) => {

  const currencySymbol = "₹"
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [doctors, setDoctors] = useState([])
  const [token, setToken] = useState(localStorage.getItem("token") || "")
  const [userData, setUserData] = useState(false)

  // ✅ Safety check (prevents undefined/api/... errors)
  if (!backendUrl) {
    console.error("VITE_BACKEND_URL is not defined")
  }

  // ================= GET DOCTORS =================
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/doctor/list`
      )

      if (data.success) {
        setDoctors(data.doctors)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  // ================= LOAD USER PROFILE =================
  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/get-profile`,
        {
          headers: {
            token: token
          }
        }
      )

      if (data.success) {
        setUserData({
          ...data.userData,
          address: data.userData.address || { line1: "", line2: "" },
          gender: data.userData.gender || "",
          dob: data.userData.dob || ""
        })
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  // ================= EFFECTS =================
  useEffect(() => {
    if (backendUrl) {
      getDoctorsData()
    }
  }, [backendUrl])

  useEffect(() => {
    if (token && backendUrl) {
      loadUserProfileData()
    }
  }, [token, backendUrl])

  // ================= CONTEXT VALUE =================
  const value = {
    doctors,
    getDoctorsData,
    currencySymbol,
    backendUrl,
    token,
    setToken,
    userData,
    setUserData,
    loadUserProfileData
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
