import { useEffect, useState } from "react";
import ReviewsList from "./reviewList";
function Review({reviews}) {
	console.log(reviews);
	const submitHandel = (e) => {
		e.preventDefault(); // 엔터 전송 막기
	}
	return ( <div className="reviewsContainer">
		<div>
			{reviews ? (reviews.map(review=> <ReviewsList key={review._id} data={review} />)) : "로드중"}
		</div>
		<form onSubmit={submitHandel}>
			<input type="text" />
			<button>전송</button>
		</form>
	</div> );
}

export default Review;