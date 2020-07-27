import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {withStyles} from "@material-ui/core/styles";
import {Box, Button, Grid, Typography,} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Radio from "@material-ui/core/Radio";
import {NavLink, Route, Switch, withRouter} from "react-router-dom";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from "@material-ui/icons/Delete";


import Map from '../components/map';
import {deleteAddress, fetchAddresses} from "../actions/action_address";
import AddressForm from "./form_address";

class AddressList extends Component {
    state = {
        selectedAddress: this.props.address ? this.props.address.id : -1,
    }

    componentDidMount() {
        this.props.fetchAddresses();
    }

    handleSelectedChange = (address) => (event) => {
        this.setState({selectedAddress: address.id});
        this.props.setAddress(address);
    };

    onDelete = (address) => () => {
        this.props.deleteAddress(address);
    }

    create_item(key, address) {
        const {classes} = this.props;
        return (
            <ListItem key={key}>
                {this.props.view &&
                <ListItemIcon>
                    <Radio
                        edge="start"
                        tabIndex={-1}
                        disableRipple
                        checked={this.state.selectedAddress === address.id}
                        onChange={this.handleSelectedChange(address)}
                        value={address.id}
                    />

                </ListItemIcon>
                }
                <Grid container spacing={2}>
                    <Grid item xs={5} style={{height: "150px"}}>
                        <Map zoom={12} lon={address.longitude} lat={address.latitude} editable={false}/>
                    </Grid>
                    <Grid item xs={5} style={{alignSelf:"center"}}>
                        <Typography  gutterBottom variant="body1" >
                            {address.city}- {address.state}- {address.address}
                        </Typography>
                    </Grid>
                </Grid>
                {!this.props.view &&
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="Edit"
                                component={NavLink} to={`${this.props.match.url}/${key}`}
                    >
                        <EditIcon fontSize="large"/>
                    </IconButton>
                    <IconButton edge="end" aria-label="Delete" onClick={this.onDelete(address)}>
                        <DeleteIcon fontSize="large"/>
                    </IconButton>
                </ListItemSecondaryAction>
                }
            </ListItem>
        );
    }

    render() {
        const {classes} = this.props;

        if (!this.props.addresses) {
            return "";
        }
        const addresses = this.props.addresses.map;

        return (
            <Box display="flex" justifyContent="center">
                <Switch>
                    <Route exact path={`${this.props.match.url}`}>
                        <Box flexDirection={"column"} className={classes.root}>
                            <List className={classes.list}>
                                {[...addresses.keys()].map(key => {
                                        return this.create_item(key, addresses.get(key))
                                    }
                                )}
                            </List>
                            {!this.props.view &&
                            <Box>
                                <Button variant="contained" color="primary"
                                        component={NavLink} to={`${this.props.match.url}/new`}
                                >
                                    Add
                                </Button>
                            </Box>
                            }
                        </Box>
                    </Route>
                    <Route path={`${this.props.match.url}/:id`} component={AddressForm}/>
                </Switch>
            </Box>
        );
    }
}

const useStyles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexGrow: 1,
        maxWidth: 800
    },
    list: {
        // maxHeight: 500,
    }
});

function mapStateToProps(state) {
    return {
        addresses: state.addresses,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchAddresses, deleteAddress}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(withRouter(AddressList)));