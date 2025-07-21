// 클래스는 속성과 메서드 존재함.
class Game {
  name: string;
  country: string;
  download: number;
  // new 붙여서 실행하면 결과로. constructor : 인스턴스 생성자
  constructor(name: string, country: string, download: number) {
    this.name = name;
    this.country = country;
    this.download = download;
  }

  // 메서드
  introduce() {
    return `${this.name} 게임은 ${this.country} 에서 개발, ${this.download} 만큼 인기가 있습니다.`;
  }
}

/**
 * {
 *  name:string
 *  country:string
 *  download:number
 *  introduce(): string
 * }
 */
const game = new Game("포트리스", "한국", 100);
console.log(game.name);
console.log(game.country);
console.log(game.download);
