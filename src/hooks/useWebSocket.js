import { useState, useEffect, useCallback } from 'react';
import useStore from '../store/store';

export function useWebSocket(url) {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const { playerId, playerToken, addCaveSegment } = useStore();

  const connect = useCallback(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      setIsConnected(true);
      if (playerId && playerToken) {
        ws.send(`player:${playerId}-${playerToken}`);
      }
    };

    ws.onmessage = (event) => {
      if (event.data !== 'finished') {
        const [left, right] = event.data.split(',').map(Number);
        addCaveSegment([left, right]);
      }
    };

    ws.onclose = (e) => {
      ws.close();
    };

    ws.onerror = (err) => {
      console.error('WebSocket error observed:', err);
      ws.close();
    };

    setSocket(ws);
  }, [url, playerId, playerToken, addCaveSegment]);

  useEffect(() => {
    connect();
    return () => {
      if (socket) {
        socket.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connect]);

  const sendMessage = useCallback(
    (message) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(message);
      } else {
        console.warn('WebSocket is not open. Message not sent:', message);
      }
    },
    [socket]
  );

  return { sendMessage, isConnected };
}
