import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getWeatherData } from "../actions";
import {
  Button,
  Typography,
  Grid,
  Card,
  CardActions,
  CardContent,
  CircularProgress
} from "@material-ui/core";
import xmlToJson from "xml-to-json-stream";

class WeatherData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getWeather();
  }

  getWeather() {
    if (navigator.geolocation) {
      this.getPosition()
        .then(position => {
          this.setState({ position });
          this.props
            .getWeatherData(position.coords.latitude, position.coords.longitude)
            .then(res =>
              this.setState({ weather: res.payload.data }, this.convertToJSON)
            );
        })
        .catch(err => {
          this.setState({ errorMessage: err.message });
        });
    } else {
      alert("Geolocation not available");
    }
  }
  handleOnclick() {
    this.getWeather();
  }
  convertToJSON() {
    if (typeof this.state.weather !== "undefined") {
      var parser = xmlToJson({ attributeMode: true });
      parser.xmlToJson(this.state.weather, (err, json) => {
        this.setState({ weatherJson: json.current });
      });
    }
  }

  getPosition = options => {
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  displayWeatherData() {
    if (typeof this.state.weatherJson !== "undefined") {
      var image =
        "http://openweathermap.org/img/w/" +
        this.state.weatherJson.weather.icon +
        ".png";
      return (
        <Grid container spacing={8}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Card raised={true}>
              <CardContent>
                <Typography variant="subtitle1">
                  Country Code: {this.state.weatherJson.city.country}
                  <img src={image} alt="Weather" />
                </Typography>
                <Typography variant="subtitle1">
                  Latitude: {this.state.weatherJson.city.coord.lat}
                </Typography>
                <Typography variant="subtitle1">
                  Longitude: {this.state.weatherJson.city.coord.lon}
                </Typography>
                <Typography variant="subtitle1">
                  Last Update: {this.state.weatherJson.lastupdate.value}
                </Typography>
                <Typography variant="subtitle1">
                  Current Temperature:
                  {this.state.weatherJson.temperature.value}{" "}
                  {this.state.weatherJson.temperature.unit}
                </Typography>
                <Typography variant="subtitle1">
                  Max Temperature: {this.state.weatherJson.temperature.max}{" "}
                  {this.state.weatherJson.temperature.unit}
                </Typography>
                <Typography variant="subtitle1">
                  Minimum Temperature: {this.state.weatherJson.temperature.min}{" "}
                  {this.state.weatherJson.temperature.unit}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleOnclick.bind(this)}
                >
                  Get Latest Weather
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      );
    }
    return (
      <div>
        <CircularProgress variant="determinate" />
      </div>
    );
  }

  render() {
    return this.displayWeatherData();
  }
}

function mapStateToProps(state) {
  return { weather: state.weather };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getWeatherData }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeatherData);
