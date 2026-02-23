import AdminRoute from '@/components/AdminRoute';
import ProductForm from '@/views/Admin/ProductForm';

export default function EditProductPage() {
  return (
    <AdminRoute>
      <ProductForm />
    </AdminRoute>
  );
}
