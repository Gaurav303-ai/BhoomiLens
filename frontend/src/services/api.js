// import axios from 'axios';

// const API = axios.create({
//     baseURL: 'http://localhost:5000/api', 
// });

// // Test Connection
// export const testBackendConnection = async () => {
//     try {
//         const response = await API.get('/health');
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// };

// // --- NAYA FUNCTION: File Upload ke liye ---
// export const uploadDocument = async (file) => {
//     // File bhejne ke liye hamesha FormData use hota hai
//     const formData = new FormData();
//     formData.append('document', file);

//     try {
//         const response = await API.post('/documents/upload', formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         });
//         return response.data;
//     } catch (error) {
//         console.error("Upload Error:", error);
//         throw error;
//     }
// };

// export default API;
import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8000/api/users', // Port 3000 aur /api/users set kar diya hai
});

// Test Connection
export const testBackendConnection = async () => {
    try {
        const response = await API.get('/health');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// File Upload ke liye function
export const uploadDocument = async (file) => {
    const formData = new FormData();
    formData.append('document', file);

    try {
        // Yeh request ab http://localhost:3000/api/users/documents/upload par jayegi
        const response = await API.post('/documents/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Upload Error:", error);
        throw error;
    }
};

export default API;