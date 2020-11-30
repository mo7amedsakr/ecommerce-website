import React, { Fragment, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { CartContext } from '../../context/Cart';
import { CheckoutContext } from '../../context/Checkout';

const payments = {
  cardName: 'Card holder',
  cardNumber: 'Card number',
  expDate: 'Expiry date',
};

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review() {
  const classes = useStyles();

  const { cart } = useContext(CartContext);
  const { addressForm, paymentForm } = useContext(CheckoutContext);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cart.items.map((item) => (
          <ListItem className={classes.listItem} key={item.id}>
            <ListItemText
              primary={item.product.name}
              secondary={`Quantity: ${item.quantity} / Size: ${item.size} / Color: ${item.color}`}
            />
            <Typography variant="body2">{item.product.price}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {cart.totalPrice}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          {Object.values(addressForm).map((field, i) => (
            <Typography key={i}>{field}</Typography>
          ))}
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {Object.entries(payments).map(([key, val]) => (
              <Fragment key={key}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{val}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{paymentForm[key]}</Typography>
                </Grid>
              </Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
