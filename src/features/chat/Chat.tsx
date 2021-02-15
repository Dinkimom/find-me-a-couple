import { Badge, Comment, List, notification } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { RootState } from 'app/store';
import { Container } from 'components/Container/Container';
import { Editor } from 'components/Editor/Editor';
import { ChatDto } from 'dtos/ChatDto';
import { MessageDto } from 'dtos/MessageDto';
import { NewMessageDto } from 'dtos/NewMessageDto';
import { UserStateEnum } from 'enums/UserStateEnum';
import { useSocket } from 'hooks/useSocket';
import { useUserAvatar } from 'hooks/useUserAvatar';
import React, { RefObject, useCallback, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './Chat.module.css';
import { fetchChat, sendMessage } from './chatsSlice';

export const Chat: React.FC = () => {
    const { receiver } = useParams<{ receiver: string }>();
    const { chat, users } = useSelector((state: RootState) => state.chats);
    const { user } = useSelector((state: RootState) => state.account);

    const socket = useSocket();

    const dispatch = useDispatch();

    const endMessageRef: RefObject<HTMLParagraphElement> | null = useRef(null);

    const scrollToBottom = () => {
        if (endMessageRef.current) {
            endMessageRef.current.scrollIntoView();
        }
    };

    useEffect(scrollToBottom, [chat]);

    useEffect(() => {
        dispatch(fetchChat(receiver));

        notification.destroy();
    }, [dispatch, receiver]);

    const handleMessageSend = useCallback(
        (message: NewMessageDto) => {
            if (user) {
                dispatch(sendMessage(user._id, receiver, message, socket));
            }
        },
        [receiver, user],
    );

    const { companion } = chat.chatData || {};

    const renderCompanionAvatar = useMemo(() => {
        if (!companion) {
            return null;
        }

        const companionImage = useUserAvatar(companion);

        const statusColor = {
            [UserStateEnum.OFFLINE]: 'white',
            [UserStateEnum.ONLINE]: 'green',
            [UserStateEnum.TYPING]: 'green',
        }[users[receiver]];

        console.log(users[companion._id], companion._id);

        const isOnline = Boolean(users[receiver] && users[receiver] !== UserStateEnum.OFFLINE);

        return (
            <div className={styles.companionBlock}>
                <Badge dot={isOnline} color={statusColor}>
                    <Avatar src={companionImage} size="large" />
                </Badge>
                <h3>{companion?.name}</h3>
            </div>
        );
    }, [companion, users]);

    return (
        <Container error={chat.error}>
            <div className={styles.root}>
                {renderCompanionAvatar}

                <List
                    className={styles.messages}
                    loading={chat.isFetching}
                    dataSource={chat.chatData?.messages || []}
                    itemLayout="horizontal"
                    renderItem={(item: MessageDto, index) => {
                        const isOutput = item.user_id !== receiver;
                        const isLast = index === (chat.chatData as ChatDto).messages?.length - 1;

                        return (
                            <Comment
                                className={`${styles.message} ${isOutput ? styles.messageOutput : null}`}
                                author={isOutput ? user?.name : companion?.name}
                                content={<p className={styles.messageText}>{item.text}</p>}
                                datetime={
                                    <p className={styles.messageTime} ref={isLast ? endMessageRef : undefined}>
                                        {new Date(item.date).toLocaleTimeString()} {new Date(item.date).toDateString()}
                                    </p>
                                }
                            />
                        );
                    }}
                />

                {companion && <Editor onSubmit={handleMessageSend} submitting={chat.submitting} />}
            </div>
        </Container>
    );
};

Chat.displayName = 'Chat';
