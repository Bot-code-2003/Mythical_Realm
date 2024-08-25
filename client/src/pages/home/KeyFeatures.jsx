import React from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";
import BookIcon from "@mui/icons-material/Book";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CreateIcon from "@mui/icons-material/Create";

const KeyFeatures = () => {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Key Features
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={3} textAlign="center">
          <Box sx={{ fontSize: 40, color: "primary.main" }}>
            <ExploreIcon />
          </Box>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Explore
          </Typography>
          <Typography variant="body2">Discover curated content.</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3} textAlign="center">
          <Box sx={{ fontSize: 40, color: "primary.main" }}>
            <LibraryBooksIcon />
          </Box>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Stories
          </Typography>
          <Typography variant="body2">
            Dive into crafted myths and legends.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3} textAlign="center">
          <Box sx={{ fontSize: 40, color: "primary.main" }}>
            <BookIcon />
          </Box>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Blogs
          </Typography>
          <Typography variant="body2">Read insights and articles.</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3} textAlign="center">
          <Box sx={{ fontSize: 40, color: "primary.main" }}>
            <CreateIcon />
          </Box>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Create
          </Typography>
          <Typography variant="body2">
            Share your own stories and content.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default KeyFeatures;
