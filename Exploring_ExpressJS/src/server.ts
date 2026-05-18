import express, { type Application, type Request, type Response } from "express"
import { config } from "./config";
import { Pool } from "pg";
const app: Application = express();
const port = config.port;

//middleware
app.use(express.json());

const pool = new Pool({
    connectionString: config.DBString
});

const initDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(20),
            email VARCHAR(20) UNIQUE NOT NULL,
            password VARCHAR(20) NOT NULL,
            is_active BOOLEAN DEFAULT true,
            age INT,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        )
    `)
        console.log("database connected");
    }
    catch (error) {
        console.log(error);
    }
};
initDB();
app.get('/', (req: Request, res: Response) => {
    // res.send('Hello World!')
    return res.status(200).json({
        message: "Express Server",
        author: "Next Level"
    })
});

//create user api
app.post('/api/users', async (req: Request, res: Response) => {
    // console.log(req.body);
    const { name, email, password, age } = req.body;
    try {
        const result = await pool.query(`
        INSERT INTO users(name,email,password,age)
        VALUES($1,$2,$3,$4) RETURNING *
        `, [name, email, password, age]);
        // console.log(result);
        return res.status(201).json({
            message: "User Created Successfully",
            data: result.rows[0]
        })
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            error
        })
    }
});

//get all user api
app.get('/api/users', async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`
            SELECT * FROM users
            `);

        return res.status(200).json({
            success: true,
            message: "Users retrieve SUccessfully",
            data: result.rows
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
            error
        })
    }
});

//get single user byv their id
app.get('/api/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    // console.log(id)
    try {
        const result = await pool.query(`
            SELECT *  FROM users
            WHERE id=$1
            `, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                // data: result.rows[0]
            })
        }
        return res.status(200).json({
            success: true,
            message: "User retrieve SUccessfully",
            data: result.rows[0]
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
            error
        })
    }
});

app.put('/api/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, password, age, is_active } = req.body;
    // console.log(id,{ name, password, age, is_active });
    try {
        const result = await pool.query(`
        UPDATE users
        SET 
        name=COALESCE($1,name),
        password=COALESCE($2,password),
        age=COALESCE($3,age),
        is_active=COALESCE($4,is_active)
        WHERE id=$5 
        RETURNING * `, [name, password, age, is_active, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                // data: result.rows[0]
            })
        }
        return res.status(200).json({
            success: true,
            message: "User modified Successfully",
            data: result.rows[0]
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
            error
        })
    }


});
app.delete('/api/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await pool.query(`
        DELETE FROM users
        WHERE id=$1 `, [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                // data: result.rows[0]
            })
        }
        return res.status(200).json({
            success: true,
            message: "User Deleted SUccessfully"
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
            error
        })
    }


});

app.listen(port, () => {
    console.log(`My App listening on port ${port}`)
})
