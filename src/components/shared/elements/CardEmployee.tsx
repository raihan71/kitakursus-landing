const CardEmployee = ({
  currentJobTitle,
  isAnimating,
}: {
  currentJobTitle: string;
  isAnimating: boolean;
}) => {
  return (
    <div
      className="p-4 flex justify-end items-start flex-col rounded-xl sm:w-96 w-full my-5 employee-card white-glassmorphism"
      style={{
        boxShadow: '0 0 7px rgba(0, 0, 0, 0.5)',
      }}
    >
      <div className="flex justify-between flex-col w-full h-full">
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 rounded-full border-2 border-orange-600 flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#dc2626"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div className="text-white text-sm bg-emerald-600 px-3 py-1.5 rounded font-medium">
            ACTIVE
          </div>
        </div>
        <div className="mt-4">
          <p className="text-red-600 font-light text-base">ID CARD: KAMU123</p>
          <p
            className={`text-red-600 font-semibold text-2xl mt-2 ${
              isAnimating ? 'typing-glitch' : ''
            }`}
            data-text={currentJobTitle}
          >
            {currentJobTitle}
          </p>
          <p className="text-red-600 font-light text-sm mt-2">Dream Company</p>
        </div>
      </div>
    </div>
  );
};

export default CardEmployee;
