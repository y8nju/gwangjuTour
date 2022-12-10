export class TourAPI {
	
	constructor() {
		this.baseURL = "http://apis.data.go.kr/6290000/tourdestbaseinfo/gettourdestbaseinfo";
		this.serviceKey = process.env.REACT_APP_API_KEY	// .env로 key 설정
	}
	async getInfos(tourDestNm) {    // tourDestNm 받기
		const type = "json"
		
		const response = await fetch(this.baseURL+"?serviceKey="+this.serviceKey+"&type="+type );
		return await response.json();
	}
}