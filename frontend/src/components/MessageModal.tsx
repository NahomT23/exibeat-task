"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  setMessage: (message: string) => void;
}

export default function MessageModal({
  isOpen,
  onClose,
  message,
  setMessage
}: MessageModalProps) {
  const handleSubmit = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Message to DJ</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message to the DJ..."
            className="min-h-[100px]"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
            Add Message
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
