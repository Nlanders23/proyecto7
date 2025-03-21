import React from 'react';
import { Box, Container, Typography, Grid2, Link, Divider, IconButton, Stack, Paper } from '@mui/material';
import {
    Facebook as FacebookIcon,
    Instagram as InstagramIcon,
    YouTube as YouTubeIcon,
    GitHub as GitHubIcon,
    LocalShipping as ShippingIcon,
    Replay as ReturnIcon,
    Headset as SupportIcon,
    Security as SecurityIcon,
    CreditCard as VisaIcon,
    Payment as MastercardIcon,
    AccountBalance as AmexIcon,
    PaymentOutlined as PaypalIcon,
    LocationOn as LocationIcon,
    Phone as PhoneIcon,
    Email as EmailIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const FooterWrapper = styled('footer')(({ theme }) => ({
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.common.white,
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(4)
}));

const BenefitItem = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: theme.palette.common.white,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'none',
    border: '1px solid rgba(255, 255, 255, 0.1)'
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
    color: theme.palette.grey[400],
    '&:hover': {
        color: theme.palette.common.white,
        backgroundColor: 'rgba(255, 255, 255, 0.1)'
    }
}));

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <FooterWrapper>
            <Container maxWidth="lg">
                <Grid2 container spacing={4}>
                    {/* Columna 1: Información de la empresa */}
                    <Grid2 item xs={12} md={4}>
                        <Typography variant="h5" fontWeight="bold" gutterBottom color='white'>
                            Strong Machine
                        </Typography>
                        <Typography variant="body2" color="white" sx={{ mb: 3 }}>
                            Tu tienda online de confianza para encontrar las mejores prendas deportivas
                            con la más alta calidad y tecnología.
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <SocialIcon aria-label="Facebook">
                                <FacebookIcon />
                            </SocialIcon>
                            <SocialIcon aria-label="Instagram">
                                <InstagramIcon />
                            </SocialIcon>
                            <SocialIcon aria-label="YouTube">
                                <YouTubeIcon />
                            </SocialIcon>
                            <SocialIcon aria-label="GitHub">
                                <GitHubIcon />
                            </SocialIcon>
                        </Stack>
                    </Grid2>

                    {/* Columna 2: Beneficios */}
                    <Grid2 item xs={12} md={8}>
                        <Grid2 container spacing={2}>
                            <Grid2 item xs={12} sm={3}>
                                <BenefitItem>
                                    <ShippingIcon sx={{ fontSize: 36, mb: 1, color:'white' }} />
                                    <Typography variant="subtitle1" fontWeight="bold" color='white'>
                                        Envío Gratis
                                    </Typography>
                                    <Typography variant="body2" color="white">
                                        En compras superiores a $50.000
                                    </Typography>
                                </BenefitItem>
                            </Grid2>
                            <Grid2 item xs={12} sm={3}>
                                <BenefitItem>
                                    <ReturnIcon sx={{ fontSize: 36, mb: 1, color:'white' }} />
                                    <Typography variant="subtitle1" fontWeight="bold" color='white'>
                                        Devolución Garantizada
                                    </Typography>
                                    <Typography variant="body2" color="white">
                                        30 días para devoluciones
                                    </Typography>
                                </BenefitItem>
                            </Grid2>
                            <Grid2 item xs={12} sm={3}>
                                <BenefitItem>
                                    <SupportIcon sx={{ fontSize: 36, mb: 1, color:'white' }} />
                                    <Typography variant="subtitle1" fontWeight="bold" color='white'>
                                        Soporte 24/7
                                    </Typography>
                                    <Typography variant="body2" color="white">
                                        Asistencia en línea permanente
                                    </Typography>
                                </BenefitItem>
                            </Grid2>
                            <Grid2 item xs={12} sm={3}>
                                <BenefitItem>
                                    <SecurityIcon sx={{ fontSize: 36, mb: 1, color:'white' }} />
                                    <Typography variant="subtitle1" fontWeight="bold" color='white'>
                                        Pago Seguro
                                    </Typography>
                                    <Typography variant="body2" color="white">
                                        Transacciones 100% seguras
                                    </Typography>
                                </BenefitItem>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                </Grid2>

                <Divider sx={{my: 5, borderColor: 'rgba(255, 255, 255, 0.1)'}} />

                <Grid2 container spacing={4} sx={{ mt: 2 }}>
                    {/* Contacto */}
                    <Grid2 item xs={12} md={6}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom color='white'>
                            Contáctanos
                        </Typography>
                        <Stack spacing={2}>
                            <Box display="flex" alignItems="center">
                                <LocationIcon sx={{ mr: 1, color: 'white' }} />
                                <Typography variant="body2" color="white">
                                    Av. Deportiva 123, Parral
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <PhoneIcon sx={{ mr: 1, color: 'white' }} />
                                <Typography variant="body2" color="white">
                                    +56 912 345 678
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <EmailIcon sx={{ mr: 1, color: 'white' }} />
                                <Typography variant="body2" color="white">
                                    info@strongmachine.com
                                </Typography>
                            </Box>
                        </Stack>
                    </Grid2>

                    {/* Métodos de pago */}
                    <Grid2 item xs={12} md={6}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom color='white'>
                            Métodos de pago aceptados:
                        </Typography>
                        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                            <VisaIcon sx={{ fontSize: 36, color: 'white' }} />
                            <MastercardIcon sx={{ fontSize: 36, color: 'white' }} />
                            <AmexIcon sx={{ fontSize: 36, color: 'white' }} />
                            <PaypalIcon sx={{ fontSize: 36, color: 'white' }} />
                        </Stack>
                    </Grid2>
                </Grid2>

                <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

                {/* Copyright */}
                <Box textAlign="center">
                    <Typography variant="body2" color="white">
                        &copy; {currentYear} Strong Machine. Todos los derechos reservados.
                    </Typography>
                    <Box mt={1}>
                        <Link href="#" color="text.secondary" sx={{ mx: 1, '&:hover': { color: 'common.white' } }}>
                            Términos y Condiciones
                        </Link>
                        <Link href="#" color="text.secondary" sx={{ mx: 1, '&:hover': { color: 'common.white' } }}>
                            Política de Privacidad
                        </Link>
                        <Link href="#" color="text.secondary" sx={{ mx: 1, '&:hover': { color: 'common.white' } }}>
                            Política de Cookies
                        </Link>
                    </Box>
                </Box>
            </Container>
        </FooterWrapper>
    );
};

export default Footer;