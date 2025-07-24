class NumberPagination<T, K> {
  // 필수 속성
  data: T[] = [];
  message?: K;
  lastFetchAt?: Date;
  // new 하면 실행 될 생성자 함수
  constructor(data: T[], message?: K, lastFetchAt?: Date) {
    this.data = data;
    this.message = message;
    this.lastFetchAt = lastFetchAt;
  }
}

const a = new NumberPagination<string, number>(["문유비", "문소정"], 2025);
