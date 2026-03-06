'use client';
import { AppStore, makeStore } from '@/stores/store';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { Persistor, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

let persistor: Persistor;

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    persistor = persistStore(storeRef.current);
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
