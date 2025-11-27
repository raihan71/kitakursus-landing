import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { programs } from '../../configs/constants';
import { AiFillStar, AiOutlineHeart } from 'react-icons/ai';
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
import { NavbarDetail } from '../../components/shared/elements';
import Notfound from '../../components/shared/pages/Notfound';
import { ButtonPrimary } from '../../components/shared/elements/Buttons';

const DetailCourse = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { t } = useTranslation();

  const course = programs.find((p) => p.id === id);

  if (!course) {
    return (
      <Notfound
        title={t('notfound_course_title')}
        caption={t('notfound_course_caption')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Navbar */}
      <NavbarDetail />
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 pb-24">
        {/* Course Image/Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Course Image Placeholder */}
            <div className="w-full md:w-1/2 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl h-64 md:h-96 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-6xl mb-4">📚</div>
                <h2 className="text-2xl font-bold">{course.title}</h2>
              </div>
            </div>

            {/* Course Info */}
            <div className="w-full md:w-1/2">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {course.title}
              </h1>

              {/* Key Spec Box */}
              <div className="bg-pink-100 border border-pink-300 rounded-lg px-4 py-2 mb-4 inline-block">
                <span className="text-pink-700 font-bold text-lg">
                  {course.duration}
                </span>
              </div>

              {/* Features List */}
              <div className="space-y-3 mb-6">
                {course.features.slice(0, 5).map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm md:text-base">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Promotional Banners */}
        <div className="space-y-2 mb-4">
          <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-4 py-3 rounded-lg text-center font-semibold">
            {t('course_free_shipping')}
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-lg text-center font-semibold">
            {t('course_super_brand_day')}
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-3 rounded-lg text-center font-semibold">
            {t('course_cashback')}
          </div>
        </div>

        {/* Flash Sale Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold">
              {t('course_flash_sale')}
            </div>
            <div className="text-gray-600 text-sm">
              {t('course_ends_in', { days: 2 })}
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-4">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-3xl font-bold text-red-600">
                {course.price}
              </span>
              <span className="text-lg text-gray-400 line-through">
                {course.originalPrice}
              </span>
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-lg font-bold text-sm">
                {course.discount} OFF
              </span>
            </div>
            <div className="bg-pink-100 border border-pink-300 rounded-lg px-3 py-1 inline-block">
              <span className="text-pink-700 text-sm font-medium">
                {t('course_discount_applied')}
              </span>
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <span className="text-yellow-600 font-bold text-lg">%</span>
                <span className="text-gray-700 text-sm">
                  {t('course_bonus_checkout')}
                </span>
              </div>
              <span className="text-gray-400">›</span>
            </div>
            <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <span className="text-blue-600 font-bold text-lg">G</span>
                <span className="text-gray-700 text-sm">
                  {t('course_installment')}
                </span>
              </div>
              <span className="text-gray-400">›</span>
            </div>
          </div>
        </div>

        {/* Course Details */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              {course.title} - {t('course_full_title')}
            </h2>
            <button className="p-2 hover:bg-gray-100 rounded-full transition">
              <AiOutlineHeart className="text-2xl text-gray-600" />
            </button>
          </div>

          {/* Reviews and Stats */}
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            <div className="flex items-center gap-1">
              <AiFillStar className="text-yellow-400 text-xl" />
              <span className="font-semibold text-gray-900">
                {course.rating} ({course.reviews})
              </span>
            </div>
            <span className="text-gray-500 text-sm">
              {t('course_photo_reviews')}
            </span>
            <span className="text-gray-500 text-sm">
              {course.students} {t('course_sold')}
            </span>
          </div>

          {/* Description */}
          <div className="mb-4">
            <p className="text-gray-700 leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Full Features List */}
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              {t('course_what_you_learn')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {course.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructor Info */}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  {t('course_instructor')}
                </p>
                <p className="font-semibold text-gray-900">
                  {course.instructor}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping/Support Info */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🚚</div>
            <div className="flex-1">
              <p className="text-gray-700 font-medium">
                {t('course_support_available')}
              </p>
              <p className="text-gray-500 text-sm">
                {t('course_estimated_start')}
              </p>
            </div>
            <span className="text-gray-400">›</span>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <ButtonPrimary
              onClick={() => alert('Progressing')}
              className="p-3 bg-gray-50 hover:bg-gray-100 rounded-full transition"
            >
              <HiOutlineChatBubbleLeftRight className="text-2xl text-gray-600" />
            </ButtonPrimary>
            <ButtonPrimary
              onClick={() => {
                navigate(`/enroll/${course.id}`);
              }}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition"
            >
              {t('course_register')}
            </ButtonPrimary>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCourse;
