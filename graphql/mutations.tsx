// import { gql } from "@apollo/client";

// export const CREATE_BOOK = gql`
//     mutation createBook($title: String!, $author: String! $summary: String!) {
//         createBook($title: String! $author: String! $summary: String!) {
//             _id
//             title
//             author
//             genre
//             summary
//         }
//     }
// `;

// export const CREATE_STATUS = gql`
//     mutation createStatus($bookID: String! $status: String!) {
//         createStatus($bookID: String! $status: String!) {
//             _id
//             bookID{
//                 _id
//                 title
//                 author
//                 genre
//                 summary
//             }
//             status
//         }
//     }
// `;