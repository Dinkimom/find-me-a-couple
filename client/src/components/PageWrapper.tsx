import { Layout } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import React, { ReactNode } from 'react';

const { Header, Content } = Layout;

interface Props {
  children: ReactNode;
}

export const PageWrapper: React.FC<Props> = ({ children }) => {
  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
      </Header>
      <Content
        className="site-layout"
        style={{ padding: '0 50px', marginTop: 64 }}
      >
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 380 }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center', marginTop: 'auto' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};
