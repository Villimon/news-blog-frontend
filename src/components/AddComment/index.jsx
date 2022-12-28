import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreateComment } from "../../redux/slices/posts";


export const Index = ({ getComments, id, setIsLoading, isLoading }) => {
  const dispatch = useDispatch()

  const profile = useSelector(state => state.auth.data)

  const { register, handleSubmit, reset, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      text: '',
    },
    // валидация только Когда поля изменились 
    mode: 'onChange',
  })


  const onSubmit = async (values) => {
    setIsLoading(true)
    const data = await dispatch(fetchCreateComment({ values, id }))

    if (!data.payload) {
      alert('Не удалось оставить комментарий')
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
    reset({
      text: ''
    })
    getComments()
    setIsLoading(false)
  }





  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={profile && profile.avatarUrl}
        />
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} >
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            disabled={isLoading}
            {...register('text')}
          />
          <Button disabled={isLoading} type='submit' variant="contained">Отправить</Button>
        </form>
      </div>
    </>
  );
};
