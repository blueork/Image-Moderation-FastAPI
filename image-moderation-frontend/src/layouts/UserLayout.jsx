const UserLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Image Moderation</h1>
      {children}
    </div>
  );
};

export default UserLayout;
