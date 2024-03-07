class ErrorHandler {
  authError = (status: number) => {
    switch (status) {
      case 404:
        return "존재하지 않는 멤버입니다.";
      case 403:
        return "잘못된 비밀번호입니다.";
      default:
        return "로그인에 실패하였습니다.";
    }
  };
}

export default new ErrorHandler();
