import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../component/Button";
import ContainerDiv from "../../component/ContainerDiv";
import KwInput from "../../component/KwInput";
import KwTable from "../../component/KwTable";
import Title from "../../component/Title";
import SubTitle from "../../component/SubTitle";


const InitPage = () => {
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate('');
  const handleSaveKeyword = () => {
    console.log("Click Keywords Save Button");
    navigate('/keyword/savedkeywords')
  }
  return (
    <ContainerDiv>
      <div className="flex flex-col gap-5">
        <div>
          <Title label="キーワード生成" />
          <SubTitle order="1" label="キーワードを生成しましょう" sublabel="説明テキスト説明テキスト説明テキスト説明テキスト説明テキスト説明テキスト" />
        </div>
        <KwInput setSuggestions={setSuggestions} />
        <SubTitle order="2" label="キーワードを選んでください" sublabel="説明テキスト説明テキスト説明テキスト説明テキスト説明テキスト説明テキスト" />
        <KwTable suggestions={suggestions} />
        <div className="flex justify-end">
          <Button common label="キーワード保存" onClick={handleSaveKeyword} />
        </div>
      </div>
    </ContainerDiv>
  );
}

export default InitPage;