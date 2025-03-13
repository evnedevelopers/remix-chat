import { ModalTypes } from "~/store/types";
import { ConfirmOrCancel } from "~/components/modals/ConfirmOrCancel";
import { EditChat } from "~/components/modals/EditChat";

export const registeredModals: ModalTypes.RegisteredModals = {
  ConfirmOrCancel,
  EditChat,
  // INJECT
};