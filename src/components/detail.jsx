import { useRef } from "react";
import { useContext, useEffect, useState } from "react";
import {useParams, useNavigate} from "react-router-dom"
import {Store} from '../App';
const {kakao} = window; // 카카오맵

function Detail() {
    const ctx = useContext(Store);
	const {datas} = ctx;
	const {id} = useParams();
	const navigate = useNavigate();
	const backHandle =() => navigate(-1); // 이전 페이지로
	const divRef = useRef();
	const tourInfo = datas.find(data => data.id === id)	// params의 id와 data의 id와 비교해서 동일한 정보를 return
	console.log(tourInfo);
	if(tourInfo) {  // document 타이틀 변경
		document.title = `광주어때. :: ${tourInfo.tourDestNm}`
	}

	useEffect(() => {
		var roadview = new kakao.maps.Roadview(divRef.current); //로드뷰 객체
		var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

		var position = new kakao.maps.LatLng(33.450701, 126.570667);

		// 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
		roadviewClient.getNearestPanoId(position, 50, function(panoId) {
			roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
		});
	}, [])

	return ( <aside className="tourListWrap">
	<div className="title" style={{fontWeight: 'bold'}}>
		<button className="backBtn" onClick={backHandle}><i className="fas fa-arrow-left"></i></button>&emsp;
		{tourInfo ? <span>{tourInfo.tourDestNm}</span> : "정보 확인 중"}
	</div>
	<div className="infoDetail">
		<section className="tourInfo">
			{tourInfo ? (<>	{/* 분리하기✨ */}
				<p ><span><i className="fas fa-map-marker-alt"></i></span> {tourInfo.addrRoad}</p>
				<p>{tourInfo.tourDestIntro}</p>
				<p>지정일자: {tourInfo.dsgnDate}</p>
				<table className="mngAgc">
					<caption>관리기관</caption>
					<tbody>
						<tr>
							<th>관리기관</th>
							<td>{tourInfo.mngAgcNm}</td>
						</tr>
						<tr>
							<th>관리기관전화번호</th>
							<td>{tourInfo.mngAgcTel}</td>
						</tr>
					</tbody>
				</table>
				<a href={`https://map.kakao.com/link/to/${tourInfo.tourDestNm},${tourInfo.lat},${tourInfo.lng}`}
					target='_blank'>길찾기</a>
				
				<div className="roadView" ref={divRef} style={{width: '200px', height: '200px'}}></div>
				</>) : "정보 확인 중"}
		</section>
	</div>
	
</aside> );
}

export default Detail;