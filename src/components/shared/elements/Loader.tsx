const Loader = () => {
  return (
    <div className="min-h-screen gradient-bg-welcome">
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
      </div>
    </div>
  );
};

export default Loader;
