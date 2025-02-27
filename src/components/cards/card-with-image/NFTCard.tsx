import React from "react";
import { Card, CardDescription, CardTitle } from "../../ui/card";
import Image from "next/image";

interface NFTCardProps {
  imageSrc: string;
  title: string;
  description: React.ReactNode;
}

export default function NFTCard({ imageSrc, title, description }: NFTCardProps) {
  return (
    <Card>
      <div>
        <div className="mb-5 overflow-hidden rounded-lg">
          <Image
            src={imageSrc}
            alt="card"
            className="w-full overflow-hidden rounded-lg"
            width={303}
            height={190}
          />
        </div>
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </div>
    </Card>
  );
}
