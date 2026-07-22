import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Trash2, X } from "lucide-react";

const DeleteResumeModal = ({
  open,
  resume,
  onCancel,
  onConfirm,
}) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="delete-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="delete-modal"
            initial={{
              scale: 0.8,
              opacity: 0,
              y: 40,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
            }}
            exit={{
              scale: 0.8,
              opacity: 0,
              y: 40,
            }}
            transition={{
              duration: 0.25,
            }}
          >
            <div className="delete-icon">
              <AlertTriangle size={42} />
            </div>

            <h2>Delete Resume?</h2>

            <p>
              Are you sure you want to permanently delete
              <strong> {resume?.originalName}</strong>?
            </p>

            <div className="delete-modal-actions">
              <button
                className="cancel-btn"
                onClick={onCancel}
              >
                <X size={18} />
                Cancel
              </button>

              <button
                className="confirm-delete-btn"
                onClick={() =>
                  onConfirm(resume._id)
                }
              >
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteResumeModal;