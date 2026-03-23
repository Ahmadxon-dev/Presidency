require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT
const cors = require('cors');
const cloudinary = require("cloudinary").v2
const { rateLimit } = require("express-rate-limit")

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
	limit: 160, // Limit each IP to 100 requests per `window` (here, per 10 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
	// store: ... , // Redis, Memcached, etc. See below.
})
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  // Your Cloudinary cloud name
    api_key: process.env.CLOUDINARY_API_KEY,        // Your Cloudinary API key
    api_secret: process.env.CLOUDINARY_API_SECRET   // Your Cloudinary API secret
});
//Middleware
app.use(cors({
    origin:"*",
    credentials:true,
    optionsSuccessStatus: 200,
}))
app.use(express.json({limit: "1mb"}))
app.use(express.urlencoded({ extended: false }))
// app.use(limiter)
//routes
app.use('/auth', require('./routes/auth.route'))
app.use('/class', require('./routes/class.route'))
app.use('/news', require("./routes/news.route"))
app.use("/events", require("./routes/event.route"))
app.use("/shop", require("./routes/shop.route"))
app.use("/admin", require("./routes/admin.route"))
app.use("/request", require("./routes/request.route"))
app.use("/transaction", require("./routes/transaction.route"))
app.use((req, res) => res.status(404).json({ error: 'Page not found' }))

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('mongodb connected')
        app.listen(PORT, () => console.log(`Server started`))
    })
    .catch((err) => {
        console.error(err.message)
    })
