import {useNavigate} from 'react-router-dom';

function Item({data}) {
	const navigate = useNavigate();
	const clickHandle = () => {		
		navigate(`/detail/${data.id}`);
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