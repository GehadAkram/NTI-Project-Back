const express = require('express');
const connectDB = require('./config/db.config');
const cors = require('cors')
const orderStateRouter = require('./routers/orderState.router');
const superCategoryRouter = require('./routers/supercategory.router');
const categoryRouter = require('./routers/category.router');
const productRouter = require('./routers/product.router');
const userRouter = require('./routers/user.router');
const wishlistRouter = require('./routers/wishlist.router');
const orderRouter = require('./routers/order.router');

const port = 3000;

const app = express();
app.use(cors({origin:'http://localhost:4200'}));
app.use(express.json());

connectDB(); 

app.use('/images', express.static('./imgs'));
app.use('/orderState', orderStateRouter);
app.use('/supercategory', superCategoryRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/user', userRouter);
app.use('/wishlist', wishlistRouter);
app.use('/order', orderRouter);

app.listen(port, ()=>{console.log(`server started at port ${port}`)})