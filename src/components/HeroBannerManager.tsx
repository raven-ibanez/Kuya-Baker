import React, { useState } from 'react';
import { Save, Plus, Edit, Trash2, X, GripVertical, Clock, Star, Heart } from 'lucide-react';
import { useHeroBanner } from '../hooks/useHeroBanner';
import { HeroBannerFeature } from '../types';
import ImageUpload from './ImageUpload';

const HeroBannerManager: React.FC = () => {
  const { heroBanner, loading, updateHeroBanner, addFeature, updateFeature, deleteFeature } = useHeroBanner();
  const [isEditing, setIsEditing] = useState(false);
  const [editingFeature, setEditingFeature] = useState<HeroBannerFeature | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    iconType: 'clock' as 'clock' | 'star' | 'heart' | 'custom',
    customIcon: '',
    image: ''
  });
  const [autoAdvanceInterval, setAutoAdvanceInterval] = useState(5000);
  const [enabled, setEnabled] = useState(true);

  React.useEffect(() => {
    if (heroBanner) {
      setAutoAdvanceInterval(heroBanner.autoAdvanceInterval);
      setEnabled(heroBanner.enabled);
    }
  }, [heroBanner]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddFeature = () => {
    setEditingFeature(null);
    setFormData({
      title: '',
      description: '',
      iconType: 'clock',
      customIcon: '',
      image: ''
    });
    setIsEditing(true);
  };

  const handleEditFeature = (feature: HeroBannerFeature) => {
    setEditingFeature(feature);
    setFormData({
      title: feature.title,
      description: feature.description,
      iconType: feature.iconType,
      customIcon: feature.customIcon || '',
      image: feature.image || ''
    });
    setIsEditing(true);
  };

  const handleSaveFeature = async () => {
    if (!formData.title || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      if (editingFeature) {
        await updateFeature(editingFeature.id, formData);
      } else {
        await addFeature(formData);
      }
      setIsEditing(false);
      setEditingFeature(null);
      setFormData({
        title: '',
        description: '',
        iconType: 'clock',
        customIcon: '',
        image: ''
      });
    } catch (error) {
      console.error('Error saving feature:', error);
      alert('Failed to save feature. Please try again.');
    }
  };

  const handleDeleteFeature = async (id: string) => {
    if (heroBanner.features.length <= 1) {
      alert('At least one feature must remain');
      return;
    }

    if (confirm('Are you sure you want to delete this feature?')) {
      try {
        await deleteFeature(id);
      } catch (error) {
        console.error('Error deleting feature:', error);
        alert('Failed to delete feature. Please try again.');
      }
    }
  };

  const handleSaveSettings = async () => {
    try {
      await updateHeroBanner({
        autoAdvanceInterval,
        enabled
      });
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. Please try again.');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingFeature(null);
    setFormData({
      title: '',
      description: '',
      iconType: 'clock',
      customIcon: '',
      image: ''
    });
  };

  const renderIconPreview = (iconType: string, customIcon?: string) => {
    const iconClass = "w-16 h-16";
    
    switch (iconType) {
      case 'clock':
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'star':
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
      case 'heart':
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      case 'custom':
        return customIcon ? (
          <img src={customIcon} alt="Custom icon" className={iconClass} />
        ) : (
          <div className={iconClass + " bg-gray-200 rounded flex items-center justify-center"}>
            <span className="text-gray-400">Icon</span>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Settings Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-fredoka font-semibold text-baker-brown-dark">Hero Banner Settings</h2>
          <button
            onClick={handleSaveSettings}
            className="bg-baker-orange text-white px-4 py-2 rounded-lg hover:bg-baker-orange-light transition-colors duration-200 flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>Save Settings</span>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-fredoka font-semibold text-baker-brown-dark mb-2">
              Auto-advance Interval (milliseconds)
            </label>
            <input
              type="number"
              value={autoAdvanceInterval}
              onChange={(e) => setAutoAdvanceInterval(Number(e.target.value))}
              min="1000"
              step="1000"
                  className="w-full px-3 py-2 border-3 border-baker-brown-dark rounded-lg focus:ring-2 focus:ring-baker-orange focus:border-baker-orange bg-baker-beige-light text-baker-brown-dark font-nunito"
            />
            <p className="text-xs text-baker-brown mt-1 font-nunito">
              How long each slide is displayed (in milliseconds). 5000 = 5 seconds.
            </p>
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
                className="rounded border-baker-brown-dark text-baker-orange focus:ring-baker-orange"
              />
              <span className="text-sm font-fredoka font-semibold text-baker-brown-dark">Enable Hero Banner</span>
            </label>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-fredoka font-semibold text-baker-brown-dark">Banner Features</h2>
          {!isEditing && (
            <button
              onClick={handleAddFeature}
              className="bg-baker-orange text-white px-4 py-2 rounded-lg hover:bg-baker-orange-light transition-colors duration-200 flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Feature</span>
            </button>
          )}
        </div>

        {isEditing ? (
          <div className="bg-baker-beige-light rounded-xl p-6 border-3 border-baker-brown-dark mb-6">
            <h3 className="text-lg font-fredoka font-semibold text-baker-brown-dark mb-4">
              {editingFeature ? 'Edit Feature' : 'Add New Feature'}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-fredoka font-semibold text-baker-brown-dark mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-3 border-baker-brown-dark rounded-lg focus:ring-2 focus:ring-baker-orange focus:border-baker-orange bg-white text-baker-brown-dark font-nunito"
                  placeholder="Enter feature title"
                />
              </div>

              <div>
                <label className="block text-sm font-fredoka font-semibold text-baker-brown-dark mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border-3 border-baker-brown-dark rounded-lg focus:ring-2 focus:ring-baker-orange focus:border-baker-orange bg-white text-baker-brown-dark font-nunito"
                  placeholder="Enter feature description"
                />
              </div>

              <div>
                <label className="block text-sm font-fredoka font-semibold text-baker-brown-dark mb-2">
                  Icon Type
                </label>
                <select
                  name="iconType"
                  value={formData.iconType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-3 border-baker-brown-dark rounded-lg focus:ring-2 focus:ring-baker-orange focus:border-baker-orange bg-white text-baker-brown-dark font-nunito"
                >
                  <option value="clock">Clock</option>
                  <option value="star">Star</option>
                  <option value="heart">Heart</option>
                  <option value="custom">Custom Icon</option>
                </select>
              </div>

              {formData.iconType === 'custom' && (
                <div>
                  <label className="block text-sm font-fredoka font-semibold text-baker-brown-dark mb-2">
                    Custom Icon URL
                  </label>
                  <input
                    type="text"
                    name="customIcon"
                    value={formData.customIcon}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border-3 border-baker-brown-dark rounded-lg focus:ring-2 focus:ring-baker-orange focus:border-baker-orange bg-white text-baker-brown-dark font-nunito"
                    placeholder="Enter image URL or SVG path"
                  />
                </div>
              )}

              <div className="flex items-center justify-center p-4 bg-white rounded-lg border-3 border-baker-brown-dark">
                <div className="text-baker-brown-dark">
                  {renderIconPreview(formData.iconType, formData.customIcon)}
                </div>
              </div>

              <div>
                <label className="block text-sm font-fredoka font-semibold text-baker-brown-dark mb-2">
                  Background Image (Optional)
                </label>
                <p className="text-xs text-baker-brown mb-3 font-nunito">
                  Upload an image that will cover the entire section as a background. The image will be displayed behind the text with an overlay for readability.
                </p>
                <ImageUpload
                  currentImage={formData.image}
                  onImageChange={(imageUrl) => setFormData({ ...formData, image: imageUrl || '' })}
                  label="Background Image"
                />
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={handleSaveFeature}
                  className="flex-1 bg-baker-orange text-white px-4 py-2 rounded-lg hover:bg-baker-orange-light transition-colors duration-200 flex items-center justify-center space-x-2 font-fredoka font-semibold"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Feature</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 bg-baker-brown-light text-white px-4 py-2 rounded-lg hover:bg-baker-brown transition-colors duration-200 flex items-center justify-center space-x-2 font-fredoka font-semibold"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          </div>
        ) : null}

        <div className="space-y-4">
          {heroBanner.features.map((feature, index) => (
            <div
              key={feature.id}
              className="bg-baker-beige-light rounded-xl p-6 border-3 border-baker-brown-dark"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="text-baker-brown-dark">
                      {renderIconPreview(feature.iconType, feature.customIcon)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-fredoka font-bold text-baker-brown-dark mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-baker-brown font-nunito leading-relaxed">
                        {feature.description}
                      </p>
                      {feature.image && (
                        <div className="mt-3 flex items-center space-x-2">
                          <span className="text-xs text-baker-brown font-nunito">Background Image:</span>
                          <img 
                            src={feature.image} 
                            alt="Background preview" 
                            className="w-16 h-10 object-cover rounded border border-baker-brown-dark"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => handleEditFeature(feature)}
                    className="p-2 text-baker-brown-dark hover:text-baker-orange hover:bg-baker-gold-light rounded-lg transition-colors duration-200"
                    title="Edit feature"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteFeature(feature.id)}
                    disabled={heroBanner.features.length <= 1}
                    className="p-2 text-baker-brown-dark hover:text-baker-red hover:bg-red-50 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Delete feature"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroBannerManager;

