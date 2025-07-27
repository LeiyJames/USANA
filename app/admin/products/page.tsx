'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getCategories, getBodyBenefits } from '@/lib/products';
import { tagMappings } from '@/lib/tagMappings';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  featured: boolean;
  tags?: string[];
  body_benefits?: string[];
  ingredients?: string[];
  usage_instructions?: string;
  key_features?: string[];
  safety_info?: string;
  best_seller?: boolean;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState(0);


  const [availableCategories] = useState<string[]>(getCategories());
  const [availableBodyBenefits] = useState<string[]>(getBodyBenefits());



  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    featured: false,
    tags: [] as string[],
    bodyBenefits: [] as string[],
    ingredients: [] as string[],
    keyFeatures: [] as string[],
    bestSeller: false
  });

  // Add a helper function for array fields
  const handleArrayInputChange = (field: string, value: string) => {
    // Split by commas and trim whitespace
    const arrayValue = value.split(',').map(item => item.trim()).filter(item => item !== '');
    setFormData(prev => ({
      ...prev,
      [field]: arrayValue
    }));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name === 'tags') {
      // Handle tags as array
      const tagsArray = value.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
      setFormData(prev => ({
        ...prev,
        tags: tagsArray
      }));

      // Auto-populate category and body benefits based on tags
      let allCategories = new Set<string>();
      let allBenefits = new Set<string>();
      
      console.log('Processing tags:', tagsArray);
      
      tagsArray.forEach(tag => {
        const tagLower = tag.toLowerCase().trim();
        console.log('Processing tag:', tag, '->', tagLower);
        
        // First try exact match
        let mapping = tagMappings[tagLower];
        
        // If no exact match, try partial match
        if (!mapping) {
          for (const [key, value] of Object.entries(tagMappings)) {
            if (tagLower.includes(key) || key.includes(tagLower)) {
              mapping = value;
              console.log('Found partial match:', key, '->', value);
              break;
            }
          }
        } else {
          console.log('Found exact match:', tagLower, '->', mapping);
        }
        
        if (mapping) {
          allCategories.add(mapping.category);
          mapping.bodyBenefits.forEach(benefit => allBenefits.add(benefit));
        } else {
          console.log('No mapping found for tag:', tag);
        }
      });
      
      console.log('Final categories:', Array.from(allCategories));
      console.log('Final benefits:', Array.from(allBenefits));
      
      if (allCategories.size > 0 || allBenefits.size > 0) {
        setFormData(prev => ({
          ...prev,
          category: Array.from(allCategories)[0] || '', // Use first category if multiple
          bodyBenefits: Array.from(allBenefits)
        }));
      }
    } else {
      // Handle other fields normally
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    try {
      setUploadProgress(0);
      console.log('Starting image upload:', { fileName, filePath });

      // Upload the file
      const { data, error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      console.log('File uploaded successfully:', data);

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      console.log('Public URL generated:', publicUrl);
      setUploadProgress(100);
      return publicUrl;
    } catch (error) {
      console.error('Error in uploadImage:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to upload image');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log('Starting product save...');
      let imageUrl = editingProduct?.image || '';

      if (imageFile) {
        try {
          console.log('Uploading image...');
          imageUrl = await uploadImage(imageFile);
          console.log('Image uploaded successfully:', imageUrl);
        } catch (uploadError) {
          console.error('Image upload error:', uploadError);
          setError('Failed to upload image. Please try again.');
          setLoading(false);
          return;
        }
      }

      // Convert form data to proper types
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price) || 0,
        image: imageUrl,
        category: formData.category.trim(),
        stock: parseInt(formData.stock) || 0,
        featured: Boolean(formData.featured),
        tags: formData.tags,
        body_benefits: formData.bodyBenefits,
        ingredients: formData.ingredients,
        key_features: formData.keyFeatures,
        best_seller: Boolean(formData.bestSeller),
        updated_at: new Date().toISOString()
      };

      console.log('Saving product data:', productData);

      if (editingProduct) {
        console.log('Updating existing product:', editingProduct.id);
        const { data: updateData, error: updateError } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id)
          .select()
          .single();

        if (updateError) {
          console.error('Update error:', updateError);
          throw updateError;
        }

        console.log('Product updated successfully:', updateData);
      } else {
        console.log('Creating new product');
        const { data: insertData, error: insertError } = await supabase
          .from('products')
          .insert([{ ...productData, created_at: new Date().toISOString() }])
          .select()
          .single();

        if (insertError) {
          console.error('Insert error:', insertError);
          throw insertError;
        }

        console.log('Product created successfully:', insertData);
      }

      await fetchProducts();
      handleCancel();
      
      // Show success message
      setError('Product saved successfully!');
      setTimeout(() => setError(null), 3000);
    } catch (err) {
      console.error('Error saving product:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to save product. Please try again.';
      console.error('Error details:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      stock: product.stock.toString(),
      featured: product.featured,
      tags: product.tags || [],
      bodyBenefits: product.body_benefits || [],
      ingredients: product.ingredients || [],
      keyFeatures: product.key_features || [],
      bestSeller: product.best_seller || false
    });
    setImagePreview(product.image);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      stock: '',
      featured: false,
      tags: [],
      bodyBenefits: [],
      ingredients: [],
      keyFeatures: [],
      bestSeller: false
    });
    setImageFile(null);
    setImagePreview('');
    setUploadProgress(0);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Failed to delete product');
    } finally {
      setLoading(false);
    }
  };

  if (loading && products.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Products Management</h1>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add New Product
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {/* Product Form Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                type="button"
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., CellSentials™ Vita-Antioxidant"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md placeholder-gray-400 text-gray-900 focus:outline-none focus:border-primary-500"
                  />
                </div>



                <div>
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">₱</span>
                    </div>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      className="pl-7 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md placeholder-gray-400 text-gray-900 focus:outline-none focus:border-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                    min="0"
                    placeholder="Available quantity"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md placeholder-gray-400 text-gray-900 focus:outline-none focus:border-primary-500"
                  />
                </div>

                {/* Product Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    placeholder="Provide a detailed description of the product..."
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md placeholder-gray-400 text-gray-900 focus:outline-none focus:border-primary-500"
                  />
                </div>

                {/* Body Benefits */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Body Benefits</label>
                  <textarea
                    name="bodyBenefits"
                    value={formData.bodyBenefits.join(', ')}
                    onChange={(e) => handleArrayInputChange('bodyBenefits', e.target.value)}
                    rows={3}
                    placeholder="Enter benefits separated by commas (e.g., Heart Health, Immune Support, Joint Health)"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md placeholder-gray-400 text-gray-900 focus:outline-none focus:border-primary-500"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Enter each benefit separated by commas
                  </p>
                </div>

                {/* Ingredients */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Ingredients</label>
                  <textarea
                    name="ingredients"
                    value={formData.ingredients.join(', ')}
                    onChange={(e) => handleArrayInputChange('ingredients', e.target.value)}
                    rows={3}
                    placeholder="Enter ingredients separated by commas"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md placeholder-gray-400 text-gray-900 focus:outline-none focus:border-primary-500"
                  />
                </div>



                {/* Key Features */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Key Features</label>
                  <textarea
                    name="keyFeatures"
                    value={formData.keyFeatures.join(', ')}
                    onChange={(e) => handleArrayInputChange('keyFeatures', e.target.value)}
                    rows={3}
                    placeholder="Enter key features separated by commas"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md placeholder-gray-400 text-gray-900 focus:outline-none focus:border-primary-500"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Enter each feature separated by commas
                  </p>
                </div>



                {/* Tags and Flags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tags (Auto-populates Category & Benefits)</label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags?.join(', ') || ''}
                    onChange={handleInputChange}
                    placeholder="e.g., heart health, immune health, skin health, muscle health, brain health, bone health, digestive health, eye health, detox support"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md placeholder-gray-400 text-gray-900 focus:outline-none focus:border-primary-500"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Enter multiple tags separated by commas to automatically populate category and body benefits. Examples: heart health, immune health, skin health, muscle health, etc.
                  </p>
                </div>

                <div className="flex items-center space-x-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-900">Featured Product</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="bestSeller"
                      checked={formData.bestSeller}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-900">Best Seller</span>
                  </label>
                </div>
              </div>

              {/* Image Upload Section */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">Product Image</label>
                <div className="flex items-center space-x-6">
                  {imagePreview && (
                    <div className="relative w-32 h-32">
                      <Image
                        src={imagePreview}
                        alt="Product preview"
                        fill
                        className="rounded-lg object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                            <span>Upload a file</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                    {uploadProgress > 0 && uploadProgress < 100 && (
                      <div className="mt-2">
                        <div className="bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-primary-600 h-2.5 rounded-full"
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    'Save Product'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.tags?.join(', ') || ''}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ₱{product.price.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.stock}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.featured ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Featured
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      Standard
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-primary-600 hover:text-primary-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 