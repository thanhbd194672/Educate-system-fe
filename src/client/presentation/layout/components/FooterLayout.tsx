import React from 'react';

const navigation = [
    {name: 'Trang chủ', href: '/', current: true},
    {name: 'Thầy cô', href: '/', current: false},
    {name: 'Khoá học', href: '/', current: false},
    // {name: 'Đăng nhập', href: '/', current: false},
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
const FooterLayout = () => {
    return (
        <div className="bg-white mt-10">
            <div className="container 2xl">
                <div className="grid grid-cols-4 mx-14 ">
                    <div className="flex flex-col ml-1 mr-4 pt-4">
                        <h3>Học trực tuyến</h3>

                        <ul className="list-none p-0 mt-2">
                            <li>Về chúng tôi</li>
                            <li>Điều khoản</li>
                            <li>Chính sách bảo mật</li>
                            <li>Báo cáo sự cố</li>
                        </ul>

                    </div>
                    <div className="flex flex-col ml-1 mr-4 pt-4">
                        <h3>Liên hệ</h3>

                        <ul className="list-none p-0 mt-2">
                            <li>Số 1 Đại Cồ Việt, Bách Khoa, Hai Bà Trưng, Hà Nội</li>
                            <li>0906097829</li>
                            <li>Thanh.bd194672@sis.hust.edu.vn</li>
                        </ul>

                    </div>
                    <div className="flex col-span-2 my-auto ml-64">
                        <img
                            className="h-28 w-auto"
                            src="@/../img/logo.png"
                            alt="Logo"
                        />
                    </div>
                </div>
                <hr className="h-px my-1 bg-black"/>
                <div className="flex justify-between mb-1 ">
                    <div className="flex flex-row">@ 2023 All Rights Reserved</div>
                    <div className="flex flex-row mr-44">
                        {navigation.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="text-stone-950 hover:bg-sky-200 hover:text-green-900','rounded-md px-3 py-2 text-sm font-bold"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default FooterLayout;
