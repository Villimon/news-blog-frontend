import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';

import { useParams } from 'react-router-dom';
import { fetchTag, fetchTags } from '../redux/slices/posts';

export const HomeByTag = () => {
  const dispatch = useDispatch()
  const { tag } = useParams()
  const userData = useSelector(state => state.auth.data)
  const { posts, tags } = useSelector(state => state.posts)

  const isPostsLoading = posts.status === 'loading'
  const isTagsLoading = tags.status === 'loading'

  useEffect(() => {
    dispatch(fetchTag(tag))
    dispatch(fetchTags())
  }, [tag])


  return (
    <>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          <h1 style={{ margin: 0, marginBottom: 10, color: '#ccc' }} >#{tag}</h1>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((post, index) =>
            isPostsLoading
              ? <Post key={index} isLoading={true} />
              : <Post
                _id={post._id}
                title={post.title}
                imageUrl={post.imageUrl ? `${process.env.REACT_APP_API_URL}${post.imageUrl}` : ''}
                // imageUrl={post.imageUrl ? `http://localhost:3003${post.imageUrl}` : ''}
                author={post.author}
                createdAt={post.createdAt}
                viewsCount={post.viewCount}
                commentsCount={3}
                tags={post.tags}
                isEditable={userData?._id === post.author._id}
              />
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
        </Grid>
      </Grid>
    </>
  );
};
