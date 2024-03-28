import logo from '../assets/shine 4.svg'
import bg from '../assets/footer-bg.jpg'

import {Link} from "@mui/material";
import {Box, Stack} from "@mui/system";

const Footer = () => {
    return (
        <Box sx={{
            backgroundImage: `url(${bg})`, position: 'relative',
        }}>
            <Stack sx={{textAlign: 'center', alignItems: 'center', py: '50px'}}>
                <Box>
                    <img height={100} src={logo} alt="logo"/>
                </Box>
                <Stack direction="row" spacing={15}>
                    <Stack spacing={2}>
                        <Link href="/" underline="none" color='white'
                              sx={{
                                  fontWeight: '600', fontSize: '18px', ':hover': {
                                      color: 'red'
                                  }
                              }}>Home</Link>
                        <Link href="/" underline="none" color='white' sx={{
                            fontWeight: '600', fontSize: '18px', ':hover': {
                                color: 'red'}
                        }}>Contact us</Link>
                        <Link href="/" underline="none" color='white' sx={{
                            fontWeight: '600', fontSize: '18px', ':hover': {
                                color: 'red'
                            }
                        }}>Term of
                            services</Link>
                        <Link href="/" underline="none" color='white' sx={{
                            fontWeight: '600', fontSize: '18px', ':hover': {
                                color: 'red'
                            }
                        }}>About us</Link>
                    </Stack>
                    <Stack spacing={2}>
                        <Link href="/" underline="none" color='white'
                              sx={{
                                  fontWeight: '600', fontSize: '18px', ':hover': {
                                      color: 'red'
                                  }
                              }}>Live</Link>

                        <Link href="/" underline="none" color='white'
                              sx={{
                                  fontWeight: '600', fontSize: '18px', ':hover': {
                                      color: 'red'
                                  }
                              }}>FAQ</Link>

                        <Link href="/" underline="none" color='white'
                              sx={{
                                  fontWeight: '600', fontSize: '18px', ':hover': {
                                      color: 'red'
                                  }
                              }}>Premium</Link>

                        <Link href="/" underline="none" color='white' sx={{
                            fontWeight: '600', fontSize: '18px', ':hover': {
                                color: 'red'
                            }
                        }}>Privacy policy</Link>
                    </Stack>
                    <Stack spacing={2}>

                        <Link href="/" underline="none" color='white' sx={{
                            fontWeight: '600', fontSize: '18px', ':hover': {
                                color: 'red'
                            }
                        }}>You must watch</Link>

                        <Link href="/" underline="none" color='white' sx={{
                            fontWeight: '600', fontSize: '18px', ':hover': {
                                color: 'red'
                            }
                        }}>Recent release</Link>

                        <Link href="/" underline="none" color='white' sx={{
                            fontWeight: '600', fontSize: '18px', ':hover': {
                                color: 'red'
                            }
                        }}>Top IMDB</Link>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
}

export {Footer}