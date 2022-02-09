import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { allReview } from "../api/review";

function Review() {
  const [reviews, setReviews] = useState([]);
  const allReviews = {
    message: "성공",
    data: [
      {
        id: 0,
        userId: 0,
        hospitalId: 0,
        content: "너무좋네요.너무좋네요.너무좋네요.너무좋네요.",
        rate: 4,
        createTime: "2022-02-07T14:02:14.289Z",
      },
    ],
  };
  useEffect(() => {
    allReview(
      (res) => {
        setReviews(res.data.data);
        console.log(reviews, "리뷰가져오기성공");
      },
      () => {
        console.log("리뷰가져오기성공");
      }
    );
  }, []);
  const reviewlen = allReviews.data.length;
  return (
    <Container>
      <Typography variant="h4" component="h1" sx={{ mt: 10, mb: 2, fontWeight: 600 }}>
        리뷰
      </Typography>
      <Box sx={{ border: "1px solid blue", mb: 4 }}>어떤걸 할지... 아직 안정함</Box>
      <Box sx={{ border: "1px solid #309FB3", borderRadius: "4px", mb: 2 }}>
        <Typography sx={{ fontWeight: "600" }}>모든 리뷰({reviewlen})</Typography>
        <Box>최신순</Box>
        <Box>평점순</Box>
      </Box>
      <Box>
        {reviews.map((review, idx) => {
          return (
            <Box key={idx} sx={{ border: 1, p: 3, mb: 1 }}>
              <p>{review.id}</p>
              <p>{review.rate}</p>
              <p>{review.username}</p>
              <p>{review.hospitalId}</p>
              <p>{review.content}</p>
              <p>{review.createTime}</p>
            </Box>
          );
        })}
      </Box>
    </Container>
  );
}

export default Review;
