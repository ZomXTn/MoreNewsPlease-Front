import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { useCreateNewspaperMutation } from "../../features/newspapersApi";
import NewspaperForm from './../../components/Newspapers/NewspapersForm';
import { INewspaper } from "../../types/entities";
import { FormModes } from "../../types/types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NewspaperCreate: React.FC = () => {
    const [createNewspaper] = useCreateNewspaperMutation();
    const navigate = useNavigate();
    const handleSubmit = async (values: INewspaper) => {
        try {
            const data = await createNewspaper(values).unwrap();
            toast(`Le journal ${data.name} a été créé avec succès`, { type: "success", position: "top-center", autoClose: 3000 })
            setTimeout(() => {
                navigate(`/management/newspapers/${data.newspaper_id}/consult/`)
            }, 3000);
        } catch (error) {
            toast("Une erreur s'est produite lors de la création du journal", { type: "error", position: "top-center" })
        }
    }

    return (
        <Container maxWidth="xl">
            <Paper sx={{ width: "50%", marginX: "auto", padding: 2 }}>
                <Stack spacing={2} direction="column">
                    <Typography component="h1" variant="h5" textAlign="center">
                        Créer un journal
                    </Typography>
                    <NewspaperForm mode={FormModes.CREATE} onSubmit={handleSubmit} />
                </Stack>
            </Paper>
        </Container>
    );
};

export default NewspaperCreate;