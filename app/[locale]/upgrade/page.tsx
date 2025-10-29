"use client";

import StyledButton from "@/components/StyledButton";

export default function UpgradePage() {
  // Temporarily disabled - feature under development
  return (
    <div className="container py-8 md:py-16">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white rounded-2xl border border-neutral-200 p-8 md:p-12 shadow-card">
          <div className="mb-6">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
              Tính năng đang phát triển
            </h1>
            <p className="text-neutral-600 text-lg">
              Chúng tôi đang hoàn thiện gói Pro để mang đến trải nghiệm tốt nhất cho bạn.
            </p>
          </div>
          
          <div className="bg-neutral-50 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-neutral-900 mb-3">Sắp ra mắt:</h3>
            <ul className="text-left space-y-2 text-neutral-700">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
                Đặt hàng không giới hạn
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
                Hỗ trợ khách hàng ưu tiên
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
                Quản lý đơn hàng nâng cao
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
                Theo dõi kho hàng & phân tích
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <StyledButton 
              variant="secondary" 
              onClick={() => window.history.back()}
            >
              Quay lại
            </StyledButton>
            <StyledButton 
              variant="accent"
              onClick={() => window.location.href = '/'}
            >
              Về trang chủ
            </StyledButton>
          </div>
        </div>
      </div>
    </div>
  );
}