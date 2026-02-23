import AdminRoute from '@/components/AdminRoute';
import AdminDashboard from '@/views/Admin/Dashboard';

export default function AdminPage() {
  return (
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  );
}
