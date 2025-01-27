const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.static("uploads"));

// 업로드 디렉토리 확인 및 생성
const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 한글 파일명을 안전하게 처리하는 함수
const sanitizeFileName = (originalName) => {
  const fileExtension = path.extname(originalName); // 파일 확장자 추출
  const baseName = path.basename(originalName, fileExtension); // 확장자를 제외한 파일명

  // 한글 파일명을 UTF-8로 변환 후 URL 안전한 문자열로 변환
  const sanitizedBaseName = Buffer.from(baseName, 'latin1').toString('utf8')
    .replace(/[^a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]/g, "_"); // 특수문자 제거

  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  return `${sanitizedBaseName}-${uniqueSuffix}${fileExtension}`;
};

// 파일 저장 경로 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, sanitizeFileName(file.originalname));
  },
});

const upload = multer({ storage: storage });

// 파일 업로드 엔드포인트
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ error: "No file uploaded" });
  }

  const fileUrl = `http://localhost:3002/files/${req.file.filename}`;
  res.send({ url: fileUrl });
});

// 파일 목록 가져오기
app.get("/files", (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).send({ error: "Failed to list files" });
    }

    const fileUrls = files.map((file) => ({
      filename: file,
      url: `http://localhost:3002/uploads/${encodeURIComponent(file)}`,
    }));

    res.json(fileUrls);
  });
});

// 특정 파일 읽기 및 다운로드
app.get("/files/:filename", (req, res) => {
  const { filename } = req.params;
  const decodedFilename = decodeURIComponent(filename);
  const filePath = path.join(uploadDir, decodedFilename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send({ error: "File not found" });
  }

  res.sendFile(filePath);
});

// 서버 실행
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`File upload server running on http://localhost:${PORT}`);
});
