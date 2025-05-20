import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  
  const ConfirmDeleteModal = ({
    trigger,
    title = "Delete Confirmation",
    message = "Are you sure you want to delete this item?",
    onConfirm,
  }) => {
    return (
      <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-md bg-white text-black">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{message}</DialogDescription>
          </DialogHeader>
  
          <DialogFooter className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline" className="bg-ActionMiniPurple text-white cursor-pointer">Cancel</Button>
            </DialogClose>
  
            {/* Delete button not wrapped, triggers confirmation */}
            <Button
              variant="destructive"
              onClick={async () => {
                await onConfirm(); 
                document.activeElement?.blur(); 
              }}
              className="bg-red-500 text-white cursor-pointer"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default ConfirmDeleteModal;
  