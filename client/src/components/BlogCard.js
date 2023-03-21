import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';



export default function BlogCard({title,description,image,username,time}) {


  

  return (
    <Card sx={{ width:'50%',margin:'auto',mt:2,mb:2 ,padding:2,boxShadow:'0 0 10px 2px #ccc',':hover':{boxShadow:'10px 10px 20px #ccc '}}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username}
          </Avatar>
        }
        
        title={title}
        subheader={time}
        
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt={title}
        sx={{objectFit:'cover'}}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}