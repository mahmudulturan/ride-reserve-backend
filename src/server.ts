import app from "./app"
import configs from "./app/configs"
import mongoose from 'mongoose'

async function main() {
    try {
        await mongoose.connect(configs.db_url as string);
        app.listen(configs.port, () => {
            console.log(`Ride Reserve Server is running on ${configs.port}`)
        })
    } catch (error) {
        console.log(error);
    }
}



main();