import app from "./app";
import { dataSource} from "./config/data-source";

const PORT = 4000;

dataSource.initialize()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
})
.catch((error) => {
    console.log(error)
})
