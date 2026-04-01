import { FilledButton, FilledTextField } from "@b1nd/dodam-design-system/components";
import { useCreateBanner } from "@/features/create-banner/model/useCreateBanner";

const CreateBanner = () => {
  const {
    imageUrl,
    linkUrl,
    fileInputRef,
    setLinkUrl,
    openImagePicker,
    changeBannerImage,
    submit,
    isPending,
    isUploadPending,
  } = useCreateBanner();

  return (
    <aside className="flex flex-col gap-6 w-100 min-w-100 large-container">
      <h1 className="font-bold text-heading1">배너 등록</h1>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={changeBannerImage}
      />
      <div
        className="w-full aspect-6.5/1 flex justify-center items-center overflow-hidden rounded-medium bg-fill-primary text-headline font-bold text-text-tertiary cursor-pointer"
        onClick={openImagePicker}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="banner-preview"
            className="object-cover w-full h-full"
          />
        ) : (
          <span>{isUploadPending ? "이미지 업로드 중.." : "배너 이미지 업로드"}</span>
        )}
      </div>
      <FilledTextField
        type="text"
        label="링크"
        placeholder="이동할 링크"
        value={linkUrl}
        onChange={(e) => setLinkUrl(e.target.value)}
      />
      <FilledButton
        size="large"
        onClick={submit}
        disabled={isPending || isUploadPending}
      >
        {isPending ? "배너 등록 중.." : "배너 등록 완료"}
      </FilledButton>
    </aside>
  );
}

export default CreateBanner
