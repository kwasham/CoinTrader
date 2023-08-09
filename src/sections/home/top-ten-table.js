import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { IconButton, Container, Typography } from "@mui/material";
import { Avatar, Link as MyLink } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ButtonAppBar from "./custom-toolbar";
import { green, red } from "@mui/material/colors";
import Link from "next/link";
//import {ChartLine} from "./sparkline-cell";


const TopTenTable = ({data}) => {
  
  const [topTen, setTopTen] = useState(data);
  const [watchlist, setWatchlist] = useState([]);

  

  const columns = [
    {
      field: "id",
      headerName: "",
      width: 20,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          color={watchlist.includes(params.value) ? "primary" : "default"}
          onClick={() => handleWatchlistToggle(params.value)}
        >
          {watchlist.includes(params.value) ? <StarIcon /> : <StarBorderIcon />}
        </IconButton>
      ),
    },
    { field: "cmc_rank", headerName: "#", width: 5, sortable: false },
    
    {
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: (params) => (
        <Link
          href={`/currencies/${params.row.slug}?symbol=${params.row.symbol}`}
          as={`/currencies/${params.row.slug}`}
          style={{ textDecoration: "none" }}
          passHref
        >
          <MyLink
            component="span"
            color="textPrimary"
            underline="none"
            sx={{ 
              display: "flex", 
              alignItems: "center", 
            }}
          >
            <Avatar
              src={params.row.logoUrl}
              sx={{ width: 30, height: 30, backgroundColor: "transparent", mr: 1 }}
            />
            <Typography variant="subtitle2" 
            sx={{ mr: 1 }}>
              {params.row.name}
            </Typography>
            <Typography variant="subtitle2" >
              {params.row.symbol}
            </Typography>
          </MyLink>
        </Link>
      ),
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      valueGetter: (params) => {
        const price = params.row.quote?.USD?.price;
        if (typeof price === "number") {
          const decimalPlaces = price >= 1 ? 2 : 4;
          const formattedPrice = price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces,
          });
          return formattedPrice;
        }
        return "-";
      },
    },
    {
      field: "percentChange1h",
      headerName: "1h%",
      width: 100,
      valueGetter: (params) => params.row?.quote?.USD?.percent_change_1h || 0,
      renderCell: (params) => {
        const percentChange = params.value;
        if (typeof percentChange === "number") {
          const formattedPercentChange =
            Math.abs(percentChange).toFixed(3) + "%";
          const color = percentChange >= 0 ? green[500] : red[500];
          const Icon = percentChange >= 0 ? ArrowDropUpIcon : ArrowDropDownIcon;

          return (
            <span style={{ display: "flex", alignItems: "center", color }}>
              <Icon />
              {formattedPercentChange}
            </span>
          );
        }
        return "-";
      },
    },
    {
      field: "percentChange24h",
      headerName: "24h%",
      width: 100,
      valueGetter: (params) => params.row?.quote?.USD?.percent_change_24h || 0,
      renderCell: (params) => {
        const percentChange = params.value;
        if (typeof percentChange === "number") {
          const formattedPercentChange =
            Math.abs(percentChange).toFixed(3) + "%";
          const color = percentChange >= 0 ? green[500] : red[500];
          const Icon = percentChange >= 0 ? ArrowDropUpIcon : ArrowDropDownIcon;

          return (
            <span style={{ display: "flex", alignItems: "center", color }}>
              <Icon />
              {formattedPercentChange}
            </span>
          );
        }
        return "-";
      },
    },
    {
      field: "percentChange7d",
      headerName: "7d%",
      width: 100,
      valueGetter: (params) => params.row?.quote?.USD?.percent_change_7d || 0,
      renderCell: (params) => {
        const percentChange = params.value;
        if (typeof percentChange === "number") {
          const formattedPercentChange =
            Math.abs(percentChange).toFixed(3) + "%";
          const color = percentChange >= 0 ? green[500] : red[500];
          const Icon = percentChange >= 0 ? ArrowDropUpIcon : ArrowDropDownIcon;

          return (
            <span style={{ display: "flex", alignItems: "center", color }}>
              <Icon />
              {formattedPercentChange}
            </span>
          );
        }
        return "-";
      },
    },
    {
      field: "marketCap",
      headerName: "Market Cap",
      width: 150,
      valueGetter: (params) => {
        const price = params.row.quote?.USD?.market_cap;
        if (typeof price === "number") {
          const formattedPrice = price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          });
          return formattedPrice;
        }
        return "-";
      },
    },
    {
      field: "volume24h",
      headerName: "Volume (24h)",
      width: 150,
      valueGetter: (params) => {
        const price = params.row.quote?.USD?.volume_24h;
        if (typeof price === "number") {
          const formattedPrice = price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          });
          return formattedPrice;
        }
        return "-";
      },
    },
    {
      field: "circulatingSupply",
      headerName: "Circulating Supply",
      width: 150,
      valueGetter: (params) => {
        const price = params.row.circulating_supply;
        if (typeof price === "number") {
          const formattedPrice = price.toLocaleString("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          });
          return formattedPrice;
        }
        return "-";
      },
    },
    
    // {
    //   field: 'data',
    //   headerName: 'Data',
    //   width: 150,
    //   renderCell: (params) => <NextLink
    //   href={`/currencies/${params.row.slug}?symbol=${params.row.symbol}`}
    //   as={`/currencies/${params.row.slug}`}
    //   passHref
    // >{params.row.name}</NextLink>
    // },
  ];

  const handleWatchlistToggle = (id) => {
    if (watchlist.includes(id)) {
      // Remove from watchlist
      setWatchlist(watchlist.filter((itemId) => itemId !== id));
    } else {
      // Add to watchlist
      setWatchlist([...watchlist, id]);
    }
  };

  return (
    <Container maxWidth="lg" 
    sx={{pt: "64px"}}>
      <DataGrid
        rows={topTen}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        initialState={{ pagination: { paginationModel: { pageSize: 20 } } }}
        disableSelectionOnClick
        disableColumnMenu
        slots={{
          toolbar: ButtonAppBar,
          columnSortedDescendingIcon: ExpandMoreIcon,
          columnSortedAscendingIcon: ExpandLessIcon,
        }}
        sx={{
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-cell:focus-within": {
            outline: "none",
          }
          
        }}
      />
    </Container>
  );
};

export default TopTenTable;


