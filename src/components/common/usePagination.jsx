import { useEffect, useMemo, useState } from "react";
import { Box, Pagination } from "@mui/material";

/**
 * Client-side pagination for card grids and custom lists.
 * Returns the current page's items + a ready-to-render <Pager /> component.
 *
 * Usage:
 *   const { pageItems, Pager } = usePagination(items, 8);
 *   {pageItems.map(...)}
 *   <Pager />
 */
export default function usePagination(items = [], perPage = 8) {
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(items.length / perPage));

  // Clamp page if the list shrinks (e.g. after a delete).
  useEffect(() => {
    if (page > pageCount) setPage(pageCount);
  }, [pageCount, page]);

  const pageItems = useMemo(
    () => items.slice((page - 1) * perPage, page * perPage),
    [items, page, perPage]
  );

  const Pager = () =>
    pageCount > 1 ? (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={(_, p) => setPage(p)}
          color="primary"
          shape="rounded"
          showFirstButton
          showLastButton
        />
      </Box>
    ) : null;

  return { page, setPage, pageCount, pageItems, Pager };
}
