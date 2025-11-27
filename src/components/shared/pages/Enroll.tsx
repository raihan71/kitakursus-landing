import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { programs } from '../../../configs/constants';
import Notfound from './Notfound';

type EnrollProps = {
  onSuccess?: () => void;
};

const Enroll = ({ onSuccess }: EnrollProps) => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const course = React.useMemo(() => programs.find((p) => p.id === id), [id]);

  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  if (!course) {
    return (
      <Notfound
        title={t('notfound_course_title')}
        caption={t('notfound_course_caption')}
      />
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('Form Data Submitted:', formData);

    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess?.();
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 pb-24">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        {t('enroll_page_heading')}
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white p-6">
            <p className="text-sm uppercase tracking-wide opacity-80 mb-2">
              {t('enroll_enrolling_in')}
            </p>
            <h2 className="text-3xl font-bold">{course.title}</h2>
            <p className="text-white/90 mt-2">{course.description}</p>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-500">{t('enroll_duration')}</p>
                <p className="text-xl font-semibold text-gray-900">
                  {course.duration}
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-500">{t('enroll_students')}</p>
                <p className="text-xl font-semibold text-gray-900">
                  {course.students}
                </p>
              </div>
            </div>
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
              <p className="text-sm text-emerald-600 font-semibold uppercase">
                {t('enroll_special_price')}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-emerald-600">
                  {course.price}
                </span>
                <span className="text-gray-400 line-through text-lg">
                  {course.originalPrice}
                </span>
                <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-lg text-sm font-semibold">
                  {course.discount} OFF
                </span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {t('enroll_features_title')}
              </h3>
              <div className="space-y-3">
                {course.features.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <p className="text-gray-700">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-lg p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {t('enroll_form_title')}
            </h2>
            <p className="text-gray-500 mt-1">{t('enroll_form_caption')}</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('enroll_full_name')}
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg p-3"
                placeholder="e.g., John Doe"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('enroll_email')}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg p-3"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('enroll_phone')}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg p-3"
                placeholder="+62 xxx-xxxx-xxxx"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('enroll_notes')}
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full border border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg p-3"
                rows={4}
                placeholder={t('enroll_notes_placeholder')}
              />
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm text-gray-600">
              <p>{t('enroll_disclaimer')}</p>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? t('enroll_processing') : t('enroll_submit')}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Enroll;
