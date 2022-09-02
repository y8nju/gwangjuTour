const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
	target: String,	// 관광지 ID
	writer: String,	//작성자
	comments: String,	// 리뷰
	score: Number,	// 평점 (1~5)
	photos: {type: Array, default: []},	// 사진
	date: {
		type: Date,
		default: new Date()
	}
})
module.exports = mongoose.model("Review",reviewSchema)