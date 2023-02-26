import {
  Grid,
  Typography,
  styled,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import InputAdornment from "@mui/material/InputAdornment";
import { Link, useNavigate } from "react-router-dom";

const PageGridContainer = styled(Grid)`
  height: 100%;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;

  &&& {
    ${({ theme }) => theme.breakpoints.down("md")} {
      padding: 0 24px;
    }
  }
`;
const Background = styled(Box)`
  background-color: ${(props) => props.theme.palette.background.default};
  backgroundsize: "cover";
  min-height: 100vh;
  width: 100vw;
`;

export function RenderForms() {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm({
    shouldUnregister: true,
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const navigate = useNavigate();
  return (
    <Background>
      <PageGridContainer>
        <Grid
          item
          container
          direction="column"
          marginTop={5}
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="body-l">Code-Challenge-Problem-2</Typography>
        </Grid>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          paddingTop="30px"
        >
          <form
            onSubmit={handleSubmit((data) => {
              navigate("/submit", { state: data });
            })}
          >
            <Grid item container direction="column" maxWidth="500px">
              <Grid paddingTop="10px">
                <Typography variant="headline-s">
                  Complete your details
                </Typography>
              </Grid>

              <Grid item container paddingTop="30px">
                <Grid item container>
                  <Grid item sm={12}>
                    <Typography>ETH Address</Typography>
                    <TextField
                      focused
                      fullWidth
                      id={"input-address"}
                      style={{
                        fontSize: 16,
                      }}
                      {...register("ethAddress", {
                        required: true,
                        minLength: 42,
                        pattern: /^0x[a-fA-F0-9]{40}$/g,
                      })}
                    />
                  </Grid>
                  <Grid item sm={12} alignItems="center">
                    {errors?.ethAddress?.type === "required" && (
                      <Typography color="red">
                        This field is required
                      </Typography>
                    )}
                    {errors?.ethAddress?.type === "minLength" && (
                      <Typography color="red">
                        Eth Address cannot be less than 42 characters
                      </Typography>
                    )}
                    {errors?.ethAddress?.type === "pattern" && (
                      <Typography color="red">
                        Please enter a valid ETH Address
                      </Typography>
                    )}
                  </Grid>
                </Grid>
                <Grid item container paddingTop="30px">
                  <Grid item sm={12}>
                    <Typography>Amount to Send</Typography>
                    <TextField
                      focused
                      fullWidth
                      id={"input-amount"}
                      style={{
                        fontSize: 16,
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                      {...register("Amount", {
                        required: true,
                        pattern: /^\d+(\.|\,)\d{2}$/g,
                      })}
                    />
                  </Grid>
                  <Grid item sm={12} alignItems="center">
                    {errors?.Amount?.type === "required" && (
                      <Typography color="red">
                        This field is required
                      </Typography>
                    )}
                    {errors?.Amount?.type === "pattern" && (
                      <Typography color="red">
                        Please enter a valid Amount
                      </Typography>
                    )}
                  </Grid>
                </Grid>
                <Grid item container paddingTop="30px">
                  <Grid item sm={12}>
                    <Typography>OTP Authentication</Typography>
                    <TextField
                      focused
                      fullWidth
                      id={"input-otp"}
                      style={{
                        fontSize: 16,
                      }}
                      {...register("Otp", {
                        required: true,
                        pattern: /^[0-9]{1,6}$/,
                        minLength: 6,
                        maxLength: 6,
                      })}
                    />
                  </Grid>
                  <Grid item sm={12} alignItems="center">
                    {errors?.Otp?.type === "required" && (
                      <Typography color="red">
                        This field is required
                      </Typography>
                    )}
                    {errors?.Otp?.type === "pattern" && (
                      <Typography color="red">
                        Please enter a valid Otp
                      </Typography>
                    )}
                    {errors?.Otp?.type === "minLength" && (
                      <Typography color="red">
                        Invalid Otp.Your Otp should contain 6 numbers
                      </Typography>
                    )}
                    {errors?.Otp?.type === "maxLength" && (
                      <Typography color="red">
                        Invalid Otp.Your Otp should contain 6 numbers
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                container
                paddingTop="30px"
                display="flex"
                justifyContent="flex-end"
              >
                <Grid item sm={6} display="flex" justifyContent="flex-end">
                  <Button variant="contained" size="small" type="submit">
                    SEND TOKENS
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </PageGridContainer>
    </Background>
  );
}
