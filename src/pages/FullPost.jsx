import React, { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown'
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchRemoveComments } from "../redux/slices/posts";

export const FullPost = () => {
  const [data, setData] = useState()
  const [comments, setComments] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()

  const dispatch = useDispatch()
  const userData = useSelector(state => state.auth.data)



  useEffect(() => {
    axios.get(`/posts/${id}`)
      .then(res => {
        setData(res.data)
      })
      .catch((err) => {
        console.warn(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])


  useEffect(() => {
    getComments()
  }, [isLoading])

  const getComments = () => {
    axios.get(`/comments/${id}`)
      .then(res => {
        setComments(res.data)
      })
      .catch((err) => {
        console.warn(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }


  const removeComment = (commentId) => {
    setIsLoading(true)
    if (window.confirm('Вы действительно хотите удалить комментарий?')) {
      dispatch(fetchRemoveComments(commentId))
    }
  }



  return (
    <>
      {data
        ? <Post
          id={data._id}
          title={data.title}
          imageUrl={data.imageUrl ? `${process.env.REACT_APP_API_URL}${data.imageUrl}` : ''}
          // imageUrl={data.imageUrl ? `http://localhost:3003${data.imageUrl}` : ''}
          // imageUrl={data.imageUrl ? `https://news-blog-backend.vercel.app${data.imageUrl}` : ''}
          author={data.author}
          createdAt={data.createdAt}
          viewsCount={data.viewCount}
          commentsCount={comments && comments.length}
          tags={data.tags}
          isFullPost
        >
          <ReactMarkdown children={data.text} />
        </Post>
        : <div>Loading</div>
      }
      {comments && <CommentsBlock
        items={comments}
        isLoading={isLoading}
        removeComment={removeComment}
        userData={userData}
      >
        <Index getComments={getComments} setIsLoading={setIsLoading} isLoading={isLoading} id={id} />
      </CommentsBlock>}
    </>
  );
};
