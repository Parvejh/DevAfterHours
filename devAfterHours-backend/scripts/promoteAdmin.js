require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../Models/User');

// -- This one-purpose script is the explicit way to grant the first existing user admin access.
const email = process.argv[2]?.trim();

if (!email) {
    console.error('Usage: npm run promote-admin -- email@example.com');
    process.exit(1);
}

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const promoteAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        // -- Match the supplied email exactly (case-insensitively) before granting admin access.
        const user = await User.findOneAndUpdate(
            { email: new RegExp(`^${escapeRegExp(email)}$`, 'i') },
            { $set: { isAdmin: true } },
            { new: true }
        );

        if (!user) {
            throw new Error('No user was found with that email address.');
        }

        console.log(`Admin access granted to ${user.email}.`);
    } catch (error) {
        console.error(`Unable to promote admin: ${error.message}`);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
};

promoteAdmin();
