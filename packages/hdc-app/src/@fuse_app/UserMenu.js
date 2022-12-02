import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Logout } from "../common/action";
import { useLocations } from "hooks";

function UserMenu(props) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const { pushHistory } = useLocations();

    const [userMenu, setUserMenu] = useState(null);

    const userMenuClick = event => {
        setUserMenu(event.currentTarget);
    };

    const userMenuClose = async (isLogout = false) => {
        if (isLogout) {
            await dispatch(Logout());
        }
        setUserMenu(null);
    };

    const onClickGoUserInfo = () => {
        pushHistory("/userinfo/" + user.id);
    };
    return (
        <>
            <ToolBtn onClick={userMenuClick}>
                <Avatar
                    src={
                        user.profile_img != ""
                            ? user.profile_img
                            : "assets/images/avatar/avatar1.png"
                    }
                />
            </ToolBtn>
            <Popover
                open={Boolean(userMenu)}
                anchorEl={userMenu}
                onClose={() => userMenuClose()}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                classes={{
                    paper: "py-8",
                }}
            >
                {user.id == null ? (
                    <>
                        <MenuItem component={Link} to="/login" role="button">
                            <ListItemIcon className="min-w-40">
                                <Icon>lock</Icon>
                            </ListItemIcon>
                            <ListItemText primary="Login" />
                        </MenuItem>
                    </>
                ) : (
                    <>
                        {/* <MenuItem component={Link} to="/pages/profile" onClick={userMenuClose} role="button">
							<ListItemIcon className="min-w-40">
								<Icon>account_circle</Icon>
							</ListItemIcon>
							<ListItemText primary="My Profile" />
						</MenuItem>
						<MenuItem component={Link} to="/apps/mail" onClick={userMenuClose} role="button">
							<ListItemIcon className="min-w-40">
								<Icon>mail</Icon>
							</ListItemIcon>
							<ListItemText primary="Inbox" />
						</MenuItem> */}
                        <MenuItem
                            onClick={() => {
                                userMenuClose(true);
                            }}
                        >
                            <ListItemIcon className="min-w-40">
                                <Icon>exit_to_app</Icon>
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </MenuItem>
                        <MenuItem onClick={onClickGoUserInfo}>
                            <ListItemIcon className="min-w-40">
                                <Icon>info</Icon>
                            </ListItemIcon>
                            <ListItemText primary="User Info" />
                        </MenuItem>
                    </>
                )}
            </Popover>
        </>
    );
}

const ToolBtn = styled(Button)`
    width: 40px;
    height: 40px;
    min-width: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-left: 10px;
`;

const ToolBtnImg = styled(Avatar)`
    width: 60%;
    height: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default UserMenu;
