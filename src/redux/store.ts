import { libraryApi } from '@/redux/api/libraryApi';
import { configureStore } from '@reduxjs/toolkit';
export const store = configureStore({
    reducer: {
        [libraryApi.reducerPath]: libraryApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(libraryApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;