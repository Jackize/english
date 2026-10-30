-- Create enum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- Add role to User
ALTER TABLE "User" ADD COLUMN "role" "Role" NOT NULL DEFAULT 'USER';
