import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleCocktail } from "../redux/features/cocktailSlice";
import { Link, useParams } from "react-router-dom";

import {
  Box,
  Container,
  Grid,
  Paper,
  styled,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  CardMedia,
  CardActions,
  Collapse,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { red } from "@mui/material/colors";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const SingleCocktail = () => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  const { cocktail, loading } = useSelector((state) => ({ ...state.app }));
  const [modifiedCocktail, setModifiedCocktail] = useState([]);
  const { id } = useParams();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    dispatch(fetchSingleCocktail({ id }));
  }, [id]);

  useEffect(() => {
    if (cocktail.length > 0) {
      const {
        strDrink: name,
        strDrinkThumb: image,
        strAlcholic: info,
        strCategory: category,
        strGlass: glass,
        strInstructions: instructions,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
      } = cocktail[0];
      const ingredients = [
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
      ];
      const newCocktail = {
        name,
        image,
        info,
        category,
        glass,
        instructions,
        ingredients,
      };
      setModifiedCocktail(newCocktail);
    } else {
      setModifiedCocktail(null);
    }
  }, [cocktail, id]);

  if (!modifiedCocktail) {
    return <h2>No cocktail to Display</h2>;
  } else {
    const { name, image, info, glass, category, instructions, ingredients } =
      modifiedCocktail;
    return (
      <>
        {loading ? (
          <div className="spinner-grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <Container maxWidth="xl">
            <Box sx={{ bgcolor: "#cfe8fc", height: "auto", flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Item>
                    <h2>Cocktail Info</h2>
                    <Link to="/">
                      <Button>Go Back</Button>
                    </Link>
                  </Item>
                </Grid>

                <Grid item xs={6} key={id}>
                  <Card sx={{ maxWidth: "auto" }}>
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                          R
                        </Avatar>
                      }
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={glass}
                      subheader={info}
                    />
                    <CardMedia
                      component="img"
                      height="200"
                      image={image}
                      alt={name}
                    />
                    <CardContent>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        className="text-left text-bold"
                      >
                        {name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        className="text-left text-bold"
                      >
                        {glass}
                      </Typography>
                      <Grid xs={12}>
                        <div className="text-left text-bold">Ingredients</div>
                        {ingredients.map((item, index) => {
                          return item ? (
                            <Typography
                            variant="body2"
                            color="text.secondary"
                            className="text-left"
                            key={index}
                          >
                            <strong>{index + 1}.</strong> {item}
                        </Typography>
                          ) : null;
                        })}                       
                      </Grid>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        className="text-left"
                      >
                        {instructions}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Container>
        )}
      </>
    );
  }
};

export default SingleCocktail;
