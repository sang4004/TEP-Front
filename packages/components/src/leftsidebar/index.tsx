/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * leftsidebar/index.tsx
 * hooks :
    * useLocations 
    *
 * last modify : 
 ******************************************************************************/

 
import { useSelector, useDispatch } from "react-redux"; // redux
import React, { useState, useEffect } from "react"; // default hooks
import { useLocations } from "hooks" // locations hooks
import styled from "styled-components";
import { SpaceProps } from "antd";
import { makeStyles } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export type leftsidebarProps = {
    
}
interface FinalleftsidebarProps extends leftsidebarProps, SpaceProps {};
const useStyles = makeStyles(theme => ({
	listItem: {
		color: 'inherit!important',
		textDecoration: 'none!important',
		height: 40,
		width: 'calc(100% - 16px)',
		borderRadius: '0 20px 20px 0',
		paddingLeft: 24,
		paddingRight: 12,
		'&.active': {
			backgroundColor: theme.palette.secondary.main,
			color: `${theme.palette.secondary.contrastText}!important`,
			pointerEvents: 'none',
			'& .list-item-icon': {
				color: 'inherit'
			}
		},
		'& .list-item-icon': {
			marginRight: 16
		}
	}
}));

export const LeftsidebarComponent : React.FunctionComponent<FinalleftsidebarProps> = ( props )=>{
    const userSelector = useSelector((state: any)=>state.user);
    const { back, existBack, path } = useLocations();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userName,setUserName] = useState(userSelector.name);

	const classes = useStyles(props);
    
    useEffect(()=>{
        if (userSelector.name != null){
            setUserName(userSelector.name)
        }
        // initialize here
    }, [userSelector.name]);

    return (
        <LeftsidebarContainer>
                <div className="p-24 flex items-center">
                    <Avatar alt={userName} src={userSelector.profile_img} />
                    <Typography className="mx-12">{userName}</Typography>
                </div>

                <Divider />

                <div className="p-24">
                    <Button
                        variant="contained"
                        color="primary"
                        className="w-full"
                        // onClick={ev => dispatch(openNewContactDialog())}
                    >
                        Add User
                    </Button>
                </div>

                <List className="pt-0">
                    <ListItem
                        button
                        className={classes.listItem}
                    >
                        <Icon className="list-item-icon text-16" color="action">
                            people
                        </Icon>
                        <ListItemText className="truncate" primary="All contacts" disableTypography />
                    </ListItem>
                    <ListItem
                        button
                        className={classes.listItem}
                    >
                        <Icon className="list-item-icon text-16" color="action">
                            restore
                        </Icon>
                        <ListItemText className="truncate" primary="Frequently contacted" disableTypography />
                    </ListItem>
                    <ListItem
                        button
                        className={classes.listItem}
                    >
                        <Icon className="list-item-icon text-16" color="action">
                            star
                        </Icon>
                        <ListItemText className="truncate" primary="Starred contacts" disableTypography />
                    </ListItem>
                    <ListItem
                        button
                        className={classes.listItem}
                    >
                        <Icon className="list-item-icon text-16" color="action">
                            star
                        </Icon>
                        <ListItemText className="truncate" primary="Starred contacts" disableTypography />
                    </ListItem>
                </List>
    </LeftsidebarContainer>
    );
}

const LeftsidebarContainer = styled.div`
    width : 100%;
    height : 100%;
    margin : 0;
    padding : 0;
`;