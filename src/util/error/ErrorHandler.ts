class ErrorHandler {
  loginError = (status: number) => {
    switch (status) {
      case 404:
        return "존재하지 않는 멤버입니다.";
      case 403:
        return "잘못된 비밀번호입니다.";
      case 500:
        return "서버 오류가 발생하였습니다.";
      default:
        return "로그인에 실패하였습니다.";
    }
  };

  signupError = (status: number) => {
    switch (status) {
      case 409:
        return "이미 존재하는 멤버(ID)입니다.";
      case 500:
        return "서버 오류가 발생하였습니다.";
      default:
        return "회원가입에 실패하였습니다.";
    }
  };
}

export default new ErrorHandler();
