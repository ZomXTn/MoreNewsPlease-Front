import { Box, Button, Container, Divider, IconButton, Pagination, Paper, Stack, Table, TableBody, TableCell, TableFooter, TableHead, TableRow, Typography } from "@mui/material";
import { EditSharp as EditIcon, Visibility } from "@mui/icons-material";
import { DeleteSharp as DeleteIcon } from "@mui/icons-material";
import { Newspaper as NewspaperIcon } from "@mui/icons-material";
import React, { useState } from "react";
import usePagination from '../../hooks/usePagination';
import { useDeleteNewspaperMutation, useGetNewspapersQuery } from "../../features/newspapersApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import useOrderingParams from "../../hooks/useOrderBy";

const newspaperGridDef = [
    { key: 'name', name: "Name" },
    { key: 'actions', name: "Action" },
]

const NewspaperManagement: React.FC = () => {
    const [params] = useSearchParams({ page: '1' })
    const { column, type, setOrderBy } = useOrderingParams()
    const { data: newspapers, isLoading, isFetching, isSuccess } = useGetNewspapersQuery(params.toString(), { refetchOnMountOrArgChange: true })
    const { page, totalPages, goToPage } = usePagination({ totalItems: newspapers?.results.length || 0 })
    const canDisplay = isSuccess && !isLoading && !isFetching
    const [sortColumn, setSortColumn] = useState<string>(column);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">(type);
    const navigate = useNavigate();
    const [deleteNewspaper] = useDeleteNewspaperMutation()
    const handleDelete = async (id: string) => {
        try {
            const data = await deleteNewspaper(id).unwrap()
            toast("Le journal a été supprimé avec succès", { type: "success", position: "top-center", autoClose: 2000 })
        } catch (error) {
            toast("Une erreur est survenue lors de la suppression du journal", { type: "error", position: "top-center" })
        }
    }
    const handleSort = (column: string) => {
        if (sortColumn == column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
            setOrderBy(column, sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortColumn(column);
            setSortDirection("asc");
            setOrderBy(column, "asc")
        }
    };

    return (
        <Container maxWidth="xl">
            <Paper sx={{ marginBottom: 1 }}>
                <Box padding={3} display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h4" component="span">Gestion des journaux</Typography>
                    <Button variant="contained" color="primary" onClick={() => navigate(`/management/newspapers/create`)}>Créer un journal</Button>
                </Box>
            </Paper>
            <Paper>
                <Box width="100%" padding={3}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {newspaperGridDef.map((column) => (
                                    <TableCell
                                        key={column.key}
                                        onClick={() => { if (column.key != "actions") handleSort(column.key) }}
                                        sx={{ cursor: "pointer", textAlign: "center" }}
                                    >
                                        {column.name}
                                        {sortColumn === column.key && column.key !== "actions" && (
                                            <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {canDisplay &&
                                newspapers.results.map((newspaper) => (
                                    <TableRow key={newspaper.newspaper_id}>
                                        <TableCell align="center">{newspaper.name}</TableCell>
                                        <TableCell align="center">
                                            {/* Actions */}
                                            <IconButton onClick={() => navigate(`/management/newspapers/${newspaper.newspaper_id}/consult`)}>
                                                <Visibility />
                                            </IconButton>
                                            <IconButton onClick={() => navigate(`/management/newspapers/${newspaper.newspaper_id}/edit`)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => navigate(`/management/articles?newspaper=${newspaper.newspaper_id}`)}>
                                                <NewspaperIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(newspaper.newspaper_id || "")}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                    <Divider />
                    <Box display="flex" justifyContent="center" padding={2}>
                        <Pagination color="primary" page={page} count={totalPages} onChange={(_, page) => goToPage(page)} />
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

export default NewspaperManagement;