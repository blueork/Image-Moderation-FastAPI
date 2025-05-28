const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>
      {children}
    </div>
  );
};

export default AdminLayout;
