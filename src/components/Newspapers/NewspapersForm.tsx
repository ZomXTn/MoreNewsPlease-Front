import { Box, Button, Grid, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { INewspaper } from '../../types/entities';
import { FormModes } from '../../types/types';
import { Mode } from '@mui/icons-material';

interface INewspaperFormProps {
    onSubmit: (values: INewspaper) => void;
    initialValues?: INewspaper;
    mode : FormModes
}

const NewspaperForm: React.FC<INewspaperFormProps> = ({ onSubmit, initialValues, mode }) => {
    const formik = useFormik({
        initialValues: initialValues || {
            newspaper_id: '',
            name: '',
            avatar_url: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            avatar_url: Yup.string().url('Invalid URL').required('Required'),
        }),
        onSubmit,
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField disabled={mode===FormModes.CONSULT}
                        fullWidth
                        id="name"
                        name="name"
                        label="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField disabled={mode===FormModes.CONSULT}
                        fullWidth
                        id="avatar_url"
                        name="avatar_url"
                        label="Avatar URL"
                        value={formik.values.avatar_url}
                        onChange={formik.handleChange}
                        error={formik.touched.avatar_url && Boolean(formik.errors.avatar_url)}
                        helperText={formik.touched.avatar_url && formik.errors.avatar_url}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button color="primary" variant="contained" fullWidth type="submit">
                        {mode === FormModes.CREATE && "Créer un journal"}
                        {mode === FormModes.EDIT && "Valider les modifications"}
                        {mode === FormModes.CONSULT && "Modifier un journal"}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default NewspaperForm;