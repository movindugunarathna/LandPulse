import bcrypt from "bcryptjs";

// Hashing a Password
export async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(10); // generate salt
        const hash = await bcrypt.hash(password, salt); // hash the password with the generated salt
        return hash;
    } catch (error) {
        throw new Error("Error hashing password");
    }
}

// Comparing Passwords
export async function comparePasswords(plainPassword, hashedPassword) {
    try {
        const match = await bcrypt.compare(plainPassword, hashedPassword);
        match
            ? console.log("Passwords Match Successfully")
            : console.error("Passwords Match Failure");
        return match;
    } catch (error) {
        console.log(error);
        throw new Error("Error comparing passwords");
    }
}
