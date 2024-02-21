const jwt = require('jsonwebtoken');
const userModel = require('../models/User');
const accountModel = require('../models/Account');
const companyModel = require('../models/Company');

const validateToken = async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Missing token or user not authorized' });
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                // Token has expired, try to refresh it
                const refreshToken = req.cookies.refreshToken;

                if (!refreshToken) {
                    return res.status(401).json({ error: 'User is not authorized' });
                }

                jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
                    if (err) {
                        // Check if the error is due to token expiration
                        if (err.name === 'TokenExpiredError') {
                            // Token has expired, handle accordingly
                            return res.status(200).json({ expired: true });
                        } else {
                            // Some other error occurred (e.g., invalid token)
                            return res.status(403).json({ error: 'Invalid refresh token' });
                        }
                    }

                    const accountIdDecoded = decoded.accountId;
                    const account = await accountModel.findOne({ _id: accountIdDecoded });

                    if (!account) {
                        return res.status(404).json({ error: 'Account Not Found', id: accountIdDecoded });
                    }

                    let name, role, id;

                    if (account.role == 1) {
                        id = account.userId;
                        const user = await userModel.findOne({ _id: id });
                        name = user.Fname + ' ' + user.Lname;
                        role = 1;
                    } else if (account.role == 2) {
                        id = account.companyId;
                        const company = await companyModel.findOne({ _id: id });
                        name = company.name;
                        role = 2;
                    } else {
                        id = account._Id;
                        name = 'Admin';
                        role = 0;
                    }

                    // Generate a new access token
                    const newAccessToken = jwt.sign(
                        {
                            //payload
                            user: {
                                username: name,
                                email: account.email,
                                id: id,
                                role: role,
                            },
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '1m' }
                    );

                    // Set the new access token in the response
                    res.setHeader('Access-Control-Expose-Headers', 'New-Access-Token');
                    res.setHeader('New-Access-Token', newAccessToken);

                    // Set the new access token in the request
                    req.user = {
                        username: name,
                        email: account.email,
                        id: id,
                        role: role,
                    };
                    req.newAccessToken = newAccessToken;
                    next();
                });
            } else {
                // Access token is valid, set the user in the request
                req.user = decoded.user;
                next();
            }
        });
    } else {
        return res.status(401).json({ error: 'User is not authorized'});
    }
};

module.exports = validateToken;