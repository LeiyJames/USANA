-- Create testimonials table
create table testimonials (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  role text not null,
  content text not null,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table testimonials enable row level security;

-- Create policies
create policy "Allow public read access"
  on testimonials
  for select
  to public
  using (true);

create policy "Allow authenticated insert"
  on testimonials
  for insert
  to authenticated
  with check (true);

create policy "Allow authenticated update"
  on testimonials
  for update
  to authenticated
  using (true);

create policy "Allow authenticated delete"
  on testimonials
  for delete
  to authenticated
  using (true);

-- Create storage bucket for testimonial images
insert into storage.buckets (id, name, public) 
values ('testimonial-images', 'testimonial-images', true);

-- Set up storage policy
create policy "Allow public access to testimonial images"
  on storage.objects
  for select
  to public
  using (bucket_id = 'testimonial-images');

create policy "Allow authenticated users to upload testimonial images"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'testimonial-images');

create policy "Allow authenticated users to update testimonial images"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'testimonial-images');

create policy "Allow authenticated users to delete testimonial images"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'testimonial-images'); 