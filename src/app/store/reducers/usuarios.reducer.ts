import { Action, createReducer, on } from '@ngrx/store';
import { Usuario } from '../../models/usuario.model';
import {
  cargarUsuarios,
  cargarUsuariosSuccess,
  cargarUsuariosError,
} from '../actions';

export interface UsuariosState {
  users: Usuario[];
  loaded: boolean;
  loading: boolean;
  error: any;
}

export const usuariosInitialState: UsuariosState = {
  users: [],
  loaded: false,
  loading: false,
  error: null,
};

const _usuariosReducer = createReducer(
  usuariosInitialState,
  on(cargarUsuarios, (state) => ({ ...state, loading: true })),

  on(cargarUsuariosSuccess, (state, { usuarios }) => ({
    ...state,
    loading: false,
    loaded: true,
    users: [...usuarios],
  })),

  on(cargarUsuariosError, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: error.url,
      name: error.name,
      message: error.message,
    },
  }))
);

export function usuariosReducer(
  state: UsuariosState | undefined,
  action: Action
) {
  return _usuariosReducer(state, action);
}
