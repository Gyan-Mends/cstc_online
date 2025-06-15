import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// User Schema (matching your app structure)
const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'staff'],
        default: 'admin',
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', UserSchema);

async function createAdminUser() {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb://localhost:27017/Addentech', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log('Connected to MongoDB');

        // Admin user details
        const adminData = {
            fullName: 'System Administrator',
            email: 'admin@csts.com',
            phone: '+233123456789',
            position: 'System Administrator',
            role: 'admin',
            password: 'admin123', // You can change this password
            image: ''
        };

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: adminData.email });
        if (existingAdmin) {
            console.log('Admin user already exists with email:', adminData.email);
            console.log('Existing admin details:');
            console.log('- Name:', existingAdmin.fullName);
            console.log('- Email:', existingAdmin.email);
            console.log('- Role:', existingAdmin.role);
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(adminData.password, 10);

        // Create admin user
        const adminUser = new User({
            ...adminData,
            password: hashedPassword
        });

        await adminUser.save();

        console.log('✅ Admin user created successfully!');
        console.log('📧 Email:', adminData.email);
        console.log('🔑 Password:', adminData.password);
        console.log('👤 Role:', adminData.role);
        console.log('');
        console.log('⚠️  Please change the password after first login for security!');

    } catch (error) {
        console.error('❌ Error creating admin user:', error.message);
        
        if (error.code === 11000) {
            console.log('Admin user with this email already exists.');
        }
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

// Run the script
createAdminUser(); 