import React, { useRef } from 'react';
import { User, Upload, ImageOff } from 'lucide-react';
import imageCompression from 'browser-image-compression';
import { useResumeStore } from '../../store/useResumeStore';
import { Section } from './components/Section';
import { Input } from './components/FormElements';

export const BasicsForm: React.FC = () => {
  const { resumeData, updateBasics } = useResumeStore();
  const { basics } = resumeData;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 400,
        useWebWorker: true,
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        updateBasics({ avatar: reader.result as string });
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error('Image compression error:', error);
    }
  };

  return (
    <Section title="基本信息" icon={<User size={20} />}>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 sm:col-span-1 flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-700">头像上传</label>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-md border border-zinc-300 bg-zinc-100 flex items-center justify-center overflow-hidden shrink-0">
              {basics.avatar ? (
                <img src={basics.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User size={24} className="text-zinc-400" />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs rounded-md font-medium transition-colors flex items-center gap-1.5"
                >
                  <Upload size={14} />
                  上传图片
                </button>
                {basics.avatar && (
                  <button
                    type="button"
                    onClick={() => updateBasics({ avatar: '' })}
                    className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs rounded-md font-medium transition-colors flex items-center gap-1.5"
                  >
                    <ImageOff size={14} />
                    移除
                  </button>
                )}
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={basics.showAvatar}
                  onChange={(e) => updateBasics({ showAvatar: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-zinc-300"
                />
                <span className="text-xs text-zinc-500">在简历中显示头像</span>
              </label>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>

        <Input
          label="姓名"
          value={basics.name}
          onChange={(e) => updateBasics({ name: e.target.value })}
          placeholder="例如：张三"
        />
        <Input
          label="求职意向"
          value={basics.intention}
          onChange={(e) => updateBasics({ intention: e.target.value })}
          placeholder="例如：前端开发工程师"
        />
        <Input
          label="联系电话"
          value={basics.phone}
          onChange={(e) => updateBasics({ phone: e.target.value })}
          placeholder="例如：13800138000"
        />
        <Input
          label="电子邮箱"
          value={basics.email}
          onChange={(e) => updateBasics({ email: e.target.value })}
          placeholder="例如：example@mail.com"
        />
        <Input
          label="出生日期"
          value={basics.birthDate}
          onChange={(e) => updateBasics({ birthDate: e.target.value })}
          placeholder="例如：1998.01"
        />
        <Input
          label="现居地"
          value={basics.location}
          onChange={(e) => updateBasics({ location: e.target.value })}
          placeholder="例如：上海市"
        />
      </div>
    </Section>
  );
};
