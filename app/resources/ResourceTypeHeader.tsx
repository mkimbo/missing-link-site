import React from "react";

type Props = {
  title: React.ReactNode;
  description: string;
};

function ResourceTypeHeader({ title, description }: Props) {
  return (
    <section className="w-full py-4">
      <div className=" text-left md:text-center">
        {title}
        <div className="text-sm lg:text-xl">{description}</div>
      </div>
    </section>
  );
}

export default ResourceTypeHeader;
