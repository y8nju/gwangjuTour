import { useRef, useEffect, useContext, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {Store} from '../App';
const {kakao} = window; // 카카오맵

function Map() {
    const ctx = useContext(Store);
	const {datas, center, updateCenter} = ctx;
	const {pathname} = useLocation();
	const navigate = useNavigate();
	console.log('pathname', pathname)
	const divRef = useRef();
	useCallback(() => {
		if(pathname == '/'){
			updateCenter({lat: 35.1599785, lng: 126.8513072})
		}
	}, [pathname])
	useEffect(() => {
		const options ={
			center: new kakao.maps.LatLng(center.lat, center.lng),
			level: pathname.startsWith('/detail') ? 4 : 8
		}
		const map = new kakao.maps.Map(divRef.current, options);    // 카카오맵 추가
		
		// 마커 클러스터러를 생성합니다 
		const clusterer = new kakao.maps.MarkerClusterer({
			map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
			averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
			minLevel: 6 // 클러스터 할 최소 지도 레벨 
		});
		// 지도의 영역을 반환한다.
		const bounds = map.getBounds();

		// 마커를 생성합니다
		// 마커를 배열로 만들기
		const markers = datas.map(data => {
			// 영역 객체가 인수로 주어진 좌표를 포함하는지 확인한다.
			let rst = bounds.contain(new kakao.maps.LatLng(data.lat, data.lng));
			// console.log(rst)
			let marker = new kakao.maps.Marker({
				title: data.tourDestNm,
				position: new kakao.maps.LatLng(data.lat, data.lng),
				clickable: true
			});
			// marker.setMap(map);
			kakao.maps.event.addListener(marker, 'click', function(){
				console.log('mouseEvent',data )
				updateCenter({lat: data.lat, lng: data.lng});
				navigate(`/detail/${data.id}`);
			  })
			return marker
		})
		clusterer.addMarkers(markers);

		// 마커가 지도 위에 표시되도록 설정합니다
	}, [datas, center, pathname])	// value가 바뀔 때!


	return (<section className="mapWrap">
		<div className="map" ref={divRef}></div>
	</section> );
}

export default Map;