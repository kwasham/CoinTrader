import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import StarIcon from "@mui/icons-material/Star";
// import fire from "/assets/fire.png";
import PieChartIcon from "@mui/icons-material/PieChart";
import { GridToolbarContainer } from "@mui/x-data-grid";


export default function ButtonAppBar() {
  return (
    <GridToolbarContainer>
      <AppBar
        position="static"
        color="transparent"
        enableColorOnDark
        sx={{ boxShadow: "none"}}
      >
        <Toolbar disableGutters 
        sx={{paddingLeft: "0px"}}>
          <Button
            component="a"
            href="/dashboard"
            size="small"
            sx={{ color: "text.secondary" }}
            startIcon={<StarIcon sx={{ color: "text.secondary", mr: -0.5 }} />}
            variant="text"
          >
            Watchlist
          </Button>
          <Button
            component="a"
            href="/dashboard"
            size="small"
            sx={{ color: "text.secondary" }}
            startIcon={
              <PieChartIcon sx={{ color: "text.secondary", mr: -0.5 }} />
            }
            variant="text"
          >
            Portfolio
          </Button>
          <Divider orientation="vertical" 
          variant="middle" 
          sx={{height: "15px"}}/>
          <Button
            component="a"
            href="/dashboard"
            size="small"
            sx={{ color: "text.secondary" }}
            
            variant="text"
          >
            Cryptocurrencies
          </Button>
          <Button
            component="a"
            href="/dashboard"
            size="small"
            sx={{ color: "text.secondary" }}
            
            variant="text"
          >
            Categories
          </Button>
          <Divider orientation="vertical" 
          variant="middle" 
          sx={{height: "15px"}}/>
          <Button
            component="a"
            href="/dashboard"
            size="small"
            sx={{ color: "text.secondary" }}
            startIcon={<Avatar alt="fire" 
            src="/assets/fire.png"
            sx={{backgroundColor: "transparent", height: 15, width: 15}}/>}
            variant="text"
          >
            FTX Bankruptcy Estate
          </Button>
          <Button
            component="a"
            href="/dashboard"
            size="small"
            sx={{ color: "text.secondary" }}
            startIcon={<Avatar alt="fire" 
            src="/assets/fire.png" 
            sx={{backgroundColor: "transparent", height: 15, width: 15}}/>}
            variant="text"
          >
            Alleged SEC Securities
          </Button>
          <Button
            component="a"
            href="/dashboard"
            size="small"
            sx={{ color: "text.secondary" }}
            startIcon={<Avatar alt="fire" 
            src="/assets/fire.png" 
            sx={{backgroundColor: "transparent", height: 15, width: 15}}/>}
            variant="text"
          >
            Liquid Staking Derivitives
          </Button>
          <Button
            component="a"
            href="/dashboard"
            size="small"
            sx={{ color: "text.secondary" }}
            startIcon={<Avatar alt="fire" 
            src="/assets/fire.png" 
            sx={{backgroundColor: "transparent", height: 15, width: 15}}/>}
            variant="text"
          >
            Defi
          </Button>
          
        </Toolbar>
      </AppBar>
    </GridToolbarContainer>
  );
}
