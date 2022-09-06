import React from "react";

import Container from "@mui/material/Container";
import ArticleIcon from "@mui/icons-material/Article";
import Typography from "@mui/material/Typography";

const EmptyContent = () => {
  const containerStyleSX = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const articleIconStyleSX = {
    fontSize: 70,
    marginBottom: "30px",
    color: "white",
  };

  return (
    <Container fixed sx={containerStyleSX}>
      <ArticleIcon sx={articleIconStyleSX} />

      <Typography variant="h4" component="h4">
        Nenhum objeto selecionado
      </Typography>
      <Typography variant="h4" component="h4">
        para a comparação
      </Typography>
    </Container>
  );
};

export default EmptyContent;
