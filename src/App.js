import React, { createContext, Fragment, useCallback, useEffect, useReducer, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/header';
import Content from './components/content';
import Detail from './components/detail';
import Error from './components/error';
import { TourAPI } from './service/tourApi';	// API 추가
import './App.css';
import Map from './components/map';

const tourAPI = new TourAPI();	// API 추가

const reducer = function(state, action) {	// 상태관리는 reducer로
	// eslint-disable-next-line default-case
	switch(action.type) {
		case "setDatas": 
			return {...state, datas: action.datas}; // 기존에 있던 state는 유지, datas 추가
	}
	return state;	// state를 return
}

export const Store = createContext({});

function App() {
    const [state, dispatch] = useReducer(reducer, {version : 1.0, datas: [] } );	// 상태관리는 reducer로
	const [center, setCenter] = useState({lat: 35.1599785, lng: 126.8513072});
	useEffect(()=> {
		tourAPI.getInfos()
			.then(recv => {
                dispatch({type : "setDatas", datas : recv.TourDestBaseInfo });
			})
	}, [])
	const updateCenter = (data) => {
		setCenter(data);
	};
	const datas = state.datas;
	return (<Fragment>
		<Store.Provider value={{datas, updateCenter, center}}>	{/* 전체적으로 datas 넘기기 */}
			<Header />
			<main>
				<BrowserRouter>
					<Map />
					<Routes>
						<Route path='/gwangjuTour/' element={<Content />} />    {/* state.datas넘기기 */}
						<Route path='/gwangjuTour/detail/:id' element={<Detail />} />
						<Route path='*' element={<Error />} />
					</Routes>
				</BrowserRouter>
			</main>
		</Store.Provider>
	</Fragment>);
}

export default App;
