import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Trash2, MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";
import { useDeleteFromDoc } from "@/lib/reactQuery/qusersAndMutation";

export default function AddressActions({ adrsId }: { adrsId: string }) {
  const [showOptionsDialog, setShowOptionsDialog] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { mutateAsync: deleteAddress } = useDeleteFromDoc();

  const handleEdit = () => {
    console.log("Edit address");
    // Add your edit logic here
    setShowOptionsDialog(false);
  };

  const handleDelete = async () => {
    await deleteAddress({ id: adrsId, Collection: "addresses" });
    setShowDeleteConfirm(false);
  };

  const openDeleteConfirm = () => {
    setShowOptionsDialog(false);
    setShowDeleteConfirm(true);
  };

  return (
    <div className="flex justify-center">
      {/* Options Dialog */}
      <Dialog open={showOptionsDialog} onOpenChange={setShowOptionsDialog}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Manage Address"
          >
            <MoreVertical className="h-5 w-5 dark:text-indigo-500" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-gray-100 rounded-lg max-md:p-2 ">
          <DialogHeader></DialogHeader>
          <div className="grid md:grid-cols-2 gap-4 py-4">
            <Link to={`/update-address/${adrsId}`}>
              {" "}
              <Button
                variant="outline"
                className="flex items-center w-full justify-center gap-2 bg-gray-200 text-indigo-500 border border-indigo-500"
                onClick={handleEdit}
              >
                <Pencil className="h-4 w-4" />
                Edit Address
              </Button>
            </Link>
            <Button
              variant="destructive"
              className="flex items-center justify-center gap-2 bg-gray-200 text-red-600"
              onClick={openDeleteConfirm}
            >
              <Trash2 className="h-4 w-4" />
              Delete Address
            </Button>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowOptionsDialog(false)}
              className="bg-gray-200 text-gray-700 hover:bg-red-500 hover:text-white"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent className="bg-gray-100 rounded-lg max-md:p-2">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-700">
              This action cannot be undone. This will permanently delete the
              address from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-200 text-gray-700 hover:bg-gray-300">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="text-white">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
