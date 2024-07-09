import React from "react";
import ContainerDiv from "../../component/ContainerDiv";
import Title from "../../component/Title";
import UploadBtn from "../../component/UploadBtn";
import Button from "../../component/Button";
import SavedKw from "../../component/SavedKw";
import Header from "../../component/common/header";

const SavedKeywords = () => {
  return (

        <ContainerDiv>
          <div className="flex flex-col gap-5 relative">
            <div className="flex sm:flex-row flex-col justify-between items-start">
              <Title label="保存キーワード" />
              <div className="flex flex-row justify-center gap-6">
                <UploadBtn />
                <Button common label="キーワード保存" />
              </div>
            </div>
            <SavedKw />
            <div className="flex justify-end">
              <Button common label="CSVダウンロード" />
            </div>
          </div>
        </ContainerDiv>

  );
}

export default SavedKeywords;