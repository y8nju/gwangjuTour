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
	const tourInfo = datas.find(data => data.id === id)	// params의 id와 data의 id와 비교해서 동일한 정보를 return
	console.log(tourInfo);
	if(tourInfo) {  // document 타이틀 변경
		document.title = `광주어때. :: ${tourInfo.tourDestNm}`
	}



	return ( <aside className="tourListWrap">
	<div className="title" style={{fontWeight: 'bold'}}>
		<button className="backBtn" onClick={backHandle}><i className="fas fa-arrow-left"></i></button>&emsp;
		{tourInfo ? <span>{tourInfo.tourDestNm}</span> : "정보 확인 중"}
	</div>
	<div className="infoDetail">
		<section className="tourInfo">
			{tourInfo ? (<>	{/* 분리하기✨ */}
				<p className="address">
					<span><i className="fas fa-map-marker-alt"></i></span> 
					<span style={{marginLeft: '4px'}}>{tourInfo.addrRoad ? tourInfo.addrRoad : tourInfo.addrJibun}</span>
					<span className="linkRoute">
						<a href={`https://map.kakao.com/link/to/${tourInfo.tourDestNm},${tourInfo.lat},${tourInfo.lng}`}
							target='_blank'>길찾기</a>
					</span>
					</p>
				<p>{tourInfo.tourDestIntro}</p>
				<p><span className="dot">&middot;</span> 지정일자: {tourInfo.dsgnDate}</p>
				<table className="mngAgc">
					<caption><span className="dot">&middot;</span> 관리기관</caption>
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
				
				</>) : "정보 확인 중"}
		</section>
	</div>
	
</aside> );
}

export default Detail;