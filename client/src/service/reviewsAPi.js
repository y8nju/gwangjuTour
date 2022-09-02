class ReviewsApi {
    constructor() {
        this.baseURL = "http://127.0.0.1:8080/api/tour/";
        this.postOption= {
            method: "post",
            headers: "multipart/form-data"
        };
        this.getOption = {
            method: "get"
        };
    }
    async read(id) {
        const response = await fetch(this.baseURL+"get?id="+id, this.getOption);
        return await response.json();
    }
    async create(target, writer, comments, score, files) {
        const response = await fetch(this.baseURL, {
            ...this.postOption,
            body: JSON.stringify({
                target, writer, comments, score
            })
        })
        // new FormData();// 파일 전송시
        return await response.json();
    }
}
export default ReviewsApi;