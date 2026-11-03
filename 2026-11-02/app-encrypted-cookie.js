const express = require('express');
const cookieParser = require('cookie-parser');
const { encryptCookieNodeMiddleware } = require('encrypt-cookie');
const crypto = require('crypto');

const app = express();
const port = 3000;

// ⚠️ IMPORTANT: These keys MUST be strong, securely generated, and kept secret.
// They should be loaded from environment variables (e.g., process.env.SECRET_KEY).
const SIGNATURE_SECRET = crypto.randomBytes(32).toString('hex'); // Used for cookie signing
const ENCRYPTION_SECRET = crypto.randomBytes(32).toString('hex'); // Used for cookie encryption

//Init
app.use(cookieParser(SIGNATURE_SECRET));
app.use(encryptCookieNodeMiddleware(ENCRYPTION_SECRET));

// --- Route to Set an Encrypted Cookie ---
app.get('/set', (req, res) => {
	const sensitiveData = {
		userId: 12345,
		role: 'admin',
		lastLogin: new Date().toISOString()
	};

	res.cookie('auth_data', sensitiveData, {
		maxAge: 900000, // 15 minutes
		httpOnly: true, // Crucial: Prevents client-side JavaScript access
		signed: false,   // Recommended: Also use signing to prevent tampering; Generally only work with (HTTPs)
		secure: false,   // Crucial: Only send cookie over HTTPS (use only in production or with a self-signed cert)
		sameSite: 'strict'
	});

	res.send('Encrypted cookie set. Check your browser\'s storage; the value should be unreadable.');
});

// --- Route to Read and Decrypt the Cookie ---
app.get('/get', (req, res) => {
	const authData = req.cookies.auth_data;

	if (authData) {
		res.json({
			message: 'Successfully decrypted cookie',
			decryptedData: authData
		});
	} else {
		res.status(401).send('No encrypted cookie found or could not be decrypted.');
	}
});

// --- Route to Clear the Cookie ---
app.get('/clear', (req, res) => {
	res.clearCookie('auth_data');
	res.send('Cookie cleared.');
});

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
	console.log('Signature Secret:', SIGNATURE_SECRET);
	console.log('Encryption Secret:', ENCRYPTION_SECRET);
});
