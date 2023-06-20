import { ChangeEvent, useState } from "react";
import * as S from "./style";
import useUplodaBanner from "@src/hooks/banner/useUploadBanner";

const BannerPost = () => {
  const {
    onChangeUploadData,
    onSubmitUploadData,
    uploadData,
    onChangeImage,
    fileName,
  } = useUplodaBanner();

  return (
    <S.BannerPostWrap>
      <S.BannerPostItemWrap>
        <S.BannerFlex>
          <S.BannerInputBox>
            <S.BannerInputName>제목</S.BannerInputName>
            <S.BannerSmallInput name="title" onChange={onChangeUploadData} />
          </S.BannerInputBox>
          <S.BannerInputBox>
            <S.BannerInputName>보관 기관</S.BannerInputName>
            <S.BannerSmallInput
              name="expireDateTime"
              onChange={onChangeUploadData}
              type="date"
            />
          </S.BannerInputBox>
        </S.BannerFlex>
        <S.BannerInputBox>
          <S.BannerInputName>링크</S.BannerInputName>
          <S.BannerBigInput
            name="url"
            onChange={onChangeUploadData}
            placeholder="https://dodam.b1nd.com"
          />
        </S.BannerInputBox>
        <S.BannerInputBox>
          <S.BannerInputName>이미지</S.BannerInputName>
          <S.BannerFlex>
            <S.BannerFileInputBox
              value={fileName ? fileName.name : "파일을 선택해주세요"}
              disabled
            />
            <S.BannerFileLabel htmlFor="file">이미지 선택</S.BannerFileLabel>
            <S.BannerFileInput
              name="image"
              onChange={onChangeImage}
              type="file"
              id="file"
            />
          </S.BannerFlex>
        </S.BannerInputBox>
      </S.BannerPostItemWrap>
      <S.BannerButtonBox>
        <S.BannerPostSubmitButton onClick={onSubmitUploadData}>
          등록
        </S.BannerPostSubmitButton>
      </S.BannerButtonBox>
    </S.BannerPostWrap>
  );
};

export default BannerPost;
