import express from "express";
import { scryptSync, randomBytes, timingSafeEqual } from "crypto";
import pg from "pg";
import cors from "cors";

const { Client } = pg;
const port = process.env.PORT || 3000;

const con = new Client({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
});

con.connect().then((error) => {
  if (error) {
    console.log(`Error conecting to the database: ${error}`);
  } else {
    console.log("Sucessfully connected to the database");
  }
});

function hash(password) {
  if (!password) return false;
  const salt = randomBytes(16).toString("hex");
  const hashedPassword = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hashedPassword}`;
}

const app = express();

app.use(cors());
app.use(express.json());

app.get("/users", (req, res) => {
  const query = "SELECT * FROM users";
  con.query(query, (error, result) => {
    if (error)
      return res
        .status(500)
        .json({ msg: `Error selecting from users: ${error}` });
    res.status(200).json(result.rows);
  });
});

app.post("/users", (req, res) => {
  const { username, email, password } = req.body;
  if (username && email && password) {
    const query =
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
    const hashedPassword = hash(password);
    con.query(query, [username, email, hashedPassword], (error, result) => {
      if (error)
        return res
          .status(500)
          .json({ msg: `Error inserting into users: ${error}` });
      res
        .status(201)
        .json({
          msg: `sucessfully created user with username: ${username}, email: ${email}`,
        });
    });
  } else {
    return res
      .status(400)
      .json({ msg: `bad request, missing body components: ${JSON.stringify(req.body)}` });
  }
});

app.post("/users/login", (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const selectQuery = "SELECT * FROM users WHERE email = $1 LIMIT 1";
    con.query(selectQuery, [email], (error, result) => {
      if (error)
        return res
          .status(500)
          .json({ msg: `Error getting user with email: ${email}: ${error}` });
      if (result.rowCount < 1)
        return res
          .status(404)
          .json({ msg: `No user found with email: ${email}` });
      const [salt, key] = result.rows[0].password.split(":");
      const hashedBuffer = scryptSync(password, salt, 64);
      const keyBuffer = Buffer.from(key, "hex");
      if (timingSafeEqual(hashedBuffer, keyBuffer)) {
        res.status(200).json({user: result.rows[0]});
      } else {
        res.status(400).json({ msg: `Wrong password` });
      }
    });
  } else {
    return res
      .status(400)
      .json({ msg: `Bad request, missing body components ${JSON.stringify(req.body)}` });
  }
});

app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
