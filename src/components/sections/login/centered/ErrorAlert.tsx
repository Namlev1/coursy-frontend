interface ErrorAlertProps {
  message: string;
}

export default function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-800">
      {message}
    </div>
  );
}
