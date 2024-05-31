import React from 'react';
import type { AppProps } from 'next/app';
import { WebSocketProvider } from '../components/WebSocketContext';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <WebSocketProvider>
      <Component {...pageProps} />
    </WebSocketProvider>
  );
};

export default MyApp;
