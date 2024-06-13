import { ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

interface DeleteModalProps {
  title: string;
  description?: ReactNode;
  onDelete: () => void;
  onCancel: () => void;
  deleteConfirm: string;
  open: boolean;
}

/**
 * DeleteModal component to display as a popup
 */
function DeleteModal(props: DeleteModalProps): JSX.Element {
  const { title, description, onDelete, onCancel, deleteConfirm, open } = props;

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onCancel()}>
            Abbrechen
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => onDelete()}>
            {deleteConfirm}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteModal;
