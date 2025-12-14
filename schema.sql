-- create table public.users (
--   id uuid not null default gen_random_uuid (),
--   email character varying(255) not null,
--   password_hash character varying(255) not null,
--   role character varying(20) not null,
--   created_at timestamp without time zone null default now(),
--   constraint users_pkey primary key (id),
--   constraint users_email_key unique (email),
--   constraint users_role_check check (
--     (
--       (role)::text = any (
--         (
--           array[
--             'PATIENT'::character varying,
--             'DOCTOR'::character varying
--           ]
--         )::text[]
--       )
--     )
--   )
-- ) TABLESPACE pg_default;



-- //paitient 
-- create table public.patients (
--   id uuid not null default gen_random_uuid (),
--   user_id uuid not null,
--   status character varying(20) not null default 'draft'::character varying,
--   last_step_completed character varying(10) null default 'step0'::character varying,
--   created_at timestamp without time zone null default now(),
--   updated_at timestamp without time zone null default now(),
--   constraint patients_pkey primary key (id),
--   constraint patients_user_id_key unique (user_id)
-- ) TABLESPACE pg_default;



-- onbording_personal
-- create table public.onboarding_personal (
--   id uuid not null default gen_random_uuid (),
--   patient_id uuid not null,
--   full_name character varying(255) not null,
--   dob date not null,
--   gender character varying(20) null,
--   phone character varying(20) null,
--   emergency_contact_name character varying(255) null,
--   emergency_contact_phone character varying(20) null,
--   constraint onboarding_personal_pkey primary key (id),
--   constraint onboarding_personal_patient_id_key unique (patient_id),
--   constraint onboarding_personal_patient_id_fkey foreign KEY (patient_id) references patients (id) on delete CASCADE
-- ) TABLESPACE pg_default;


-- onboarding_medical
-- create table public.onboarding_medical (
--   id uuid not null default gen_random_uuid (),
--   patient_id uuid not null,
--   blood_type character varying(5) null,
--   current_medications text null,
--   known_allergies text[] null,
--   chronic_conditions text[] null,
--   previous_surgeries text null,
--   family_medical_history text null,
--   constraint onboarding_medical_pkey primary key (id),
--   constraint onboarding_medical_patient_id_key unique (patient_id),
--   constraint onboarding_medical_patient_id_fkey foreign KEY (patient_id) references patients (id) on delete CASCADE
-- ) TABLESPACE pg_default;


-- onboarding_insurance
-- create table public.onboarding_insurance (
--   id uuid not null default gen_random_uuid (),
--   patient_id uuid not null,
--   insurance_provider character varying(255) null,
--   insurance_id character varying(100) null,
--   policy_holder_name character varying(255) null,
--   preferred_doctor uuid null,
--   preferred_time_slot character varying(20) null,
--   referral_source character varying(50) null,
--   additional_notes text null,
--   constraint onboarding_insurance_pkey primary key (id),
--   constraint onboarding_insurance_patient_id_key unique (patient_id),
--   constraint onboarding_insurance_patient_id_fkey foreign KEY (patient_id) references patients (id) on delete CASCADE
-- ) TABLESPACE pg_default;


-- //doctor 
-- create table public.doctors (
--   id uuid not null default gen_random_uuid (),
--   full_name character varying(255) not null,
--   email character varying(255) not null,
--   specialization character varying(100) null,
--   is_active boolean null default true,
--   created_at timestamp without time zone null default now(),
--   constraint doctors_pkey primary key (id),
--   constraint doctors_email_key unique (email)
-- ) TABLESPACE pg_default;


-- chat
-- -- CREATE TABLE chat_rooms (
-- --     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
-- --     patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
-- --     doctor_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
-- --     created_at TIMESTAMP DEFAULT now(),
-- --     UNIQUE(patient_id, doctor_id)
-- -- );

-- -- CREATE TABLE messages (
-- --     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
-- --     room_id UUID NOT NULL REFERENCES chat_rooms(id) ON DELETE CASCADE,
-- --     sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
-- --     message TEXT NOT NULL,
-- --     is_read BOOLEAN DEFAULT FALSE,
-- --     created_at TIMESTAMP DEFAULT now()
-- -- );