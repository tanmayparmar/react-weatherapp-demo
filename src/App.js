import React from "react";
import { Grid, Card, CardContent, CardHeader } from "@material-ui/core";
import WeatherData from "./containers/WeatherData";

class App extends React.Component {
  render() {
    return (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <CardHeader
              fontSize={24}
              fontWeight="fontWeightBold"
              title="The Weather App"
            ></CardHeader>
            <CardContent>
              <WeatherData />
            </CardContent>
          </Grid>
        </Grid>
    );
  }
}

export default App;
