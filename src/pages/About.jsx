import React from 'react';

const About = () => {
  return (
    <section className="py-16 bg-light">
      <div className="container mx-auto px-4 md:px-6 lg:px-36">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-700 mb-8 text-center">
            Về Chúng Tôi
          </h1>
          
          <div className="bg-white rounded-lg shadow-md p-8 mb-10">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Câu Chuyện Của Chúng Tôi
            </h2>
            <p className="text-gray-600 mb-6">
              Chúng tôi là một công ty công nghệ tiên phong, được thành lập vào năm 2015 với sứ mệnh đơn giản: 
              giúp các doanh nghiệp phát triển trong kỷ nguyên số. Từ những ngày đầu khiêm tốn với chỉ 5 thành viên, 
              chúng tôi đã phát triển thành một đội ngũ hơn 100 chuyên gia tài năng trên khắp thế giới.
            </p>
            <p className="text-gray-600 mb-6">
              Với hơn 8 năm kinh nghiệm, chúng tôi đã hợp tác với hàng trăm doanh nghiệp từ các startup nhỏ đến 
              các tập đoàn Fortune 500, giúp họ chuyển đổi số và đạt được mục tiêu kinh doanh.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8 mb-10">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Sứ Mệnh & Tầm Nhìn
            </h2>
            <div className="mb-6">
              <h3 className="text-xl font-medium text-primary mb-2">Sứ Mệnh</h3>
              <p className="text-gray-600">
                Trao quyền cho doanh nghiệp thông qua các giải pháp công nghệ sáng tạo, giúp họ phát triển 
                và thành công trong thế giới kỹ thuật số ngày càng phức tạp.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-primary mb-2">Tầm Nhìn</h3>
              <p className="text-gray-600">
                Trở thành đối tác công nghệ đáng tin cậy nhất, nơi mà mọi doanh nghiệp tìm đến khi họ cần 
                chuyển đổi số và phát triển trong kỷ nguyên mới.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Giá Trị Cốt Lõi
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-medium text-primary mb-2">Đổi Mới</h3>
                <p className="text-gray-600">
                  Chúng tôi luôn tìm kiếm những cách tiếp cận mới và sáng tạo để giải quyết các thách thức.
                </p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-medium text-primary mb-2">Chất Lượng</h3>
                <p className="text-gray-600">
                  Chúng tôi cam kết cung cấp sản phẩm và dịch vụ chất lượng cao nhất.
                </p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-medium text-primary mb-2">Hợp Tác</h3>
                <p className="text-gray-600">
                  Chúng tôi tin vào sức mạnh của làm việc nhóm và xây dựng mối quan hệ đối tác lâu dài.
                </p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-medium text-primary mb-2">Trách Nhiệm</h3>
                <p className="text-gray-600">
                  Chúng tôi chịu trách nhiệm về hành động của mình và cam kết đạt được kết quả.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
