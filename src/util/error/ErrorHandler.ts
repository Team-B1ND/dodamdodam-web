import { AxiosError } from "axios";

class ErrorHandler {
  loginError = (status: number) => {
    switch (status) {
      case 401: 
        return "잘못된 비밀번호입니다";
      case 404:
        return "존재하지 않는 멤버입니다.";
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

  busError = (error: AxiosError) => {
    const status = error.response?.status;
    const message = (error.response?.data as AxiosError)?.message;

    switch (status) {
      case 423:
        return "버스가 만석입니다.";
      case 500:
        return "서버 오류가 발생하였습니다.";
      default:
        return message;
    }
  };
}

export default new ErrorHandler();
