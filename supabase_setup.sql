-- 在 Supabase Dashboard > SQL Editor 里粘贴执行

CREATE TABLE submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT,
  basic_info TEXT,
  origin TEXT,
  critical_error TEXT,
  core_loop TEXT,
  const_value TEXT,
  status TEXT,
  legacy TEXT,
  report TEXT
);
