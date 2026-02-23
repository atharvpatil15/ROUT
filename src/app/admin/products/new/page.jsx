import AdminRoute from '@/components/AdminRoute';
import ProductForm from '@/views/Admin/ProductForm';

export default function NewProductPage() {
  return (
    <AdminRoute>
      <ProductForm />
    </AdminRoute>
  );
}
