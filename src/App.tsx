import { Box, Grid, Modal, Paper, Stack, Typography } from '@mui/material';
import AnimatedBackground from './components/shared/AnimatedBackgourbd';
import Carousel from './components/PartnersSlides';



export default function App() {
  return (
    <Grid container justifyContent="center" alignItems="center" height={"100vh"}>
      <AnimatedBackground />
      <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={() => { }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        disableEscapeKeyDown
        disableAutoFocus
      >
        <Box width={{
          xs: "40vw",

        }}>
          <Paper>
            <Stack direction={"column"} sx={{
              padding: {
                xs: 2,
                lg: 4
              }
            }}
              gap={3}>
              <Typography id="modal-modal-title" variant="h3" component="h2" textAlign={"center"}>
                MoreNewsPlease
              </Typography>
              <Typography id="modal-modal-description" variant="body1" component="p" textAlign={"center"}>
                Ce site est réalisé dans le cadre de la Mise en oeuvre de cas industriel de la formation M2 SID
              </Typography>
              <Typography id="modal-modal-description" variant="body1" component="p" textAlign={"center"}>
                Le but de cette plateforme est de permettre aux utilisateurs de consulter les dernières actualités en temps réel et offrir des recommendations personnalisées en se basant sur le comportement de l'utilisateur.
              </Typography>
              <Typography id="modal-modal-description" variant="body1" component="p" textAlign={"center"}>
                Le projet a été réalisé en partenariat avec:
              </Typography>
              <Typography id="modal-modal-description" variant="body1" component="p" textAlign={"center"}>
                Si vous possédez un compte, veuillez vous <a href='/login'>connecter</a> pour accéder à la plateforme. Sinon veuillez contacter un administrateur pour obtenir un compte.
              </Typography>
              <Box width="100%" maxHeight="30vh" component="div" className='slider-container'>
                <Carousel data={[
                  {
                    image: "https://i.imgur.com/aJtPVlu.png",
                    title: "Université de Lorraine",
                  },
                  {
                    image: "https://i.imgur.com/qLb9TLX.png",
                    title: "Institut des sciences du digital Management & Cognition",
                  },
                  {
                    image: "https://i.imgur.com/JiNVLuN.png",
                    title: "Loria",
                  },
                  {
                    image: "https://i.imgur.com/pXXEzm0.png",
                    title: "Equipe BIRD",
                  },
                  {
                    image: "https://i.imgur.com/6kAorcA.png",
                    title: "Syllabs"
                  },
                  {
                    image: "https://i.imgur.com/UNROgpw.png",
                    title: "CEA"
                  },
                  {
                    image: "https://i.imgur.com/YnXuR5u.png",
                    title: "Université d'Avignon"
                  }

                ]} />
              </Box>
            </Stack>
          </Paper>
        </Box>

      </Modal>
    </Grid>
  );
}
