const express = require("express");
// reviews router 적용시 app.js내 campground/:id 값과 reviews.js 내 /:reviewId
// 매개변수 병합을 위해서 mergeParams 설정해야 함
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const Campground = require("../models/campground");
const Review = require("../models/review");
const reviews = require("../controllers/reviews");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");

router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));

// 리뷰 데이터 삭제하기
// mongodb의 $pull 이용해 campground id 데이터중 reviews 배열의 reviewId 값을 가져옴
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.deleteReview)
);

module.exports = router;
