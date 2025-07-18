import { gql } from "@apollo/client";

export const ITEMS_QUERY = gql`
  query Items($paging: PagingInput, $sort: SortInput) {
    items(paging: $paging, sort: $sort) {
      data {
        id
        title
        price
        isUserFavourite
        image
      }
      total
    }
  }
`;

export const mocks = [
  // Page 1 — created_at desc
  {
    request: {
      query: ITEMS_QUERY,
      variables: {
        paging: { pageNo: 1, perPage: 6 },
        sort: { column: "created_at", direction: "desc" },
      },
    },
    result: {
      data: {
        items: {
          data: [
            {
              id: "1",
              image: "/assets/images/sample-card-image.jpg",
              title: "Item 1",
              price: 2500,
              isUserFavourite: true,
              __typename: "Item",
            },
            {
              id: "2",
              image: "/assets/images/sample-card-image.jpg",
              title: "Item 2",
              price: 1800,
              isUserFavourite: false,
              __typename: "Item",
            },
            {
              id: "3",
              image: "/assets/images/sample-card-image.jpg",
              title: "Item 3",
              price: 4300,
              isUserFavourite: true,
              __typename: "Item",
            },
            {
              id: "4",
              image: "/assets/images/sample-card-image.jpg",
              title:
                "Item 4 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              price: 1200,
              isUserFavourite: false,
              __typename: "Item",
            },
            {
              id: "5",
              image: "/assets/images/sample-card-image.jpg",
              title: "Item 5",
              price: 3100,
              isUserFavourite: true,
              __typename: "Item",
            },
            {
              id: "6",
              image: "/assets/images/sample-card-image.jpg",
              title: "Item 6",
              price: 2900,
              isUserFavourite: false,
              __typename: "Item",
            },
          ],
          total: 12,
          __typename: "ItemResult",
        },
      },
    },
  },

  // Page 2 — created_at desc
  {
    request: {
      query: ITEMS_QUERY,
      variables: {
        paging: { pageNo: 2, perPage: 6 },
        sort: { column: "created_at", direction: "desc" },
      },
    },
    result: {
      data: {
        items: {
          data: [
            {
              id: "7",
              image: "/assets/images/sample-card-image.jpg",
              title: "Item 7",
              price: 2100,
              isUserFavourite: true,
              __typename: "Item",
            },
            {
              id: "8",
              image: "/assets/images/sample-card-image.jpg",
              title: "Item 8",
              price: 1650,
              isUserFavourite: false,
              __typename: "Item",
            },
            {
              id: "9",
              image: "/assets/images/sample-card-image.jpg",
              title: "Item 9",
              price: 4900,
              isUserFavourite: true,
              __typename: "Item",
            },
            {
              id: "10",
              image: "/assets/images/sample-card-image.jpg",
              title: "Item 10",
              price: 3600,
              isUserFavourite: false,
              __typename: "Item",
            },
            {
              id: "11",
              image: "/assets/images/sample-card-image.jpg",
              title: "Item 11",
              price: 2200,
              isUserFavourite: true,
              __typename: "Item",
            },
            {
              id: "12",
              image: "/assets/images/sample-card-image.jpg",
              title: "Item 12",
              price: 1950,
              isUserFavourite: false,
              __typename: "Item",
            },
          ],
          total: 12,
          __typename: "ItemResult",
        },
      },
    },
  },
];
