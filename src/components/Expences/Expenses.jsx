import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./Expenses.css";



export default function Expenses({expenses, openExpenseModal}) {
  return (
    <Card className="expence">
      <CardContent>
        <Typography>Expenses:₹ {expenses}</Typography>
             
      </CardContent>
      <CardActions>
        <Button className="btn" size="small" variant="contained" onClick={openExpenseModal}>+Add Expense</Button>
      </CardActions>
    </Card>
  );
}
