import React from "react";
import { assets } from '../assets/assets';
import Title from '../components/Title';
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
    return (
        <div>

            <div className="text-2xl text-center pt-8 border-t">
                <Title text1={'VỀ'} text2={'CHÚNG TÔI'} />
            </div>

            <div className="my-10 flex flex-col md:flex-row gap-16">
                <img className="w-full md:max-w-[480px]" src={assets.aboutuss} alt="" />
                <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
                    <p>Tại HNT Cosmetics, chúng tôi tin rằng vẻ đẹp không biên giới. Nền tảng của chúng tôi được tạo ra để mang những thương hiệu mỹ phẩm quốc tế cao cấp đến gần hơn với bạn, kết hợp giữa sự sang trọng, đổi mới và chăm sóc tận tâm trong từng sản phẩm.</p>
                    <p>Với mỗi sản phẩm, chúng tôi mong muốn nâng tầm hành trình làm đẹp của bạn – trở nên cá nhân hóa hơn, đầy cảm hứng và tràn ngập niềm vui.</p>
                    <p>Chúng tôi tự hào tuyển chọn bộ sưu tập độc quyền gồm các sản phẩm trang điểm, chăm sóc da, nước hoa và chăm sóc cá nhân đến từ những thương hiệu danh tiếng toàn cầu. Cam kết của chúng tôi là mang đến cho bạn sự chính hãng, chất lượng và trải nghiệm tuyệt vời, để bạn luôn mua sắm với sự tin tưởng tuyệt đối.</p>
                    <b className="text-gray-800">Sứ Mệnh Của Chúng Tôi</b>
                    <p>Tại HNT Cosmetics, sứ mệnh của chúng tôi là truyền cảm hứng tự tin và tôn vinh sự khác biệt. Chúng tôi không ngừng nỗ lực mang đến những giải pháp làm đẹp cao cấp, phù hợp với mọi loại da, mọi phong cách và mọi giấc mơ riêng biệt. Với chúng tôi, làm đẹp không chỉ là một thói quen – đó là một hành trình cá nhân đầy bản lĩnh và thể hiện bản thân.</p>
                    <p>Dù bạn đang tôn vinh vẻ đẹp tự nhiên hay khám phá một phong cách táo bạo, HNT luôn đồng hành cùng bạn với những sản phẩm phản chiếu con người thật của bạn. Mỗi đơn hàng không chỉ là một món quà làm đẹp, mà còn là sự tự tin, chân thực và sức mạnh để bạn tỏa sáng theo cách riêng của mình.</p>
                </div>
            </div>

            <div className="text-4xl py-4">
                <Title text1={'LÍ DO'} text2={'BẠN NÊN CHỌN CHÚNG TÔI'} />
            </div>

            <div className="flex flex-col md:flex-row text-sm mb-20">
                <div className="md:px-16 py-8 sm:py-20 flex flex-col gap-5">
                    <b>Thương Hiệu Quốc Tế Chính Hãng</b>
                    <p className="text-gray-600">Chúng tôi chỉ hợp tác với các nhà cung cấp và nhà phân phối được ủy quyền, cam kết 100% sản phẩm chính hãng.</p>
                </div>
                <div className="md:px-16 py-8 sm:py-20 flex flex-col gap-5">
                    <b>Trải Nghiệm Mua Sắm Đẳng Cấp</b>
                    <p className="text-gray-600">Từ giao diện mua sắm mượt mà đến đóng gói sang trọng, chúng tôi mang đến cho bạn cảm giác như đang bước vào một cửa hàng cao cấp ngay tại nhà.</p>
                </div>
                <div className="md:px-16 py-8 sm:py-20 flex flex-col gap-5">
                    <b>Đội Ngũ Chuyên Gia Làm Đẹp</b>
                    <p className="text-gray-600">Đội ngũ tư vấn chuyên nghiệp luôn sẵn sàng hỗ trợ bạn với lời khuyên cá nhân hóa và dịch vụ tận tâm, nhanh chóng.</p>
                </div>
            </div>

            <NewsletterBox />
        </div>
    )
};

export default About;
