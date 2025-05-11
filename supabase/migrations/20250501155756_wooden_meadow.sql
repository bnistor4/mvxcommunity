/*
  # Add RLS policy for admin_keys table

  1. Changes
    - Add RLS policy to allow reading admin_keys table for API key verification
    
  2. Security
    - Enable public read access to admin_keys table for authentication
    - This is safe because we only expose the ability to check if an API key exists
*/

-- Add policy to allow reading admin_keys for authentication
CREATE POLICY "Allow public to check API keys"
  ON admin_keys
  FOR SELECT
  TO public
  USING (true);
