# MoonReel Studio — Dockerfile untuk Dokploy LABS (ARM64)
# Satu image dipakai 3 layanan di compose.dokploy.yaml:
#   web (pnpm start, port 3000), worker (pnpm exec tsx src/worker/index.ts),
#   db-migrate (drizzle-kit push + seed, sekali jalan).
# muse2api TIDAK dijalankan di sini — dipakai muse2api yang sudah live di
# https://muse2api.masyamin.biz.id (lihat MUSE2API_BASE_URL di compose).
FROM node:22-bookworm-slim

# FFmpeg + ffprobe (wajib untuk render worker), git untuk pnpm.
RUN apt-get update \
  && apt-get install -y --no-install-recommends ffmpeg ca-certificates git \
  && rm -rf /var/lib/apt/lists/*

RUN corepack enable && corepack prepare pnpm@9.15.3 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

# Build Next.js. Env dummy di sini hanya supaya build tidak gagal karena
# env() diparse; nilai runtime yang asli datang dari env Dokploy.
# JANGAN isi key asli di sini.
ENV NODE_ENV=production \
    DATABASE_URL=postgres://moonreel:moonreel@postgres:5432/moonreel \
    MUSE2API_KEY=build-only-dummy \
    MUSE2API_BASE_URL=https://muse2api.masyamin.biz.id
RUN pnpm build

ENV PORT=3000 \
    HOSTNAME=0.0.0.0 \
    STORAGE_DIR=/app/storage \
    NICHES_DIR=/app/niches

EXPOSE 3000

CMD ["pnpm", "start"]
