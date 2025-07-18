import { gql } from "@apollo/client";

export const LISTINGS_QUERY = gql`
  query Listing($paging: PagingInput, $sort: SortInput) {
    listing(paging: $paging, sort: $sort) {
      items {
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
      query: LISTINGS_QUERY,
      variables: {
        paging: { pageNo: 1, perPage: 6 },
        sort: { column: "created_at", direction: "desc" },
      },
    },
    result: {
      data: {
        listing: {
          items: [
            {
              id: "1",
              image: "/assets/images/sample-card-image.jpg",
              title: "Mock Listing 1",
              price: 2500,
              isUserFavourite: true,
              __typename: "Listing",
            },
            {
              id: "2",
              image: "/assets/images/sample-card-image.jpg",
              title: "Mock Listing 2",
              price: 1800,
              isUserFavourite: false,
              __typename: "Listing",
            },
            {
              id: "3",
              image: "/assets/images/sample-card-image.jpg",
              title: "Mock Listing 3",
              price: 4300,
              isUserFavourite: true,
              __typename: "Listing",
            },
            {
              id: "4",
              image: "/assets/images/sample-card-image.jpg",
              title:
                "Mock Listing Mock Listing Mock Listing Mock Listing Mock Listing Mock Listing 4",
              price: 1200,
              isUserFavourite: false,
              __typename: "Listing",
            },
            {
              id: "5",
              image: "/assets/images/sample-card-image.jpg",
              title: "Mock Listing 5",
              price: 3100,
              isUserFavourite: true,
              __typename: "Listing",
            },
            {
              id: "6",
              image: "/assets/images/sample-card-image.jpg",
              title: "Mock Listing 6",
              price: 2900,
              isUserFavourite: false,
              __typename: "Listing",
            },
          ],
          total: 12,
          __typename: "ListingResult",
        },
      },
    },
  },

  // Page 2 — created_at desc
  {
    request: {
      query: LISTINGS_QUERY,
      variables: {
        paging: { pageNo: 2, perPage: 6 },
        sort: { column: "created_at", direction: "desc" },
      },
    },
    result: {
      data: {
        listing: {
          items: [
            {
              id: "7",
              image: "/assets/images/sample-card-image.jpg",
              title: "Mock Listing 7",
              price: 2100,
              isUserFavourite: true,
              __typename: "Listing",
            },
            {
              id: "8",
              image: "/assets/images/sample-card-image.jpg",
              title: "Mock Listing 8",
              price: 1650,
              isUserFavourite: false,
              __typename: "Listing",
            },
            {
              id: "9",
              image: "/assets/images/sample-card-image.jpg",
              title: "Mock Listing 9",
              price: 4900,
              isUserFavourite: true,
              __typename: "Listing",
            },
            {
              id: "10",
              image: "/assets/images/sample-card-image.jpg",
              title: "Mock Listing 10",
              price: 3600,
              isUserFavourite: false,
              __typename: "Listing",
            },
            {
              id: "11",
              image: "/assets/images/sample-card-image.jpg",
              title: "Mock Listing 11",
              price: 2200,
              isUserFavourite: true,
              __typename: "Listing",
            },
            {
              id: "12",
              image: "/assets/images/sample-card-image.jpg",
              title: "Mock Listing 12",
              price: 1950,
              isUserFavourite: false,
              __typename: "Listing",
            },
          ],
          total: 12,
          __typename: "ListingResult",
        },
      },
    },
  },
];
