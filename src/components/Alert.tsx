interface AlertProps {
  message: string;
}

export const AlertDanger: React.FC<AlertProps> = ({ message }) => {
  return (
    <div className="bg-red-200 text-red-600 p-2 rounded">{`🚫 ${message}`}</div>
  );
};
