import React from "react";
import BgImage from "../../component/BgImage";
import Button from "../../component/Button";
import ContainerDiv from "../../component/ContainerDiv";
import Step from "../../component/Step";
import Title from "../../component/Title";


const Preview=()=> {
    const subKeywords = [
        "Name", "keywrd", "family", "friends",
        "React", "Angular", "TypeScript", "Wordpress",
        "PHP", "Django", "Restfull API",
        "keywrd", "keywasdfdsrd", "ksadfdsd", "keywrd", "keywrdsfdsd",
      ]
    
    const chatGptTitle = [
        "1．タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案",
        "2．タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案",
        "3．タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案",
        "4．タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案",
    ]

    return (
        <ContainerDiv>
            <div className="flex gap-5 sm:gap-20 flex-col sm:flex-row">
                <Title label="記事生成" />
                <Step end />
            </div>
            <div className="flex sm:flex-row flex-col gap-4 mt-4">
                <div className="bg-[#F5F8F8] p-6 flex flex-col gap-4">
                    <h1>見出し</h1>
                    <p>タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル</p>
                    <p>タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル</p>
                    <p>タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル</p>
                    <p>タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル</p>
                    <p>タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル</p>
                    <p>タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル</p>
                </div>
                <div className="flex flex-col gap-4">
                    <figure>
                        <BgImage />
                    </figure>
                    <div className="bg-[#F5F8F8] p-6">
                        <div className="bg-white p-6">
                            <h3>目次</h3>
                            <ul>
                                <li>タイトルタイトルタイトルタイトル</li>
                                <li>タイトルタイトルタイトルタイトル</li>
                                <li>タイトルタイトルタイトルタイトル</li>
                                <li>タイトルタイトルタイトルタイトル</li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-4 mt-4">
                            <h2>h2h2h2h2h2h2h2h2</h2>
                            <h3>h3h3h3h3h3</h3>
                            <p>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</p>
                            <p>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</p>
                            <p>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</p>
                        </div>
                    </div>
                    <div className="flex sm:flex-row flex-col items-center gap-2 sm:justify-end justify-center">
                        <p className="text-[14px]">戻る</p>
                        <Button onClick={() => {}} common label="ダウンロード" />
                        <Button onClick={() => {}} common label="Shopifyに記事投稿" />
                        <Button onClick={() => {}} common label="WordPressに記事投稿" />
                        <Button onClick={() => {}} common label="保存する" />
                    </div>
                </div>
            </div>
        </ContainerDiv>
    );
}

export default Preview;