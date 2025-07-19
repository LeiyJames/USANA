import { supabase } from './supabase';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  image_url?: string;
  created_at: string;
}

export async function getTestimonials() {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching testimonials:', error);
    throw error;
  }

  return data;
}

export async function createTestimonial(testimonial: Omit<Testimonial, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('testimonials')
    .insert([testimonial])
    .select()
    .single();

  if (error) {
    console.error('Error creating testimonial:', error);
    throw error;
  }

  return data;
}

export async function updateTestimonial(id: string, testimonial: Partial<Testimonial>) {
  const { data, error } = await supabase
    .from('testimonials')
    .update(testimonial)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating testimonial:', error);
    throw error;
  }

  return data;
}

export async function deleteTestimonial(id: string) {
  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting testimonial:', error);
    throw error;
  }
}

export async function uploadTestimonialImage(file: File) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `testimonial-images/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('testimonial-images')
    .upload(filePath, file);

  if (uploadError) {
    console.error('Error uploading image:', uploadError);
    throw uploadError;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('testimonial-images')
    .getPublicUrl(filePath);

  return publicUrl;
} 