import { useRef, useEffect, useContext, useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {Store} from '../App';
const {kakao} = window; // 카카오맵

function Map() {
	const [showRoadView, setShowRoadView] = useState(false);
	const [zoom, setZoom] = useState(false);
    const ctx = useContext(Store);
	const {datas, center, updateCenter} = ctx;
	const {pathname} = useLocation();
	const navigate = useNavigate();
	console.log('pathname', pathname)
	const divRef = useRef();
	const roadViewRef = useRef();
	useCallback(() => {
		if(pathname === '/gwangjuTour/'){
			updateCenter({lat: 35.1599785, lng: 126.8513072})
		}
	}, [pathname])
	useEffect(() => {
		const options ={
			center: new kakao.maps.LatLng(center.lat, center.lng),
			level: pathname.startsWith('/gwangjuTour/detail') ? 4 : 8
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
				navigate(`/gwangjuTour/detail/${data.id}`);
			  })
			return marker
		})
		clusterer.addMarkers(markers);

	}, [datas, center, pathname])

	useEffect(() => {
		var roadview = new kakao.maps.Roadview(roadViewRef.current); //로드뷰 객체
		var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

		var position = new kakao.maps.LatLng(center.lat, center.lng);

		// 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
		roadviewClient.getNearestPanoId(position, 50, function(panoId) {
			roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
			
			if(pathname.startsWith('/gwangjuTour/detail')) {
				setShowRoadView(true)
			} else {
				setShowRoadView(false)
			}
			if(!panoId) {
				setShowRoadView(false)
			}
		});

	}, [pathname])


	return (<section className="mapWrap">
		<div className="map" ref={divRef}></div>
		<div className={"roadViewWrap"+ (showRoadView ? ' on' : '') + (zoom ?  ' zoom' : '')}>
			<div className="zoomIcon" onClick={() => setZoom(!zoom) }>
				{zoom ? <i class="fas fa-minus"></i>:
					<i class="fas fa-plus"></i>}
			</div>
			<div className="roadView" ref={roadViewRef}>
		</div>
		</div>
	</section> );
}

export default Map;