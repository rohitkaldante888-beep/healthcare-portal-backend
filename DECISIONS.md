# Architecture & Technical Decisions

## 1. Authentication
- Implemented custom JWT-based authentication using Node.js.
- Passwords are hashed using bcrypt with salt rounds.
- JWT contains userId and role (patient/doctor).
- Role-based middleware protects routes (doctor-only, patient-only).
- No third-party auth services used as per requirement.

## 2. Onboarding Form & Draft Saving
- Onboarding split into three independent tables (personal, medical, insurance).
- Each step saves data immediately to DB using patient_id.
- Users can resume onboarding because data persists per step.
- Completion flags determine navigation flow.
- Final submission shows a summary aggregated from all three tables.

## 3. Real-Time Chat (Socket.io)
- Socket.io used with JWT authentication during handshake.
- Each patient-doctor pair has an isolated room: `chat_<patientId>_<doctorId>`.
- Messages are persisted in PostgreSQL.
- Typing indicators and online status handled via socket events.
- Unread counts calculated using `is_read` flag.

## 4. Database Design
- PostgreSQL (Supabase) chosen for relational integrity.
- UUIDs used for scalability.
- Strong foreign key constraints ensure data consistency.
- Separate tables for onboarding improve flexibility and partial saves.

## 5. Trade-offs & Assumptions
- No file uploads (insurance documents) for simplicity.
- One primary doctor per patient.
- Chat supports 1:1 only, no group chat.
- Supabase used only as DB, not authentication.

