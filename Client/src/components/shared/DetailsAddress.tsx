const DetailsAddress = ({
  label,
  Icon,
  details,
}: {
  label: string;
  Icon: any;
  details: any;
}) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-400/30">
        <Icon className="h-5 w-5 text-teal-400" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground text-start text-gray-500">
          {label}
        </p>
        <p className="text-base mt-0.5 text-start">{details}</p>
      </div>
    </div>
  );
};

export default DetailsAddress;
