import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useContext } from 'react';
import type { RootState, AppDispatch } from './app/store';
import { AuthContext } from './contexts/AuthContext';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuth = () => useContext(AuthContext);
