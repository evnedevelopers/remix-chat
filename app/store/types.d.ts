import React from 'react';

export namespace ModalTypes {
  export type ModalComponentProps<P> = {
    closeFn: () => void;
    modalPayload: ModalPayload;
    onCancel?: ModalPayload['onCancel'];
    onConfirm: ModalPayload['onConfirm'];
  } & P;
  export type ModalPayload<G> = {
    onCancel?: () => void;
    onConfirm?: () => void;
    component: string;
    forceClose?: boolean;
    title?: string;
  } & G;
  export type RegisteredModals = Record<
    string,
    React.FC<ModalTypes.ModalComponentProps<any>>
  >;
}

export type ModalState = {
  modalData: Record<string, ModalTypes.ModalPayload<unknown>>;
};
