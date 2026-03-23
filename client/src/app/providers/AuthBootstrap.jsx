import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { logout, setCredentials } from "../../features/auth/authSlice.js"
import { extractUserFromToken } from "./../../features/auth/authHelpers"
import { fetchProfile } from "../../api/auth.js"

const PUBLIC_PATHS = ["/signin"]

const AuthBootstrap = ({ children }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    useEffect(() => {
        async function checkToken() {
            const token = localStorage.getItem("token")

            if (!token) {
                if (!PUBLIC_PATHS.includes(location.pathname)) {
                    navigate("/signin", { replace: true })
                }
                return
            }
            try {
                const decoded = jwtDecode(token)
                dispatch(
                    setCredentials({
                        user: extractUserFromToken(decoded)
                    })
                )
                // Verify token with backend
                const fetchProfileData = await fetchProfile(token)
                dispatch(setCredentials(fetchProfileData))
            } catch (e) {
                dispatch(logout())
                if (location.pathname !== "/signin") {
                    navigate("/signin", { replace: true })
                }
            }
        }

        checkToken()
    }, [dispatch, navigate, location.pathname])

    return children
}

export default AuthBootstrap
