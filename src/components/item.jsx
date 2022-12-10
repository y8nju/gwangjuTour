import { useContext } from "react";
import {useNavigate} from 'react-router-dom';
import { Store } from '../App';

function Item({data}) {
	const ctx = useContext(Store);
	const {updateCenter} = ctx;
	const navigate = useNavigate();

	const clickHandle = () => {	
		const center = {lat: data.lat, lng: data.lng}
		updateCenter(center)
		navigate(`/gwangjuTour/detail/${data.id}`);
	}
	return ( <li>
		<div className="tourItem" onClick={clickHandle}>
			<p className="dsgnDate">{data.dsgnDate}</p>
			<h3 className="tourDestNm">{data.tourDestNm}</h3>
			<p className="addrRoad">{data.addrRoad.split(' ', 2).join(' ')}</p>
			<p className="tourDestIntro">{data.tourDestIntro}</p>
			{/* <p>{data.mngAgcTel}</p> */}
		</div>
	</li> );
}

export default Item;