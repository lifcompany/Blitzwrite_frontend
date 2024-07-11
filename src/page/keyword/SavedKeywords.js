import React from "react";
import ContainerDiv from "../../component/ContainerDiv";
import Title from "../../component/Title";
import UploadBtn from "../../component/UploadBtn";
import Button from "../../component/Button";
import SavedKw from "../../component/SavedKw";
import Header from "../../component/common/header";
import DownloadBtn from "../../component/DownloadBtn";

const SavedKeywords = () => {
  return (

    <ContainerDiv>
      <div className="flex flex-col gap-5 relative">
        <div className="flex sm:flex-row flex-col justify-between items-start">
          <Title label="保存キーワード" />
          <div className="flex sm:flex-row flex-col sm:justify-center sm:gap-6 gap-2">
            <div className="flex sm:gap-6 sm:justify-center justify-between">
              <DownloadBtn />
              <UploadBtn />
            </div>
            <div className="flex justify-end sm:justify-center">
              <Button onClick={() => { }} common label="キーワード保存" />
            </div>
          </div>
        </div>
        <SavedKw />
        <div className="flex justify-end">
          <Button onClick={() => { }} common label="キーワード保存" />
        </div>
      </div>
    </ContainerDiv>

  );
}

export default SavedKeywords;