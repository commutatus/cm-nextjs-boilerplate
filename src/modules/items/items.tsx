import { LISTINGS_QUERY } from "@/common/graphql/mock-data";
import RootLayout from "@/common/layouts/root-layout";
import { useQuery } from "@apollo/client";
import {
  Spin,
  Pagination,
  Select,
  Typography,
  notification,
  Empty,
} from "antd";
import React, { useState } from "react";
import CardsListLayout from "@/common/layouts/cards-list-layout";

const { Text } = Typography;

const PER_PAGE = 6;

const sortOptions = [
  { label: "Newest", value: "created_at:desc" },
  { label: "Oldest", value: "created_at:asc" },
];

const Items = () => {
  const [page, setPage] = useState(1);
  const [sortValue, setSortValue] = useState("created_at:desc");

  const [sortColumn, sortDirection] = sortValue.split(":");

  const { loading, error, data } = useQuery(LISTINGS_QUERY, {
    variables: {
      paging: { pageNo: page, perPage: PER_PAGE },
      sort: { column: sortColumn, direction: sortDirection },
    },
  });

  if (loading) {
    return (
      <RootLayout>
        <div className="flex justify-center items-center h-[400px]">
          <Spin size="large" />
        </div>
      </RootLayout>
    );
  }

  if (error) return notification.error({ message: "Error loading listings" });

  const items = data?.listing?.items;
  const total = data?.listing?.total;

  if (!items || items.length === 0) {
    return (
      <RootLayout>
        <div className="flex justify-center items-center h-[400px]">
          <Empty />
        </div>
      </RootLayout>
    );
  }
  return (
    <RootLayout>
      <div className="max-w-[1120px] mx-auto py-[24px]">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <Text type="secondary" className="!text-base">
            {items?.length === 1 ? "1 listing" : `${items?.length} listings`}
          </Text>
          <Select
            value={sortValue}
            onChange={setSortValue}
            options={sortOptions}
            style={{ width: 200 }}
          />
        </div>
        <div className="mt-[24px]">
          <CardsListLayout cardsListData={items} cardsPerRow={3} />
        </div>
        <div className="flex justify-center mt-[24px]">
          <Pagination
            current={page}
            pageSize={PER_PAGE}
            total={total}
            onChange={setPage}
            showSizeChanger={false}
          />
        </div>
      </div>
    </RootLayout>
  );
};

export default Items;
