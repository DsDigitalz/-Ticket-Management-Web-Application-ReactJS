// src/api/auth.js

// Mock user database (in a real app, this would be a database call)
const mockUsers = new Map();
// Add a default user for easy testing
mockUsers.set('test@example.com', {
    email: 'test@example.com',
    password: 'password123',
    username: 'TestUser',
    token: 'mock-jwt-token-12345',
});

/**
 * Simulates a successful login request.
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<{token: string, username: string}>}
 */
const login = (email, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = mockUsers.get(email);

            if (!user || user.password !== password) {
                // Use a standard HTTP error code analogy
                return reject(new Error('Invalid email or password (401)'));
            }

            // Success: Return user data (token and username)
            resolve({
                token: user.token,
                username: user.username,
            });
        }, 500); // Simulate network latency
    });
};

/**
 * Simulates user registration.
 * @param {string} email 
 * @param {string} password 
 * @param {string} username
 * @returns {Promise<void>}
 */
const register = (email, password, username) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (mockUsers.has(email)) {
                return reject(new Error('User already exists (409)'));
            }

            // Create a new mock user
            mockUsers.set(email, {
                email,
                password,
                username,
                token: `mock-jwt-token-${Math.random().toString(36).substring(2, 9)}`,
            });
            
            // Success: Registration complete
            resolve();
        }, 700); // Simulate network latency
    });
};


// Export the functions that will be imported by useAuth.js
export const mockAuthApi = {
    login,
    register,
};