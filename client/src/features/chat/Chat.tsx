import { Avatar, Comment } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../app/store';
import { Editor } from '../../components/Editor/Editor';
import { fetchChat } from './chatsSlice';

export const Chat: React.FC = () => {
  const { receiver } = useParams<{ receiver: string }>();

  const { chat } = useSelector((state: RootState) => state.chats);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChat(receiver));
  }, []);

  console.log(chat);

  return (
    <Comment
      avatar={
        <Avatar
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="Han Solo"
        />
      }
      content={
        <Editor
          onChange={() => null}
          onSubmit={() => null}
          submitting={false}
          value={''}
        />
      }
    />
  );
};
