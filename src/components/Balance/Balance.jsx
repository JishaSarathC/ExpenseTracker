import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./Balance.css";


export default function Balance({balance,openBalanceModal}) {
  return (
    <Card className="balance">
      <CardContent>
        <Typography className='name'>Wallet Balance:₹ {balance}</Typography>
       </CardContent>
      <CardActions>
        <Button className='Buton' type="button" size="small" variant="contained" onClick={openBalanceModal}>+Add Income</Button>
      </CardActions>
    </Card>
  );
}