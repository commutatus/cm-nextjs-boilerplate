import ProjectCard from "@/common/components/project-card";
import classNames from "classnames";
import React from "react";

type CardsListLayoutPropsType = {
  cardsListData: {
    title: string;
    description: string;
    image: string;
  }[];

  scrollable?: boolean;
  cardsPerRow?: number;
};

const CardsListLayout = (props: CardsListLayoutPropsType) => {
  const { cardsListData, scrollable } = props;

  return (
    <div
      className={classNames("w-full gap-4", {
        "grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1":
          !scrollable,
        "flex overflow-x-scroll": scrollable,
      })}
    >
      {cardsListData.map((cardData: any, index: number) => (
        <div
          key={index}
          className={classNames({ "w-[300px] flex-shrink-0": scrollable })}
        >
          <ProjectCard projectCardData={cardData} />
        </div>
      ))}
    </div>
  );
};

export default CardsListLayout;
