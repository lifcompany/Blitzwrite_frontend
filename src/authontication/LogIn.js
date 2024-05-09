import React from 'react';

const Login = () => {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-col flex-grow bg-bottom bg-no-repeat bg-contain"
                style={{ backgroundImage: 'url(https://monovm.com/dashboard/vendors/metronic/media/illustrations/dozzy-1/4.png)' }}>
                <div className="flex flex-col items-center justify-center flex-grow p-10 pb-20">
                    <a href="https://monovm.com/" className="mb-12">
                        <img alt="Logo" src="images/logo.svg" className="h-10" />
                    </a>
                    <div className="w-full max-w-[500px] bg-white rounded-lg shadow-lg p-10 px-20">
                        <form className="w-full" noValidate id="sign_in_form" method="post" action="https://monovm.com/dashboard/login">
                            <input type="hidden" name="_token" value="yor8hTMkxkJkfuqJpfYHYokR9mM7qIbwmb5WXzE8" />
                            <div className="mb-10 text-center">
                                <h1 className="text-2xl font-bold text-gray-800 mb-3">アカウントの作成</h1>
                            </div>
                            <div className="mb-6">
                                <input id="email" name="email" type="text"
                                    className="w-full px-4 py-3  border-b-2 border-gray-200 focus:outline-none focus:border-gray-500"
                                    placeholder="メールアドレス" autoComplete="off" />
                            </div>
                            <div className="mb-6">
                                <input id="password" name="password" type="password"
                                    className="w-full px-4 py-3 border-b-2 border-gray-200 focus:outline-none focus:border-gray-500"
                                    placeholder="パスワード" autoComplete="off" />
                            </div>
                            <div className="flex justify-between items-center mb-6">
                                <label htmlFor="remember_me" className="flex items-center text-sm font-semibold text-gray-700">
                                    <span>半角英数字に記号を組み合わせた8文字以上</span>
                                </label>
                            </div>
                            <button type="submit"
                                className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
                                <span className="inline-block mr-2">アカウントを作成する</span>
                                <span className="inline-block spinner-border spinner-border-sm align-middle"></span>
                            </button>
                            <div className="text-center mt-6 text-sm text-gray-600 uppercase font-semibold">または</div>
                            <a href="https://monovm.com/dashboard/social/redirect/google"
                                className="w-full py-3 flex items-center justify-center bg-gray-100 rounded-lg mt-3 hover:bg-gray-200 focus:outline-none">
                                <img alt="Google Icon" src="images/google-icon.svg" className="h-6 mr-3" />
                                <span className="font-normal text-[#7e8299]">Google アカウントで作成</span>
                            </a>
                            <a href="https://monovm.com/dashboard/social/redirect/google"
                                className="w-full py-3 flex items-center justify-center bg-white border border-gray-300 rounded-2xl mt-3 hover:bg-gray-100 focus:outline-none">
                                <img alt="Google Icon" src="images/google-icon.svg" className="h-6 mr-3" />
                                <span className="text-gray-700 font-bold">Google アカウントで作成</span>
                            </a>
                            <div className="flex justify-center mt-6 space-x-4 text-sm font-semibold text-gray-700">
                                <a href="#" className="hover:text-blue-500 m-auto">ログインはこちら</a>
                            </div>
                            <div className="flex justify-center mt-4 text-gray-700 font-semibold text-sm">
                                <a href="#" className="text-blue-500 font-semibold ">ログインはこちら</a>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="flex items-center justify-center py-10">
                    <div className="flex space-x-4 text-sm font-semibold text-gray-700">
                        <a href="https://monovm.com/vps-server/" className="hover:text-blue-500">Copyright © 2024  </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
