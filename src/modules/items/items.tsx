import { ITEMS_QUERY } from "@/common/graphql/mock-data";
import RootLayout from "@/common/layouts/root-layout";
import { useQuery } from "@apollo/client";
import {
  Spin,
  Pagination,
  Select,
  Typography,
  Empty,
  Result,
  Button,
} from "antd";
import React, { useState } from "react";
import CardsListLayout from "@/common/layouts/cards-list-layout";
import Link from "next/link";

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

  const { loading, error, data } = useQuery(ITEMS_QUERY, {
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

  if (error)
    return (
      <RootLayout>
        <div className="flex justify-center items-center h-[400px]">
          <Result
            status="warning"
            title="There are some problems with your operation."
            extra={
              <Link href="/">
                <Button type="primary">Home</Button>
              </Link>
            }
          />
        </div>
      </RootLayout>
    );

  const items = data?.items?.data;
  const total = data?.items?.total;

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
            {items?.length === 1 ? "1 item" : `${items?.length} items`}
          </Text>
          <Select
            value={sortValue}
            onChange={setSortValue}
            options={sortOptions}
            style={{ width: 200 }}
          />
        </div>
        <div className="mt-[24px]">
          <CardsListLayout cardsListData={items} />
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
