export default class AuthChecker {
    static logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
    }
    
    static isAuthenticated() {
        const token = localStorage.getItem('token')
        return !!token
    }
    
    static isAdmin() {
        const role = localStorage.getItem('role')
        return role === 'ADMIN'
    }
    
    static isUser() {
        const role = localStorage.getItem('role')
        return role === 'USER'
    }
}