// 검증 결과를 전달하는데 사용하는 클래스
export class ValidationResult {
  success: boolean;
  message?: string;

  constructor(success: boolean, message?: string) {
    this.success = success;
    this.message = message;
  }
}
