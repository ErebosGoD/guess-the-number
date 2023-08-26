import { Box, Button, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import { ErrorHandling } from "../components/ErrorHandling";
import { useRegisterApi } from "../apis/RegisterApi";
import { getFrontendUrl } from "../apis/BaseUrl";

export function Register() {

    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [httpStatusCode, setHttpStatusCode] = useState<number>()

    const getUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const getPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const getConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const getUserCredentials = (e: React.MouseEvent<HTMLButtonElement>) => {
        setHttpStatusCode(undefined)
        useRegisterApi(username, password)(e)
            .then(async (response) => {
                return response.SessionToken
            }).then((sessionToken) => {
                localStorage.setItem('', JSON.stringify([{
                    username: username,
                    sessionToken: sessionToken
                }]));
                setUsername('')
                setPassword('')
                setConfirmPassword('')
            }).catch((statusCode) => {
                setHttpStatusCode(statusCode)
                if (statusCode === 200) {
                    window.location.href = `${getFrontendUrl()}/${username}`;
                }
            })
    };

    return (
        <Box>
            <Typography textAlign="center" sx={{ mt: '75px', fontFamily: 'QuinqueFive', fontSize: 20 }}>
                Create your account!
            </Typography>
            <Stack className="login" direction="column" spacing={"16px"} sx={{ width: 'fit-content', mt: '75px', alignItems: 'center' }}>
                <TextField label="Username" autoComplete="off" variant="outlined" value={username} onChange={getUsername} sx={{ width: '15em' }} />
                <TextField label="Password" autoComplete="off" type={showPassword ? 'text' : 'password'} value={password} onChange={getPassword} sx={{ width: '15em' }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField label="Confirm Password" autoComplete="off" type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={getConfirmPassword} sx={{ width: '15em' }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Button variant="contained" onClick={getUserCredentials} sx={{ textTransform: 'none', fontSize: 10, fontFamily: 'QuinqueFive' }}>
                    Create Account
                </Button>
                <ErrorHandling httpStatusCode={httpStatusCode} />
            </Stack>
        </Box>
    );
}