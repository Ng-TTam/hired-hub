import React from 'react';
import { Layout, Row, Col, Typography, Space } from 'antd';
import { TwitterOutlined, FacebookOutlined, InstagramOutlined, YoutubeOutlined, GoogleOutlined } from '@ant-design/icons';
import images from '../../assets/images';
import '../../styles/Footer.scss';

const { Footer } = Layout;
const { Title, Text, Link } = Typography;

const WebsiteFooter = () => {
  return (
    <Footer className="footer bg-gray-900 text-gray-400 py-16">
      <div className="max-w-7xl mx-auto">
        <Row gutter={[64, 32]}>
          {/* Logo and Description */}
          <Col xs={24} sm={24} md={8} lg={8}>
            <Space direction="vertical" size="large" className="w-full">
              <img 
                style={{width: "15em"}}
                src={images.hiredHubLogo}
                alt="Hired-hub Logo" 
                className="h-10"
              />
              <Text className="text-gray-400">
                Hired hub giúp tìm việc làm giúp kết nối nhanh chóng giữa người tìm việc và nhà tuyển dụng. 
                Người dùng có thể tìm kiếm công việc theo ngành nghề, vị trí, mức lương và ứng tuyển dễ dàng. 
                Nhà tuyển dụng có thể đăng tin tuyển dụng và tìm kiếm ứng viên phù hợp.
              </Text>
            </Space>
          </Col>

          {/* About Us */}
          <Col xs={24} sm={12} md={5} lg={5}>
            <Space direction="vertical" size="middle" className="w-full">
              <Title level={5} className="text-white mb-4">Về chúng tôi</Title>
              <Link href="#" className="link hover:text-white block">Giới thiệu</Link>
              <Link href="#" className="link text-gray-400 hover:text-white block">Tuyển dụng</Link>
              <Link href="#" className="link text-gray-400 hover:text-white block">Hỏi đáp</Link>
              <Link href="#" className="link text-gray-400 hover:text-white block">Điều khoản dịch vụ</Link>
              <Link href="#" className="link text-gray-400 hover:text-white block">Chính sách bảo mật</Link>
            </Space>
          </Col>

          {/* Customer Care */}
          <Col xs={24} sm={12} md={5} lg={5}>
            <Space direction="vertical" size="middle" className="w-full">
              <Title level={5} className="text-white mb-4">Hồ sơ và CV</Title>
              <Link href="#" className="link text-gray-400 hover:text-white block">Quản lý CV của bạn</Link>
              <Link href="#" className="link text-gray-400 hover:text-white block">Hướng dẫn viết CV</Link>
              <Link href="#" className="link text-gray-400 hover:text-white block">Thư viện CV</Link>
              <Link href="#" className="link text-gray-400 hover:text-white block">Review CV</Link>
            </Space>
          </Col>

          {/* Contact Us */}
          <Col xs={24} sm={24} md={6} lg={6}>
            <Space direction="vertical" size="middle" className="w-full">
              <Title level={5} className="text-white mb-4">Liên hệ</Title>
              <Text className="text-gray-400">
                70 Trần Phú, Hà Đông, Hà Nội
              </Text>
              <Text className="text-gray-400 hover:text-white block">
                Email: chamsokhachhang.help@gmail.com
              </Text>
              <Text className="text-gray-400 hover:text-white block">
                Phone: +1 1123 456 780
              </Text>
              <Space size="large" className="mt-4">
                <TwitterOutlined className="text-xl hover:text-white cursor-pointer" />
                <FacebookOutlined className="text-xl hover:text-white cursor-pointer" />
                <InstagramOutlined className="text-xl hover:text-white cursor-pointer" />
                <YoutubeOutlined className="text-xl hover:text-white cursor-pointer" />
                <GoogleOutlined className="text-xl hover:text-white cursor-pointer" />
              </Space>
            </Space>
          </Col>
        </Row>
      </div>
    </Footer>
  );
};

export default WebsiteFooter;