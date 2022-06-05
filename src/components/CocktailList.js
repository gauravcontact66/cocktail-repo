import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCocktails } from "../redux/features/cocktailSlice";
import { Link } from 'react-router-dom';
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
  Button
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
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

const CocktailList = () => {
  const [expanded, setExpanded] = useState(false);
  const { cocktails, loading } = useSelector((state) => ({ ...state.app }));
  const [modifiedCocktail, setModifiedCocktail] = useState([]);
  const dispatch = useDispatch;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  useEffect(() => {
    dispatch(fetchCocktails());
  }, [dispatch]);

  useEffect(() => {
    if (cocktails) {
      const newCocktails = cocktails.map((item) => {
        const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass, dateModified, strInstructions } =
          item;

        return {
          id: idDrink,
          name: strDrink,
          image: strDrinkThumb,
          info: strAlcoholic,
          glass: strGlass,
          dateModified,
          strInstructions
        };
      });
      setModifiedCocktail(newCocktails);
    } else {
      setModifiedCocktail([]);
    }
  });

  if (loading) {
    return (
      <div className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  console.log("Cocktails:", cocktails);
  console.log("Modified cocktails:", modifiedCocktail);
  return (
    <Container maxWidth="xl">
      <Box sx={{ bgcolor: "#cfe8fc", height: "auto", flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item>
              <h2>Cocktail List</h2>
            </Item>
          </Grid>
          {modifiedCocktail.map((item) => {
            const { id, name, image, info, glass, dateModified, strInstructions } = item;
            return (
              <Grid item xs={4} key={id}>
                <Card sx={{ maxWidth: 'auto' }}>
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
                  subheader={dateModified}
                />
                  <CardMedia
                    component="img"
                    height="200"
                    image={image}
                    alt={name}
                  />
                  <CardContent>
                    <Typography variant="body1" color="text.secondary" className="text-left text-bold">
                      {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className="text-left">
                      {glass}
                    </Typography>
                    <div className="text-right">
                      <Link to={`/cocktail/${id}`}>
                          <Button variant="outlined" size="small" startIcon={<InfoOutlinedIcon />}>Details</Button>
                      </Link>
                    </div>
                                       
                  </CardContent>
                  <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent className="text-left"> 
                    <Typography variant="body2" color="text.secondary" className="text-left text-italic">
                      {strInstructions}
                    </Typography>
                  </CardContent>
                </Collapse>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
};

export default CocktailList;
