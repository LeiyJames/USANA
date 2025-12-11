// import { supabase } from './supabase';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  image_url?: string;
  created_at: string;
}

const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Verified Customer",
    content: "The CellSentials have completely transformed my energy levels. I wake up feeling refreshed and ready to tackle the day!",
    image_url: "https://i.pravatar.cc/150?u=sarah",
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Athlete",
    content: "As an active person, joint health is crucial. The BiOmega supplements have been a game changer for my recovery.",
    image_url: "https://i.pravatar.cc/150?u=michael",
    created_at: new Date().toISOString()
  },
  {
    id: "3",
    name: "Emily Davis",
    role: "Wellness Enthusiast",
    content: "I love the Celavive skincare line. My skin feels so much healthier and radiant since I started using it.",
    image_url: "https://i.pravatar.cc/150?u=emily",
    created_at: new Date().toISOString()
  }
];

export async function getTestimonials() {
  // const { data, error } = await supabase
  //   .from('testimonials')
  //   .select('*')
  //   .order('created_at', { ascending: false });

  // if (error) {
  //   console.error('Error fetching testimonials:', error);
  //   throw error;
  // }

  // return data;
  return Promise.resolve(MOCK_TESTIMONIALS);
}

export async function createTestimonial(testimonial: Omit<Testimonial, 'id' | 'created_at'>) {
  // const { data, error } = await supabase
  //   .from('testimonials')
  //   .insert([testimonial])
  //   .select()
  //   .single();

  // if (error) {
  //   console.error('Error creating testimonial:', error);
  //   throw error;
  // }

  // return data;
  const newTestimonial: Testimonial = {
    ...testimonial,
    id: Math.random().toString(36).substr(2, 9),
    created_at: new Date().toISOString()
  };
  MOCK_TESTIMONIALS.push(newTestimonial);
  return Promise.resolve(newTestimonial);
}

export async function updateTestimonial(id: string, testimonial: Partial<Testimonial>) {
  // const { data, error } = await supabase
  //   .from('testimonials')
  //   .update(testimonial)
  //   .eq('id', id)
  //   .select()
  //   .single();

  // if (error) {
  //   console.error('Error updating testimonial:', error);
  //   throw error;
  // }

  // return data;
  const index = MOCK_TESTIMONIALS.findIndex(t => t.id === id);
  if (index !== -1) {
    MOCK_TESTIMONIALS[index] = { ...MOCK_TESTIMONIALS[index], ...testimonial };
    return Promise.resolve(MOCK_TESTIMONIALS[index]);
  }
  throw new Error("Testimonial not found");
}

export async function deleteTestimonial(id: string) {
  // const { error } = await supabase
  //   .from('testimonials')
  //   .delete()
  //   .eq('id', id);

  // if (error) {
  //   console.error('Error deleting testimonial:', error);
  //   throw error;
  // }
  const index = MOCK_TESTIMONIALS.findIndex(t => t.id === id);
  if (index !== -1) {
    MOCK_TESTIMONIALS.splice(index, 1);
  }
  return Promise.resolve();
}

export async function uploadTestimonialImage(file: File) {
  // const fileExt = file.name.split('.').pop();
  // const fileName = `${Math.random()}.${fileExt}`;
  // const filePath = `testimonial-images/${fileName}`;

  // const { error: uploadError } = await supabase.storage
  //   .from('testimonial-images')
  //   .upload(filePath, file);

  // if (uploadError) {
  //   console.error('Error uploading image:', uploadError);
  //   throw uploadError;
  // }

  // const { data: { publicUrl } } = supabase.storage
  //   .from('testimonial-images')
  //   .getPublicUrl(filePath);

  // return publicUrl;
  return Promise.resolve(URL.createObjectURL(file));
} 