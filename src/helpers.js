/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */

export  const isFetchBaseQueryError = (error) => {
    return typeof error === "object" &&
        error != null && "error" in error;
}
/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export const isErrorWithMessage = (error) => {
    return (
        typeof error === "object" &&
        error != null &&
        "data" in error &&
        typeof error.data.message === "string"
);
}

