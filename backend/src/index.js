const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const pg = require("pg");
require("dotenv").config();
const multer = require("multer");
const pool = new pg.Pool(
//doldurulacak
)

const app = express();
app.use(express.json());
app.use(cors());
const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT;
// Gerçek projede burası MongoDB veya PostgreSQL olacak.
const users = [];

// --- KAYIT OL (REGISTER) ---
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. Kullanıcı zaten var mı?
        const userExists = users.find(u => u.email === email);
        if (userExists) {
            return res.status(400).json({ message: "Bu email zaten kayıtlı." });
        }

        // 2. Şifreyi şifrele (Hashing)
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Kullanıcıyı kaydet
        const newUser = { id: Date.now(), name, email, password: hashedPassword }; //id count+1 olacak
        users.push(newUser);

        res.status(201).json({ message: "Kayıt başarıyla oluşturuldu." });
    } catch (error) {
        res.status(500).json({ message: "Sunucu hatası." });
    }
});

// --- GİRİŞ YAP (LOGIN) ---
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Kullanıcıyı bul
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı." });
        }

        // 2. Şifre kontrolü
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Hatalı şifre." });
        }

        // 3. JWT Token Oluştur
        // İçine kullanıcı ID'sini koyuyoruz, 1 gün geçerli olsun
        const token = jwt.sign({ userId: user.id }, JWT_SECRET); //id kısmı handle edilecek

        // 4. Frontend'in beklediği formatta yanıt dön
        res.json({
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Sunucu hatası." });
    }
});


app.get("/api/Home", async (req, res) => {
  try {
    // 1️⃣ Query parametrelerini al
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    // 2️⃣ OFFSET hesapla
    const offset = (page - 1) * limit;

    // 3️⃣ SQL sorgusu
    const query = `
      SELECT
  i.id,
  i.name AS item_name,
  i.image_name AS "ImageName",
  i.price,
  u.profile_pic,
  u.name AS user_name
FROM items i
JOIN users u ON i.user_id = u.id
WHERE i.name ILIKE $1
ORDER BY i.id
LIMIT $2 OFFSET $3;
    `;

    // 4️⃣ Veritabanından çek
    const { rows } = await pool.query(query, [
      `%${search}%`,
      limit,
      offset,
    ]);

    // 5️⃣ Frontend'e direkt array dön
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
});



function takeUserIDMiddleware(req, res, next) {
  // 1️⃣ Header var mı?
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Authorization header yok"
    });
  }

  // 2️⃣ Format doğru mu? → "Bearer TOKEN"
  const parts = authHeader.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({
      message: "Authorization formatı hatalı"
    });
  }

  const token = parts[1];

  // 3️⃣ Token gerçekten var mı?
  if (!token) {
    return res.status(401).json({
      message: "Token yok"
    });
  }

  // 4️⃣ Token doğrulama
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded = { userId: ..., iat, exp? }

    // 5️⃣ Request'e user ekle
    req.user = {
      userId: decoded.userId
    };

    // 6️⃣ Devam et
    next();

  } catch (error) {
    // Token geçersiz / süresi dolmuş
    return res.status(401).json({
      message: "Geçersiz token"
    });
  }
}

app.get("/api/Rental", takeUserIDMiddleware(res,req,next),async (res,req) =>{
    if(!req.query.flag){
        return res.status(500).json({
            message : "Hata: Rental API query parameter almalı"
        })
    }
    const flag = parseInt(req.query.flag);
    const userID = req.user.userId;
    if(flag===1){
        const query = "SELECT name,price,image_name AS imageName FROM items WHERE user_id = $1"
        const {rows} = await pool.query(query,[userID]);
        res.json(rows);
    }
    else{
        const query = "SELECT name,price,image_name AS imageName FROM items WHERE renter_id = $1"
        const {rows} = await pool.query(query,[userID]);
        res.json(rows);
    }
})


app.patch("/api/Profile/MailChange",takeUserIDMiddleware(req,res,next),async (req,res)=>{
        const userID = req.user.userId;
        const query = "UPDATE users SET email = $1 WHERE id = $2";
        await pool.query(query,[req.body.email,userID]);
        res.json({
            message:"mail güncellendi"
        })
})

app.patch("/api/Profile/NameChange",takeUserIDMiddleware(req,res,next),async (req,res)=>{
        const userID = req.user.userId;
        const query = "UPDATE users SET name = $1 WHERE id = $2";
        await pool.query(query,[req.body.name,userID]);
        res.json({
            message:"isim güncellendi"
        })
});

app.get("api/users/address-check",takeUserIDMiddleware(req,res,next),async (req,res)=>{
    const userID = req.user.userId;
    const query = "SELECT * FROM users u adresses a WHERE u.id = a.id AND u.is = $1"
    const {rows} = await pool.query(query,[userID]);
    if(rows.length === 0){
      return res.json({ hasAddress: false });
    }
    else{
      return res.json({hasAddress: true})
    }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname); // benzersiz isim
  },
});

const upload = multer({ storage });

app.post("api/items",upload.single("image"), async (req,res)=>{//burası bakılacak
  const { name, price, description } = req.body;
  const imageName = req.file.filename;

  const query = `
    INSERT INTO items (name, price, description, image_name, user_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;

  const userId = req.user.userId; // token middleware ile gelmeli
  const { rows } = await pool.query(query, [name, price, description, imageName, userId]);

  res.json(rows[0]);


})




// Sunucuyu Başlat
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor...`);
});