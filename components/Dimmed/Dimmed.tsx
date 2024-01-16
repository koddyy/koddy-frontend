interface DimmedProps {
  onClick?: () => void;
}

export const Dimmed = ({ onClick }: DimmedProps) => {
  return (
    <div
      className="fixed inset-y-0 left-1/2 z-dimmed w-full max-w-screen-sm -translate-x-1/2 bg-black opacity-50"
      onClick={onClick}
    />
  );
};
