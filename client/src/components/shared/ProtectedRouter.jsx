import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProtectedRouter = ({ children }) => {
    const user = useSelector((state) => state.auth.user)
    const navigate = useNavigate()
    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/')
        }
    }, [user, navigate])

    if (!user || user.role !== 'admin') {
        return null // or a loading spinner
    }

    return children
}

export default ProtectedRouter
