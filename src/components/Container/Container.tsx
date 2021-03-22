import { Button, Result } from 'antd';
import { ErrorDto } from 'dtos/ErrorDto';
import React, { memo, ReactNode } from 'react';
import styles from './Container.module.css';

interface Props {
    children: ReactNode;
    error: null | ErrorDto;
    className?: string;
}

export const Container: React.FC<Props> = memo(({ children, className, error }) => {
    const handlePageReload = () => {
        document.location.reload();
    };

    if (error) {
        return (
            <Result
                status="500"
                title="Error"
                subTitle="Sorry, something went wrong."
                extra={
                    <Button type="primary" onClick={handlePageReload}>
                        Reload page
                    </Button>
                }
            />
        );
    }

    return <div className={`${className ? className : ''} ${styles.container}`}>{children}</div>;
});

Container.displayName = 'Container';
