const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const supabase = require('./config/db.js');
dotenv.config();

// routing import here 
const authRoutes = require('./routes/authRoutes.js');
const onboardingRoutes = require('./routes/onboarding.routes.js');
const doctorRoutes = require('./routes/doctor.routes.js')




const PORT =  process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/api/auth', authRoutes);
app.use('/api/onboarding', onboardingRoutes);
app.use('/api/doctor',doctorRoutes)


// I have check supabase is connected or not 
app.get('/api/supabase', async (req, res) => {
    const { data, error } = await supabase.from('users').select('*');
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    return res.status(200).json(data);
});




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});