import {
  Grid,
  Typography,
  styled,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import { useLocation } from "react-router-dom";
const Background = styled(Box)`
  background-color: ${(props) => props.theme.palette.background.default};
  backgroundsize: "cover";
  min-height: 100vh;
  width: 100vw;
`;
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

export function SubmitForm() {
  const { state } = useLocation();

  return (
    <Background>
      <PageGridContainer paddingTop="30px">
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          display="flex"
        >
          <Typography>Your Submitted Details are:</Typography>
          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            display="flex"
            paddingTop="30px"
          >
            {Object.keys(state).map((key, index) => {
              return (
                <Grid
                  item
                  sm={12}
                  key={`${index}-1`}
                  paddingTop="15px"
                  display="flex"
                  justifyContent="center"
                >
                  <Card sx={{ flex: "1 0 auto", maxWidth: "500px" }}>
                    <CardContent>
                      <Typography key={`${index}-2`}>{key}:</Typography>
                      <Typography key={`${index}-3-1`}>{state[key]}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </PageGridContainer>
    </Background>
  );
}
