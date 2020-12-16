const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./src/dbfolder/db");

const PORT = process.env.PORT;

app.use(cors());

app.use(express.json());

app.post("/hotdogs", async (req, res) => {
  console.log(req.body);
  try {
    const { name, img, price, amount, info } = req.body;

    const newGoodsRow = await pool.query(
      "INSERT INTO goods(name, img, price, amount, info) VALUES($1, $2, $3, $4, $5) RETURNING * ;",
      [name, img, price, amount, info]
    );
    res.json(newGoodsRow.rows[0]);
  } catch (err) {
    res.json(err.message);
    console.error(err.message);
  }
});

app.get("/hotdogs", async (req, res) => {
  try {
    const allGoods = await pool.query("SELECT * FROM goods;");
    res.json(allGoods.rows);
  } catch (err) {
    res.json(err.message);
    console.log(err);
  }
});

app.get("/hotdogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const goods = await pool.query("SELECT * FROM goods WHERE id = $1", [id]);
    res.json(goods.rows[0]);
  } catch (err) {
    res.json(err.message);
    console.error(err.message);
  }
});

app.put("/hotdogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, img, price, amount, info } = req.body;
    const updateGoods = await pool.query(
      "UPDATE goods SET name = $1, img = $2, price = $3, amount = $4 , info=$5 WHERE id = $6",
      [name, img, price, amount, info, id]
    );
    res.json("Gods were  updated!");
  } catch (err) {
    res.json(err.message);
    console.error(err.message);
  }
});

app.delete("/hotdogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteGoods = await pool.query("DELETE FROM goods WHERE id = $1", [
      id
    ]);
    res.json("Goods was deleted!");
  } catch (err) {
    res.json(err.message);
    console.log(err.message);
  }
});

app.listen(PORT, () => {
  pool.query(
    // "DROP TABLE  goods;",
    "CREATE TABLE goods ( id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(), name TEXT NOT NULL, img TEXT NOT NULL, price  TEXT NOT NULL, amount INT NOT NULL, info  TEXT NOT NULL );",
    (err, res) => {
      if (err) {
        console.log(err.message);
        console.log("Table is exist");
      } else {
        console.log(res);
      }
      // client.end();
    }
  );

  //console.log(client);
  console.log("server has started on port 5000");
});
