 
const bcrypt = require("bcryptjs");

let users = []; // Temporary storage (use a database in production)

exports.signup = async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword });
    res.json({ message: "User registered successfully!" });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    
    if (user && await bcrypt.compare(password, user.password)) {
        res.json({ message: "Login successful!" });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
};
