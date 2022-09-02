import Item from "./item";
import {Store} from '../App';
import { useContext } from "react";

function TourList() {
    const value = useContext(Store);
	value.sort((a, b)=> {	// 이름순 정렬
		return a.tourDestNm < b.tourDestNm ? -1 : a.tourDestNm > b.tourDestNm ? 1 : 0;
	})
	return ( <section className="tourListWrap">
		<div className="title">관광지 정보 <span>{value.length}개</span></div>
		<div className="tourList">
			<ul> 
				{value.map(data => <Item data={data} key={data.id}/>)}
			</ul>
		</div>
	</section> );
}

export default TourList;