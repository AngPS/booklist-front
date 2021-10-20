import { gql } from "@apollo/client";

export const LOAD_BOOKS = gql`
    query {
        Books {
            _id
            title
            author
            summary
        }
    }
`;

// export const STATUS = gql`
//     query {
//         Status {
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

// export const FIND_STATUS = gql`
//     query findStatus($statusID: String!){
//         findStatus($statusID: String!) {
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