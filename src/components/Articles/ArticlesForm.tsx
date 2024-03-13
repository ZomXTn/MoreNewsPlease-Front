import { Autocomplete, Button, Chip, CircularProgress, Grid, InputAdornment, TextField } from '@mui/material';
import React from 'react';
import TitleIcon from '@mui/icons-material/Title';
import ContentIcon from '@mui/icons-material/Notes';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IArticle, ICategory, INewspaper } from '../../types/entities';
import { FormModes } from '../../types/types';
import { useGetNewspapersNoPaginationQuery } from '../../features/newspapersApi';
import { useGetCategoriesQuery } from '../../features/articlesApi';
import { CalendarMonth, Description, ImageRounded, Person } from '@mui/icons-material';

interface IArticleFormProps {
    onSubmit: (values: IArticle) => void;
    initialValues?: IArticle;
    mode: FormModes;
}

const ArticleForm: React.FC<IArticleFormProps> = ({ onSubmit, initialValues, mode }) => {
    const { data: newspapers, isSuccess, isFetching } = useGetNewspapersNoPaginationQuery()
    const { data: categories, isFetching: categoriesFetching } = useGetCategoriesQuery()
    const canDisplay = isSuccess && !isFetching && newspapers
    const formik = useFormik({
        initialValues: initialValues || {
            title: '', content: '', descritpion: '', author: '',
            publication_date: '', image_url: '', newspaper: { avatar_url: "", newspaper_id: "", name: "" }, categories: []
        } as IArticle,
        validationSchema: Yup.object({
            title: Yup.string().required('Required'),
            content: Yup.string().required('Required'),
            descritpion: Yup.string().required('Required'),
            author: Yup.string().required('Required'),
            publication_date: Yup.string().required('Required'),
            image_url: Yup.string().required('Required').url('Invalid URL'),
            newspaper: Yup.object({
                newspaper_id: Yup.string().required('Required'),
            }),
            categories: Yup.array().of(Yup.object({
                id: Yup.number().required('Required'),
            })).required('Required').min(1, 'At least one category is required')
        }),
        onSubmit: onSubmit,
    });
    console.log(typeof formik.values.categories)
    return (
        <Grid container rowSpacing={2}>
            <Grid item xs={12}>
                <TextField
                    disabled={mode == FormModes.CONSULT}
                    fullWidth
                    name="title"
                    label="Title"
                    type="text"
                    id="title"
                    autoComplete="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <TitleIcon />
                            </InputAdornment>
                        ),
                    }}
                    error={Boolean(formik.errors.title)}
                    helperText={formik.errors.title}
                />
            </Grid>
            <Grid item xs={12}>
                <Autocomplete
                    disabled={mode == FormModes.CONSULT}
                    options={canDisplay ? newspapers : []}
                    getOptionLabel={(option: INewspaper) => option.name}
                    loading={isFetching}
                    value={formik.values.newspaper}
                    onChange={(e, value) => { formik.setFieldValue('newspaper', value) }}
                    isOptionEqualToValue={(option: INewspaper, value: INewspaper) => option.newspaper_id === value.newspaper_id}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            name='newspaper'
                            id='newspaper'
                            label="Journal"
                            variant="outlined"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {isFetching ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                ),
                            }}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    disabled={mode == FormModes.CONSULT}
                    fullWidth
                    name="descritpion"
                    label="Description"
                    type="text"
                    id="descritpion"
                    autoComplete="descritpion"
                    value={formik.values.descritpion}
                    onChange={formik.handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Description />
                            </InputAdornment>
                        ),
                    }}
                    error={Boolean(formik.errors.descritpion)}
                    helperText={formik.errors.descritpion}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    disabled={mode == FormModes.CONSULT}
                    fullWidth
                    name="image_url"
                    label="Image URL"
                    type="text"
                    id="image_url"
                    autoComplete="image_url"
                    value={formik.values.image_url}
                    onChange={formik.handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <ImageRounded />
                            </InputAdornment>
                        ),
                    }}
                    error={Boolean(formik.errors.image_url)}
                    helperText={formik.errors.image_url}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    disabled={mode == FormModes.CONSULT}
                    fullWidth
                    name="author"
                    label="Author"
                    type="text"
                    id="author"
                    autoComplete="author"
                    value={formik.values.author}
                    onChange={formik.handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Person />
                            </InputAdornment>
                        ),
                    }}
                    error={Boolean(formik.errors.author)}
                    helperText={formik.errors.author}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    disabled={mode == FormModes.CONSULT}
                    fullWidth
                    name="publication_date"
                    label="Publication Date"
                    type="date"
                    id="publication_date"
                    autoComplete="publication_date"
                    value={formik.values.publication_date.split('T')[0]}
                    onChange={(e) => formik.setFieldValue('publication_date', new Date(e.target.value).toISOString())}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <CalendarMonth />
                            </InputAdornment>
                        ),
                    }}
                    error={Boolean(formik.errors.publication_date)}
                    helperText={formik.errors.publication_date}
                />
            </Grid>
            <Grid item xs={12}>
                <Autocomplete
                    disabled={mode == FormModes.CONSULT}
                    multiple
                    options={categories || []}
                    value={formik.values.categories}
                    filterSelectedOptions
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    onChange={(event, newValue) => {
                        formik.setFieldValue('categories', newValue)
                    }}
                    loading={categoriesFetching && !categories}
                    loadingText="Chargement..."
                    renderInput={(params) => (
                        <TextField {...params} variant="outlined" label="Catégories" error={Boolean(formik.errors.categories)} helperText={formik.errors.categories?.toString()} />
                    )}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip variant="filled" label={option.name} {...getTagProps({ index })} />
                        ))
                    }
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    disabled={mode == FormModes.CONSULT}
                    fullWidth
                    name="content"
                    label="Content"
                    type="text"
                    id="content"
                    autoComplete="content"
                    value={formik.values.content}
                    onChange={formik.handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <ContentIcon />
                            </InputAdornment>
                        ),
                    }}
                    multiline
                    rows={4}
                    error={Boolean(formik.errors.content)}
                    helperText={formik.errors.content}
                />
            </Grid>

            <Grid item xs={12}>
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => formik.handleSubmit()}
                >
                    {mode == FormModes.CREATE && "Créer un article"}
                    {mode == FormModes.EDIT && "Valider les modification"}
                    {mode == FormModes.CONSULT && "Modifier l'article"}
                </Button>
            </Grid>
        </Grid>
    );
};

export default ArticleForm;