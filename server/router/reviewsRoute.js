const {Router} = require('express');
const { model } = require('mongoose');
const ReviewSchema = require('../model/review');
const router = Router();

router.use((req, res, next)=> {
    next();
});

//query로 전달받은 id에 해당하는 리뷰를 응답 보냄
router.get('/get', async (req, res) => {
    const {id} = req.query;
    try {
        const reviews = await ReviewSchema.find({target: id}).lean(); // 관광지 id가 일치하는 리뷰 전체 찾기
        res.status(200).json({result: true, datas: reviews});   // 찾은 정보(reviews)를 datas로 넘기기
    } catch(e) {
        console.log(e.message);
        res.status(500).json({result: false});
    }
});

// body로 전달받은 데이터들을 문서화로 DB에 저장하고 결과 출력
// multer 추가하기!
router.post('/post', async (req, res)=> {
    try{
        const photos = [];  // 사진은 배열로 넘어감
        const doc = {...req.body, photos};   // req.body로 넘어온 데이터 분해
        const recv = await ReviewSchema.create(doc);  // DB에 새로운 데이터 저장
        res.status(200).json({result: true, data: recv}); //json으로 저장한 정보를 data로 넘기기
    }catch(e){
        console.log(e.message);
        res.status(500).json({result: false});
    }
})

module.exports = router;