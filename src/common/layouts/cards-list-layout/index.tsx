import ProjectCard from "@/common/components/project-card";
import classNames from "classnames";
import React from "react";

type CardDataType = {
  id: number;
  title: string;
  description: string;
  image: string;
};

type CardsListLayoutPropsType = {
  cardsListData: CardDataType[];
  scrollable?: boolean;
  cardsPerRow?: number;
};

const CardsListLayout = (props: CardsListLayoutPropsType) => {
  const { cardsListData, scrollable, cardsPerRow } = props;

  return (
    <div
      className={classNames("w-full gap-4", {
        [`grid lg:grid-cols-${cardsPerRow} md:grid-cols-${cardsPerRow} sm:grid-cols-${cardsPerRow} grid-cols-${cardsPerRow}`]:
          !scrollable,
        "flex overflow-x-scroll": scrollable,
      })}
    >
      {cardsListData?.map((cardData: CardDataType) => (
        <div
          key={cardData?.id}
          className={classNames({ "w-[300px] flex-shrink-0": scrollable })}
        >
          <ProjectCard projectCardData={cardData} />
        </div>
      ))}
    </div>
  );
};

export default CardsListLayout;
