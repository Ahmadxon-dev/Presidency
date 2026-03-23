export function extractUserFromToken(decoded) {
    const baseUser = {
        id: decoded.id,
        name: decoded.name,
        role: decoded.role,
        coins: decoded.coins,
        login: decoded.login
    }
    if (decoded.classId) {
        return {
            ...baseUser,
            classId: decoded.classId,
            phoneNumber: decoded.phoneNumber,
            tgUserName: decoded.tgUserName,
            email: decoded.email
        }
    }
    return baseUser
}
