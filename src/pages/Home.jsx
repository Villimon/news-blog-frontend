import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';

import { fetchComments, fetchPosts, fetchTags } from '../redux/slices/posts';
import { useLocation, useNavigate } from 'react-router-dom';

export const Home = () => {
  const [tag, setTag] = useState(0)

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch()

  const userData = useSelector(state => state.auth.data)
  const { posts, tags, comments } = useSelector(state => state.posts)


  useEffect(() => {
    dispatch(fetchComments())
  }, [])


  const isPostsLoading = posts.status === 'loading'
  const isTagsLoading = tags.status === 'loading'


  const goToPopularityPosts = () => {
    navigate({
      pathname: '/',
      search: '?section=recommended'
    });
    setTag(1)
  }
  const goToNewPosts = () => {
    navigate({
      pathname: '/',
    });
    setTag(0)
  }

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const querySection = query.get("section");

    if (querySection) {
      dispatch(fetchPosts(querySection))
      setTag(1)
    } else {
      dispatch(fetchPosts())
    }
    dispatch(fetchTags())
  }, [tag]);

  const filterComments = (postId) => {
    const arr = comments.items.filter(com => com.postId === postId);
    return arr.length
  }


  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={tag} aria-label="basic tabs example">
        <Tab label="Новые" onClick={goToNewPosts} />
        <Tab label="Популярные" onClick={goToPopularityPosts} />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((post, index) =>
            isPostsLoading
              ? <Post key={index} isLoading={true} />
              : <Post
                key={post._id}
                _id={post._id}
                title={post.title}
                imageUrl={post.imageUrl ? `${process.env.REACT_APP_API_URL}${post.imageUrl}` : ''}
                // imageUrl={post.imageUrl ? `http://localhost:3003${post.imageUrl}` : ''}
                // imageUrl={post.imageUrl ? `https://news-blog-backend.vercel.app${post.imageUrl}` : ''}
                author={post.author}
                createdAt={post.createdAt}
                viewsCount={post.viewCount}
                commentsCount={filterComments(post._id)}
                tags={post.tags}
                isEditable={userData?._id === post.author._id}
              />
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          {/* <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          /> */}
        </Grid>
      </Grid>
    </>
  );
};
