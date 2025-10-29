"use client";

import { Modal } from "antd";
import { CrudForm } from "./CrudForm";
import type { FormField } from "@/types/forms";

interface CrudModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Record<string, unknown>) => void;
  fields: FormField[];
  initialValues?: Record<string, unknown>;
  loading?: boolean;
  submitText?: string;
}

export function CrudModal({
  title,
  open,
  onClose,
  onSubmit,
  fields,
  initialValues,
  loading,
  submitText,
}: CrudModalProps) {
  return (
    <Modal
      title={title}
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <CrudForm
        fields={fields}
        initialValues={initialValues}
        onSubmit={onSubmit}
        onCancel={onClose}
        loading={loading}
        submitText={submitText}
      />
    </Modal>
  );
}
