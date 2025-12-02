-- Enable RLS on quote_requests
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

-- Admins can view all quote requests
CREATE POLICY "Admins can view all quote requests"
ON quote_requests
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  )
);

-- Admins can update quote requests
CREATE POLICY "Admins can update quote requests"
ON quote_requests
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  )
);

-- Users can view their own quote requests
CREATE POLICY "Users can view their own quote requests"
ON quote_requests
FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own quote requests
CREATE POLICY "Users can insert their own quote requests"
ON quote_requests
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Trigger to update updated_at
CREATE TRIGGER update_quote_requests_updated_at
  BEFORE UPDATE ON quote_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();