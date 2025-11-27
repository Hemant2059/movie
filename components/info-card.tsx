import React from "react";

const InfoCard = ({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) => {
  if (!value) return null;

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold  uppercase tracking-wide">{label}</p>
      <p className="text-base md:text-lg  wrap-break-word">{value}</p>
    </div>
  );
};

export default InfoCard;
