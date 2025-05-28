import AdminLayout from "../layouts/AdminLayout";
import CreateTokenForm from "../components/Admin/CreateTokenForm";
import TokenList from "../components/Admin/TokenList";

const AdminDashboard = () => (
  <AdminLayout>
    <CreateTokenForm />
    <TokenList />
  </AdminLayout>
);

export default AdminDashboard;
