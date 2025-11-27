import React from "react";
import Image from "next/image";
import { getImagePath } from "@/lib/data";
import Link from "next/link";

const CastCard = ({ member }: { member: any }) => {
  return (
    <Link
      href={`/person/${member.id}`}
      className="shrink-0 w-32 group cursor-pointer"
    >
      <div className="relative w-32 h-48 rounded-lg overflow-hidden mb-3 shadow-lg group-hover:shadow-primary/50 transition-shadow">
        {member.profile_path ? (
          <Image
            src={`${getImagePath()}${member.profile_path}`}
            alt={member.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="128px"
            priority={false}
          />
        ) : (
          <Image
            src={"/user.png"}
            alt={member.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="128px"
            priority={false}
          />
        )}
      </div>
      <h3 className="text-sm font-semibold truncate group-hover:text-primary transition-colors">
        {member.name}({member.original_name})
      </h3>
      <p className="text-xs line-clamp-2">{member.job}</p>
    </Link>
  );
};

export default CastCard;
