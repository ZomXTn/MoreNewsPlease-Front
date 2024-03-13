import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { Box, Stack, TextField, Button, Typography, IconButton, InputAdornment } from '@mui/material';
import { Password, Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@mui/icons-material';
import { useChangePasswordMutation } from '../../features/authApi';

const ChangePasswordForm: React.FC = () => {
    const [showCurrentPassword, setShowCurrentPassword] = React.useState(false)
    const [showNewPassword, setShowNewPassword] = React.useState(false)
    const [showReNewPassword, setShowReNewPassword] = React.useState(false)
    const [changePassword] = useChangePasswordMutation();
    const validationSchema = yup.object({
        current_password: yup.string().required('Current password is required'),
        new_password: yup.string().required('New password is required'),
        re_new_password: yup.string().oneOf([yup.ref('new_password')], 'Passwords must match'),
    });

    const formik = useFormik({
        initialValues: {
            current_password: '',
            new_password: '',
            re_new_password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                await changePassword(values).unwrap();
                toast("Mot de passe changé avec succès", { type: 'success', position: "top-center", autoClose: 2000 });
            } catch (error) {
                toast("Une erreur est survenu lors du changement de mot de passe", { type: 'error', position: "top-center", autoClose: 2000 });
            }
        },
    });

    return (
        <Box width="100%" display="flex" justifyContent="center">
            <Stack width="50%" direction="column" gap={2}>
                <Typography variant="h5" component="h2" textAlign={"center"}>Changer mot de passe</Typography>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="current_password"
                    label="Mot de passe actuel"
                    name="current_password"
                    type={showCurrentPassword ? "text" : "password"}
                    value={formik.values.current_password}
                    onChange={formik.handleChange}
                    error={formik.touched.current_password && Boolean(formik.errors.current_password)}
                    helperText={formik.touched.current_password && formik.errors.current_password}
                    InputProps={{
                        startAdornment:
                            <InputAdornment position="start">
                                <Password />
                            </InputAdornment>,
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    edge="end"
                                >
                                    {showCurrentPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="new_password"
                    label="Mot de passe actuel"
                    name="new_password"
                    type={showNewPassword ? "text" : "password"}
                    value={formik.values.new_password}
                    onChange={formik.handleChange}
                    error={formik.touched.new_password && Boolean(formik.errors.new_password)}
                    helperText={formik.touched.new_password && formik.errors.new_password}
                    InputProps={{
                        startAdornment:
                            <InputAdornment position="start">
                                <Password />
                            </InputAdornment>,
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    edge="end"
                                >
                                    {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="re_new_password"
                    label="Mot de passe actuel"
                    name="re_new_password"
                    type={showReNewPassword ? "text" : "password"}
                    value={formik.values.re_new_password}
                    onChange={formik.handleChange}
                    error={formik.touched.new_password && Boolean(formik.errors.re_new_password)}
                    helperText={formik.touched.new_password && formik.errors.re_new_password}
                    InputProps={{
                        startAdornment:
                            <InputAdornment position="start">
                                <Password />
                            </InputAdornment>,
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowReNewPassword(!showReNewPassword)}
                                    edge="end"
                                >
                                    {showReNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                {/* Repeat the same for new_password and re_new_password fields */}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => formik.handleSubmit()}
                >
                    Change Password
                </Button>
            </Stack>
        </Box>
    );
};

export default ChangePasswordForm;