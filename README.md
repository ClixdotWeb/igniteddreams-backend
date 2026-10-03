# IGNITEDDREAMS — Full-Stack Aviation Academy & 7-Day Recording Platform

> A premier Aviation Academy learning management platform engineered with live virtual classrooms, automatic 720p composite recording capture, secure Cloudflare R2 object storage, short-lived signed URL playback & downloads, and a strictly enforced **7-Day Automatic Recording Lifecycle Engine**.

---

## ✈️ System Overview & Core Workflow

The platform conducts live online flight theory classes for enrolled cadets, automatically records those classes, makes recordings available to authorized students, allows students to watch and download the recording, and **automatically deletes the recording after 7 days**.

```
Cadet Registers & Enrolls in Ground Course (e.g. CPL Theory)
               ↓
Cadet Logs In → Student Dashboard
               ↓
View Upcoming Class Departure or "LIVE NOW" Classroom Banner
               ↓
Join Live Virtual Classroom (LiveKit Cloud WebRTC 1080p / 720p)
               ↓
Instructor Starts Class → Backend Starts LiveKit Egress Composite Recording
               ↓
Instructor Concludes Class → Room Terminates → Egress Uploads MP4 to Cloudflare R2
               ↓
Backend Webhook (`POST /api/webhooks/livekit`) Verifies & Saves Metadata
               ↓
Recording Status: READY • availableAt: Now • expiresAt: availableAt + 7 Days
               ↓
Eligible Batch Cadets Notified In-App & in Dashboard
               ↓
Cadet Replays via Custom Video Player (Short-Lived Signed R2 URL, 15m Expiry)
               ↓
Cadet Downloads MP4 (Short-Lived Signed R2 Attachment URL, 5m Expiry)
               ↓
7-Day Expiry Milestone Reached:
  • Playback Disabled Server-Side
  • Download Disabled Server-Side
  • Hourly Background Cron Deletes R2 MP4 Object
  • PostgreSQL Status: DELETED • deletedAt: Recorded • Audit Log Logged
```

---

## 🎨 Visual Identity & Design System

- **Color Distribution**:
  - **70–80% White / Off-white**: `#FFFFFF`, `#F7F7F4`, `#F1F1EE`
  - **15–20% Black / Charcoal**: `#0B0B0B`, `#171717`, `#222222`
  - **5–10% Yellow Accent**: `#F5C400` (Aviation Gold), `#FFD21F`, `#D9A900`
  - **Borders & Muted**: `#E5E5E0`, `#707070`
- **Typography**: Plus Jakarta Sans (Headings), Inter (Body & Data UI)
- **Motifs**: Runway navigation lines, altimeter / compass motifs, clear status badges.

---

## 💰 Cost-Optimized Architecture (~₹1800/month Base)

1. **Single Low-Cost VPS**:
   - Next.js 15 Frontend
   - Node.js Express Backend
   - PostgreSQL 16 (persistent container volume)
   - Nginx Reverse Proxy
2. **Cloudflare R2 for Recordings**:
   - Zero VPS disk bloat: MP4 files are uploaded directly from LiveKit Egress to a **private Cloudflare R2 bucket**.
   - Zero egress bandwidth fees on Cloudflare R2.
3. **LiveKit Cloud**:
   - Powers real-time WebRTC camera, microphone, screen sharing, and in-room data chat with zero separate websocket server cost.
4. **Provider Abstraction**:
   - Storage service and LiveKit client are abstracted behind clean interfaces (`IStorageService`, `LiveKitService`), allowing seamless transition to self-hosted LiveKit or MinIO later without rewriting application logic.

---

## 🗄️ Project Structure

```
igniteddreams/
├── frontend/                     # Next.js 15 App Router Frontend
│   ├── app/                      # Public, Student, Instructor, Admin, and Classroom routes
│   │   ├── (public)/             # Landing page, /courses, /about, /contact, /login, /register
│   │   ├── student/              # /student/dashboard, /recordings, /courses, /attendance
│   │   ├── instructor/           # /instructor/dashboard, /classes
│   │   ├── admin/                # /admin, /students, /instructors, /courses, /batches, /recordings, /settings
│   │   └── classroom/[classId]/  # Real-time WebRTC Virtual Classroom
│   ├── components/               # UI design system components (Button, Card, Badge, Modal, Navbar, Footer)
│   ├── lib/                      # Universal API client, Auth Context
│   ├── tailwind.config.ts        # Aviation Academy design tokens
│   ├── Dockerfile
│   └── package.json
│
├── backend/                      # Node.js + Express + TypeScript Backend
│   ├── src/
│   │   ├── config/               # Centralized policies (7-day retention, join windows)
│   │   ├── controllers/          # Auth, Student, Instructor, Admin, Recording, Livekit, Webhook
│   │   ├── middleware/           # Auth (HTTP-only cookies), RBAC guards, Rate Limiting, Request Logger
│   │   ├── services/             # RecordingService (7-Day engine), CleanupService (Cron), LiveKit, Storage
│   │   ├── validators/           # Zod schemas for all mutations
│   │   ├── jobs/                 # Hourly node-cron recording cleanup & expiration alerts
│   │   └── server.ts
│   ├── prisma/
│   │   ├── schema.prisma         # PostgreSQL schema (Models, Indexes, Foreign Keys)
│   │   └── seed.ts               # Realistic aviation academy seed script
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml            # Complete VPS stack (Postgres + Backend + Frontend + Nginx)
├── nginx.conf                    # Nginx reverse proxy configuration
├── .env.example                  # Documented environment variables
└── README.md
```

---

## 🚀 Quick Start & Local Development

### 1. Backend Setup

```bash
cd backend
npm install
npx prisma generate

# Create .env from template
cp .env.example .env

# Run development server
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install

# Run Next.js development server
npm run dev
```

Visit: `http://localhost:3000`

---

## 🔑 Demo Credentials (Pre-seeded)

| Role | Email | Password | Access Rights |
| :--- | :--- | :--- | :--- |
| **Student** | `rahul.sharma@example.com` | `StudentPass2026!` | Student LMS, Watch/Download 7-Day Recordings, Join Class |
| **Instructor** | `instructor1@igniteddreams.com` | `InstructorPass2026!` | Start/End Live Classes, Screen Share, Class Attendance |
| **Admin** | `admin@igniteddreams.com` | `AdminPassword2026!` | Full SaaS Platform, Recording Expiry Controls, Settings |

---

## 🔒 Security & Expiration Enforcement

- **Server-Side Expiry**: Even if a student alters local browser clocks, the backend validates `now < expiresAt` and returns `410 Gone` / `RecordingExpiredError`.
- **Short-Lived Signed R2 URLs**:
  - Playback URLs expire in **15 minutes**.
  - Download URLs expire in **5 minutes** with `attachment` disposition.
- **Hourly Automated Deletion**:
  - `node-cron` checks `expiresAt <= now` and status `READY/EXPIRED`.
  - Deletes MP4 from R2 bucket.
  - Updates PostgreSQL status to `DELETED` and records `deletedAt`.
  - Logs action in system `AuditLog`.
  - If R2 delete fails: increments `retryCount`, records error, retries next hour.

---

## 🚢 Production Deployment (Single VPS)

```bash
# 1. Clone repository to VPS
git clone <repo-url> /opt/igniteddreams
cd /opt/igniteddreams

# 2. Configure production .env
cp .env.example .env
nano .env

# 3. Launch with Docker Compose
docker compose up -d --build

# 4. Run database migrations & seed inside backend container
docker compose exec backend npx prisma migrate deploy
docker compose exec backend npm run prisma:seed
```
