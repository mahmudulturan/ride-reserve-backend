import app from "./app"
import configs from "./app/configs"



app.listen(configs.port, () => {
    console.log(`Ride Reserve Server is running on ${configs.port}`)
})