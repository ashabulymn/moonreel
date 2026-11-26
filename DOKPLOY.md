# Deploy MoonReel di Dokploy (fork ini)

Panduan deploy fork MoonReel ini di Dokploy LABS, mode **Compose**:
`web` (Next.js :3000) + `worker` (job + FFmpeg render) + `postgres:17`
+ `db-migrate` (sekali jalan). Tanpa muse2api baru.

## Yang dipakai — dan yang tidak

- **muse2api yang dipakai** adalah layanan muse2api yang sudah live di
  https://muse2api.masyamin.biz.id — bukan service `muse2api` di
  `moonreel-studio/docker-compose.yml` bawaan upstream. Service itu TIDAK
  dijalankan di `compose.dokploy.yaml` ini. Alasan: compose bawaan membangun
  muse2api bynne2602 (lama, butuh patch cookie 27 Okt 2026) dan akan bentrok
  port 18610 + pool akun dengan muse2api live. Akun Muse sudah diimpor di
  muse2api live (1 akun, terverifikasi 26 Nov 2026).
- **Kunci yang sama**: `MUSE2API_KEY` di env Dokploy MoonReel = key yang sama
  dengan muse2api live dan muse-canvas. `MUSE2API_BASE_URL` =
  `https://muse2api.masyamin.biz.id` (tanpa `/v1` di akhir).
- **Bahasa UI**: Inggris/Vietnam bawaan upstream (tidak diterjemahkan dulu).
- **Agent / script**: bila `CF_AIG_*` tidak diisi, naskah ditulis Muse lewat
  muse2api (default upstream). ElevenLabs opsional, tidak diisi dulu.

## 1. Fork dulu

Fork `siri2moon/moonreel` ke `ashabulymn/moonreel` (tombol Fork di GitHub;
fork via GitHub App/MCP ditolak 403). Setelah fork jadi, beri akses repo
baru itu ke GitHub App Muse (Settings GitHub) supaya push via konektor bisa
jalan — repo baru tanpa grant akan 404 untuk konektor.

Lalu push file Dokploy ini ke fork (`main`):
- `compose.dokploy.yaml` (root)
- `moonreel-studio/Dockerfile`
- `moonreel-studio/.dockerignore`
- `DOKPLOY.md` (file ini)

## 2. Buat Compose service di Dokploy

1. Di Dokploy, buka project **LABS** → **Create Compose**.
2. Nama: `moonreel`.
3. Source: Git provider, repo `https://github.com/ashabulymn/moonreel`,
   branch `main`.
4. Compose Path: `compose.dokploy.yaml` (di root repo).
5. Domain: `moonreel.masyamin.biz.id`, aktifkan HTTPS (Let's Encrypt),
   arahkan ke service `web` port `3000`.
6. Auto Deploy: OFF (deploy manual setelah perubahan dicek dulu).

## 3. Environment variables

Isi di menu **Environment** Compose Dokploy (jangan tulis key di repo):

| Variabel | Nilai |
| --- | --- |
| `POSTGRES_PASSWORD` | password Postgres baru, kuat dan acak (hanya di Dokploy) |
| `MUSE2API_KEY` | key yang sama dengan muse2api live / muse-canvas (hanya di Dokploy) |

Yang lain sudah tertulis di `compose.dokploy.yaml` (DATABASE_URL internal,
MUSE2API_BASE_URL ke muse2api live, MUSE_CONCURRENCY=1, STORAGE_DIR
`/app/storage`, NICHES_DIR `/app/niches`, TZ Asia/Jakarta).

## 4. Deploy dan verifikasi

1. Klik **Deploy** di Dokploy, tunggu sampai status **Done**. Urutan jalan:
   `postgres` (healthy) → `db-migrate` (push + seed, selesai) →
   `web` + `worker` berjalan.
2. Buka `https://moonreel.masyamin.biz.id/` — harus tampil niche picker
   (4 niche contoh dari seed).
3. Cek sidebar bawah: **Muse connected** (titik hijau). Bila "Muse not
   connected": cek `MUSE2API_BASE_URL`/`MUSE2API_KEY` dan akun di panel
   admin muse2api live masih aktif.
4. Coba satu video pendek (1 ide, 1-2 scene) untuk memastikan
   script → keyframe → clip → render MP4 jalan lewat worker.

## 5. Jika ada masalah

- **`db-migrate` gagal**: cek log-nya; biasanya Postgres belum healthy atau
  `DATABASE_URL` salah. `drizzle-kit push` dan `seed.ts` aman diulang.
- **web restart / build gagal**: cek log build; host LABS ARM64 — image
  `node:22-bookworm-slim` dan `postgres:17-alpine` tersedia untuk ARM64.
- **worker tidak render / `ffmpeg not found`**: FFmpeg diinstal di image;
  cek log worker, pastikan volume `moonreel-storage` terpasang di web dan
  worker.
- **clip gagal 403 / region**: itu per akun muse.ai, bukan MoonReel — coba
  satu klip dulu di muse.ai, lalu Retry di MoonReel (lihat Troubleshooting
  di `moonreel-studio/README.md`).
