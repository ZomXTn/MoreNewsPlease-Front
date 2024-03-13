import { Container, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ArticleForm from "../../components/Articles/ArticlesForm";
import { useCreateArticleMutation } from "../../features/newspapersApi";
import { IArticle } from "../../types/entities";
import { FormModes } from "../../types/types";

const ArticleCreate: React.FC = () => {
    const [createArticle] = useCreateArticleMutation();
    const navigate = useNavigate();
    const handleSubmit = async (values: IArticle) => {
        try {
            const categories_ids = values.categories.map((cat) => cat.id);
            const data = await createArticle({ ...values, categories_ids }).unwrap();
            toast(`L'article ${data.title} a été créé avec succès`, { type: "success", position: "top-center", autoClose: 3000 })
            setTimeout(() => {
                navigate(`/management/articles/${data.article_id}/consult/`)
            }, 3000);
        } catch (error) {
            toast("Une erreur est survenu lors de la création de l'article", { type: "error", position: "top-center" })
        }
    }

    return (
        <Container maxWidth="xl">
            <Paper sx={{ width: "50%", marginX: "auto", padding: 2 }}>
                <Stack spacing={2} direction="column">
                    <Typography component="h1" variant="h5" textAlign="center">
                        Créer un article
                    </Typography>
                    <ArticleForm mode={FormModes.CREATE} onSubmit={handleSubmit} />
                </Stack>
            </Paper>
        </Container>
    );
};

export default ArticleCreate;