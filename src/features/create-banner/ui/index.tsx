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
    <aside className="w-120 flex flex-col large-container gap-6">
      <h1 className="text-heading1 font-bold">배너 등록</h1>
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
            className="h-full w-full object-cover"
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
