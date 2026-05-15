import path from "path";
import fs from "fs";
const filepath = path.join(process.cwd(), './src/database/db.json');
export const readProduct = () => {

    const product = fs.readFileSync(filepath, "utf-8");
    // console.log(product);
    return JSON.parse(product);
}

export const insertProduct = (payload: any) => {
    fs.writeFileSync(filepath, JSON.stringify(payload));

}