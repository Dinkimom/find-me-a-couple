import { List } from 'antd';
import { RootState } from 'app/store';
import { Container } from 'components/Container/Container';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './Chats.module.css';
import { fetchChats } from './chatsSlice';
import { ChatsItem } from './components/ChatsItem';

export const Chats: React.FC = () => {
    const { list, isFetching, error } = useSelector((state: RootState) => state.chats);

    const dispatch = useDispatch();

    const history = useHistory();

    useEffect(() => {
        dispatch(fetchChats());
    }, [dispatch]);

    const handleChatClick = (receiver: string) => {
        history.push(`/chats/${receiver}`);
    };

    return (
        <Container error={error}>
            <List
                className={styles.chat}
                itemLayout="horizontal"
                dataSource={list}
                loading={isFetching}
                renderItem={(item) => <ChatsItem {...item} onClick={handleChatClick} />}
            />
        </Container>
    );
};

Chats.displayName = 'Chats';
