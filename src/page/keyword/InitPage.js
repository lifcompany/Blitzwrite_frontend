import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../component/Button";
import ContainerDiv from "../../component/ContainerDiv";
import KwInput from "../../component/KwInput";
import KwTable from "../../component/KwTable";
import Title from "../../component/Title";


const InitPage=()=> {
  const navigate = useNavigate('');
  const handleSaveKeyword=()=>{
    console.log("Click Keywords Save Button");
    navigate('/keyword/savedkeywords')
  }
  return (
    <ContainerDiv>
      <div className="flex flex-col gap-5">
        <div>
          <Title label="キーワード生成"/> 
          <p>説明テキスト説明テキスト説明テキスト説明テキスト説明テキスト</p>
        </div>
        <KwInput/>
        <KwTable/>
        <div className="flex justify-end" onClick={handleSaveKeyword}>
          <Button common label="キーワード保存"/>
        </div>
      </div>
    </ContainerDiv>
  );
}

export default InitPage;