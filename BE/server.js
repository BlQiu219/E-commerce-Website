import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRoute from './routes/productRoute.js'
import cartRoute from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//App Config
const app = express()
const port = process.env.PORT || 8386
connectDB()
connectCloudinary()

// Cấu hình để phục vụ tệp tĩnh từ thư mục 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//middlewares
app.use(express.json())
app.use(cors())

//api endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/order', orderRouter)


app.get('/', (req, res) => {
    res.send("API Working")
})


app.listen(port, () => console.log('Server started on PORT: ' + port))
