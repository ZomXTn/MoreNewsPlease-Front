import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import NewspaperForm from "../../../components/Newspapers/NewspapersForm";
import { INewspaper } from "../../../types/entities";
import { useGetNewspaperQuery, useUpdateNewspaperMutation } from "../../../features/newspapersApi";
import { FormModes } from "../../../types/types";
import { toast } from "react-toastify";

const NewspaperEdit: React.FC = () => {
    const { id } = useParams();
    const { data: newspaper, isLoading, isFetching, isSuccess, isError } = useGetNewspaperQuery(id || "")
    const canDisplay = isSuccess && !isLoading && Boolean(newspaper);
    const [updateNewspaper] = useUpdateNewspaperMutation();
    const navigate = useNavigate();
    const handleSubmit = async (values: INewspaper) => {
        try {
            const data = await updateNewspaper(values).unwrap();
            toast(`Le jounral ${data?.name} a été modifié avec succès`, { type: "success", position: "top-center", autoClose: 3000 })
            setTimeout(() => {
                navigate(`/management/newspapers/${data.newspaper_id}/consult/`)
            }, 3000);
        } catch (error) {
            toast("Une erreur s'est produite lors de la modification du journal", { type: "error", position: "top-center", })
        }
    }

    return (
        <Container maxWidth="xl">
            <Paper sx={{ width: "50%", marginX: "auto", padding: 2 }}>
                <Stack spacing={2} direction="column">
                    <Typography component="h1" variant="h5" textAlign="center">
                        Modifier les information du journal
                    </Typography>
                    {
                        canDisplay && (
                            <NewspaperForm mode={FormModes.EDIT} initialValues={newspaper} onSubmit={handleSubmit} />
                        )
                    }
                </Stack>
            </Paper>
        </Container>
    );
};

export default NewspaperEdit;

