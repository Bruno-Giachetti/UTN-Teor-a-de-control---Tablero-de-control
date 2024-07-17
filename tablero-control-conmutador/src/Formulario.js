import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Grid } from '@mui/material';

const FormularioFormik = ({onSetValuesFormik}) => {
  const formik = useFormik({
    initialValues: {
      referencia: 0,
      red1: 0,
      red2: 0,
      red3: 0,
      perturbacion: 0,
    },
    validationSchema: Yup.object({
      referencia: Yup.number().required('Requerido'),
      red1: Yup.number().required('Requerido'),
      red2: Yup.number().required('Requerido'),
      red3: Yup.number().required('Requerido'),
      perturbacion: Yup.number().required('Requerido'),
    }),
    onSubmit: values => {
        onSetValuesFormik(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} sx={{ marginTop: 2 }} textAlign="center">
        <Grid item xs={2} sx={{ marginLeft: 4 }}>
          <TextField
            type='number'
            id="referencia"
            name="referencia"
            label="Referencia"
            value={formik.values.referencia}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.referencia && Boolean(formik.errors.referencia)}
            helperText={formik.touched.referencia && formik.errors.referencia}
          />
        </Grid>
        <Grid item xs={2} textAlign="center">
          <TextField
            type='number'
            id="red1"
            name="red1"
            label="Red 1"
            value={formik.values.red1}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.red1 && Boolean(formik.errors.red1)}
            helperText={formik.touched.red1 && formik.errors.red1}
          />
        </Grid>
        <Grid item xs={2} textAlign="center">
          <TextField
            type='number'
            id="red2"
            name="red2"
            label="Red 2"
            value={formik.values.red2}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.red2 && Boolean(formik.errors.red2)}
            helperText={formik.touched.red2 && formik.errors.red2}
          />
        </Grid>
        <Grid item xs={2} textAlign="center">
          <TextField
            type='number'
            id="red3"
            name="red3"
            label="Red 3"
            value={formik.values.red3}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.red3 && Boolean(formik.errors.red3)}
            helperText={formik.touched.red3 && formik.errors.red3}
          />
        </Grid>
        <Grid item xs={2} textAlign="center">
          <TextField
            type='number'
            id="perturbacion"
            name="perturbacion"
            label="Perturbación"
            value={formik.values.perturbacion}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.perturbacion && Boolean(formik.errors.perturbacion)}
            helperText={formik.touched.perturbacion && formik.errors.perturbacion}
          />
        </Grid>
        <Grid item xs={12}>
          <Button color="primary" variant="contained" type="submit">
            Calcular
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default FormularioFormik;