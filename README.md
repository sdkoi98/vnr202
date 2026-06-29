# Chương 2 (1954 – 1975)

Website minh họa Chương 2 — *Đảng lãnh đạo xây dựng chủ nghĩa xã hội ở miền Bắc và kháng chiến chống Mỹ, giải phóng miền Nam, thống nhất đất nước*.

Xây dựng bằng **React + Vite**, sẵn sàng deploy lên **Vercel**.

## Chạy ở máy local

```bash
npm install
npm run dev      # mở http://localhost:5173
```

## Build production

```bash
npm run build    # xuất ra thư mục dist/
npm run preview  # xem thử bản build
```

## Deploy lên Vercel

### Cách 1 — Qua giao diện web (khuyên dùng)

1. Push code lên GitHub (đã xong nếu bạn đọc được file này trên repo).
2. Vào https://vercel.com → **Add New… → Project**.
3. Chọn repository `vnr202` và bấm **Import**.
4. Vercel tự nhận diện Vite. Giữ nguyên các thiết lập mặc định:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Bấm **Deploy**. Sau ~1 phút sẽ có link `https://<tên-project>.vercel.app`.

### Cách 2 — Qua Vercel CLI

```bash
npm i -g vercel
vercel          # deploy preview
vercel --prod   # deploy production
```

## Cấu trúc

```
index.html          # điểm vào HTML
main.jsx            # mount React
App.jsx             # toàn bộ website (nhiều trang, điều hướng bằng state)
index.css           # reset CSS nhỏ
vite.config.js      # cấu hình Vite
vercel.json         # cấu hình deploy Vercel
package.json        # dependencies
```
