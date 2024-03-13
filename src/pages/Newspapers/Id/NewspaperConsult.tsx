import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import NewspaperForm from "../../../components/Newspapers/NewspapersForm";
import { INewspaper } from "../../../types/entities";
import { useGetNewspaperQuery } from "../../../features/newspapersApi";
import { FormModes } from "../../../types/types";

const NewspaperConsult: React.FC = () => {
    const { id } = useParams();
    const news_id = id || "";
    const { data: newspaper, isLoading, isFetching, isSuccess, isError } = useGetNewspaperQuery(news_id)
    const canDisplay = isSuccess && !isLoading && Boolean(newspaper);
    const navigate = useNavigate();

    const handleSubmit = async (values: INewspaper) => {
        navigate(`/management/newspapers/${id}/edit/`);
    }

    return (
        <Container maxWidth="xl">
            <Paper sx={{ width: "50%", marginX: "auto", padding: 2 }}>
                <Stack spacing={2} direction="column">
                    <Typography component="h1" variant="h5" textAlign="center">
                        Consulter les informations du journal
                    </Typography>
                    {
                        canDisplay && (
                            <NewspaperForm mode={FormModes.CONSULT} initialValues={newspaper} onSubmit={handleSubmit} />
                        )
                    }
                    {
                        isError && (<Navigate to="404" />)
                    }
                </Stack>
            </Paper>
        </Container>
    );
};

export default NewspaperConsult;

