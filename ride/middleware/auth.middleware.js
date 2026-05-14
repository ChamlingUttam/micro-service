const jwt = require('jsonwebtoken');
const axios = require('axios');

module.exports.userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        try {
            jwt.verify(token, process.env.JWT_SECRET);
        } catch (jwtError) {
            return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
        }

        // ✅ Calling user service DIRECTLY — not through gateway
        const response = await axios.get('http://127.0.0.1:3001/api/auth/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        //  const response = await axios.get(`BASE_URL/user/api/auth/me`, {
        //     headers: {
        //         Authorization: `Bearer ${token}`
        //     }
        // });

        console.log('STATUS:', response.status);
        console.log('DATA:', response.data);

        const user = response.data;

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }

        req.user = user;
        next();

    } catch (error) {
        console.log('CATCH ERROR:', error.message);
        console.log('CATCH RESPONSE:', error.response?.data);

        if (error.response?.status === 401) {
            return res.status(401).json({ message: 'Unauthorized: User service rejected token' });
        }
        res.status(500).json({ message: `Auth error: ${error.message}` });
    }
};

module.exports.captainAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        try {
            jwt.verify(token, process.env.JWT_SECRET);
        } catch (jwtError) {
            return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
        }

        // ✅ Calling captain service DIRECTLY — not through gateway
        const response = await axios.get('http://127.0.0.1:3002/api/auth/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log('CAPTAIN STATUS:', response.status);
        console.log('CAPTAIN DATA:', response.data);

        const captain = response.data;

        if (!captain) {
            return res.status(401).json({ message: 'Unauthorized: Captain not found' });
        }

        req.captain = captain;
        next();

    } catch (error) {
        console.log('CAPTAIN CATCH ERROR:', error.message);
        console.log('CAPTAIN CATCH RESPONSE:', error.response?.data);

        if (error.response?.status === 401) {
            return res.status(401).json({ message: 'Unauthorized: Captain service rejected token' });
        }
        res.status(500).json({ message: `Auth error: ${error.message}` });
    }
};