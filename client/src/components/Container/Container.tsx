import React, { ReactNode } from 'react';

import styles from './Container.module.css';

interface Props {
  children: ReactNode;
  className?: string;
}

export const Container: React.FC<Props> = ({ children, className }) => {
  return <div className={`${styles.container} ${className}`}>{children}</div>;
};
